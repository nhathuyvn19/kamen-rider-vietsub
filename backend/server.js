const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');
const cloudinary = require('cloudinary').v2;
const ffmpeg = require('fluent-ffmpeg');
const { spawn } = require('child_process');

const app = express();
const PORT = process.env.PORT || 5000;

const uploadsDir = 'uploads';
const outputsDir = 'outputs';

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

if (!fs.existsSync(outputsDir)) {
  fs.mkdirSync(outputsDir, { recursive: true });
}

app.use(cors());
app.use(express.json());

const jobStatuses = new Map();

const upload = multer({
  dest: 'uploads/',
  limits: {
    fileSize: 500 * 1024 * 1024
  }
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

app.get('/', (req, res) => {
  res.json({ message: 'Kamen Rider Subtitle API' });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.post('/api/upload', upload.single('video'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No video uploaded' });
    }

    const jobId = uuidv4();
    const videoPath = req.file.path;
    const outputDir = `outputs/${jobId}`;

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    res.json({
      jobId,
      message: 'Video uploaded successfully',
      status: 'processing'
    });

    processVideo(videoPath, outputDir, jobId).catch(console.error);

  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/status/:jobId', (req, res) => {
  try {
    const { jobId } = req.params;
    console.log(`Checking status for job: ${jobId}`);

    if (!jobStatuses.has(jobId)) {
      console.log(`Job not found in memory: ${jobId}`);
      return res.status(404).json({ error: 'Job not found' });
    }

    const status = jobStatuses.get(jobId);
    console.log(`Status for job ${jobId}:`, status);
    res.json(status);
  } catch (error) {
    console.error('Error checking job status:', error);
    res.status(500).json({ error: 'Internal server error', message: error.message });
  }
});

async function processVideo(videoPath, outputDir, jobId) {
  const updateStatus = (status, progress = 0, videoUrl = null) => {
    jobStatuses.set(jobId, { status, progress, videoUrl });
  };

  try {
    updateStatus('processing', 10);
    console.log(`[${jobId}] Starting video processing`);

    const audioPath = `${outputDir}/audio.wav`;
    await extractAudio(videoPath, audioPath);
    console.log(`[${jobId}] Audio extracted`);

    updateStatus('processing', 30);

    const srtPath = `${outputDir}/subtitle_ja.srt`;
    await transcribeAudio(audioPath, srtPath);
    console.log(`[${jobId}] Transcription complete`);

    updateStatus('processing', 50);

    const viSrtPath = `${outputDir}/subtitle_vi.srt`;
    await translateSubtitle(srtPath, viSrtPath);
    console.log(`[${jobId}] Translation complete`);

    updateStatus('processing', 70);

    const outputVideoPath = `${outputDir}/video_with_sub.mp4`;
    await embedSubtitle(videoPath, viSrtPath, outputVideoPath);
    console.log(`[${jobId}] Subtitle embedded`);

    updateStatus('processing', 90);

    const videoUrl = await uploadToCloudinary(outputVideoPath, `kamen-rider-${jobId}`);
    console.log(`[${jobId}] Video uploaded: ${videoUrl}`);

    updateStatus('completed', 100, videoUrl);
    console.log(`[${jobId}] Job completed successfully`);

    try {
      fs.unlinkSync(videoPath);
      fs.unlinkSync(audioPath);
      fs.unlinkSync(srtPath);
      fs.unlinkSync(viSrtPath);
      fs.unlinkSync(outputVideoPath);
    } catch (cleanupError) {
      console.error(`[${jobId}] Cleanup error:`, cleanupError);
    }

  } catch (error) {
    console.error(`[${jobId}] Processing error:`, error);
    jobStatuses.set(jobId, { status: 'error', error: error.message, progress: 0 });
  }
}

function extractAudio(videoPath, audioPath) {
  return new Promise((resolve, reject) => {
    ffmpeg(videoPath)
      .outputOptions('-vn', '-acodec', 'pcm_s16le', '-ar', '16000')
      .save(audioPath)
      .on('end', resolve)
      .on('error', reject);
  });
}

async function transcribeAudio(audioPath, srtPath) {
  return new Promise((resolve, reject) => {
    const whisperPath = path.join(__dirname, 'whisper');
    
    const whisperProcess = spawn(whisperPath, [
      audioPath,
      '--model', 'base',
      '--output_format', 'srt',
      '--output_dir', path.dirname(srtPath),
      '--language', 'Japanese'
    ]);

    whisperProcess.stdout.on('data', (data) => {
      console.log('Whisper:', data.toString());
    });

    whisperProcess.stderr.on('data', (data) => {
      console.log('Whisper:', data.toString());
    });

    whisperProcess.on('close', (code) => {
      if (code === 0) {
        const outputSrt = path.join(path.dirname(audioPath), 'audio.srt');
        if (fs.existsSync(outputSrt)) {
          fs.renameSync(outputSrt, srtPath);
        }
        resolve();
      } else {
        reject(new Error(`Whisper failed with code ${code}`));
      }
    });
  });
}

async function translateSubtitle(inputPath, outputPath) {
  const srtContent = fs.readFileSync(inputPath, 'utf8');
  const subtitles = parseSRT(srtContent);

  for (const subtitle of subtitles) {
    const translated = await translateText(subtitle.text);
    subtitle.text = translated;
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  const translatedSrt = generateSRT(subtitles);
  fs.writeFileSync(outputPath, translatedSrt);
}

async function translateText(text) {
  try {
    const response = await axios.post(
      'https://libretranslate.de/translate',
      {
        q: text,
        source: 'ja',
        target: 'vi',
        format: 'text'
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data.translatedText;
  } catch (error) {
    console.error('Translation error:', error.message);
    return text;
  }
}

function parseSRT(srtContent) {
  const blocks = srtContent.trim().split(/\n\n+/);
  return blocks.map((block, index) => {
    const lines = block.split('\n');
    const timecode = lines[1];
    const text = lines.slice(2).join('\n');
    return {
      index: index + 1,
      timecode,
      text
    };
  });
}

function generateSRT(subtitles) {
  return subtitles.map(sub =>
    `${sub.index}\n${sub.timecode}\n${sub.text}`
  ).join('\n\n');
}

function embedSubtitle(videoPath, srtPath, outputPath) {
  return new Promise((resolve, reject) => {
    ffmpeg(videoPath)
      .input(srtPath)
      .outputOptions([
        '-c:v', 'libx264',
        '-c:a', 'aac',
        '-preset', 'medium',
        '-crf', '23',
        '-vf', `subtitles=${srtPath.replace(/\\/g, '\\\\')}:force_style='Fontsize=24,PrimaryColour=&H00FFFFFF,OutlineColour=&H00000000,BorderStyle=1,Outline=2'`
      ])
      .save(outputPath)
      .on('end', resolve)
      .on('error', reject);
  });
}

async function uploadToCloudinary(videoPath, publicId) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      videoPath,
      {
        resource_type: 'video',
        public_id: publicId,
        folder: 'kamen-rider',
        chunk_size: 6000000
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.secure_url);
        }
      }
    );
  });
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Health check: http://0.0.0.0:${PORT}/health`);
});

app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});