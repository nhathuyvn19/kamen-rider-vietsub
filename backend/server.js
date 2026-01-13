const express = require('express');
const cors = require('cors');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');

const app = express();
const PORT = process.env.PORT || 5000;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Enable CORS for all origins
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 500 * 1024 * 1024 // 500MB
  }
});

// Simple in-memory storage
const jobStatuses = new Map();

// Health check
app.get('/health', (req, res) => {
  console.log('Health check requested');
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    origin: req.headers.origin
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Kamen Rider Subtitle API' });
});

// Test endpoint
app.get('/test', (req, res) => {
  res.json({ message: 'API is working!' });
});

// Upload endpoint
app.post('/api/upload', upload.single('video'), async (req, res) => {
  try {
    console.log('Upload requested');
    console.log('File:', req.file);

    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const jobId = Date.now().toString(36);
    console.log(`[${jobId}] Creating job for: ${req.file.originalname}`);

    // Create job status
    jobStatuses.set(jobId, {
      status: 'processing',
      progress: 10,
      message: 'Uploading to Cloudinary...'
    });

    // Upload to Cloudinary
    try {
      const result = await cloudinary.uploader.upload_stream(
        {
          resource_type: 'video',
          public_id: `kamen-rider-${jobId}`,
          folder: 'kamen-rider-uploads',
          chunk_size: 6000000
        }
      );

      // Create stream from buffer
      const uploadPromise = new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            resource_type: 'video',
            public_id: `kamen-rider-${jobId}`,
            folder: 'kamen-rider-uploads',
            chunk_size: 6000000
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        );

        uploadStream.end(req.file.buffer);
      });

      const cloudinaryResult = await uploadPromise;
      console.log(`[${jobId}] Uploaded to Cloudinary: ${cloudinaryResult.secure_url}`);

      // Update job status to completed
      jobStatuses.set(jobId, {
        status: 'completed',
        progress: 100,
        videoUrl: cloudinaryResult.secure_url,
        message: 'Video uploaded successfully!'
      });

      console.log(`[${jobId}] Job completed`);

      res.json({
        jobId,
        message: 'Upload successful',
        status: 'processing',
        videoUrl: cloudinaryResult.secure_url
      });

    } catch (cloudinaryError) {
      console.error(`[${jobId}] Cloudinary upload error:`, cloudinaryError);
      jobStatuses.set(jobId, {
        status: 'error',
        progress: 0,
        error: cloudinaryError.message,
        message: 'Upload failed'
      });

      res.status(500).json({ error: 'Failed to upload to Cloudinary' });
    }

  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Status endpoint
app.get('/api/status/:jobId', (req, res) => {
  try {
    const { jobId } = req.params;
    console.log(`[${jobId}] Status requested`);

    if (!jobStatuses.has(jobId)) {
      console.log(`[${jobId}] Job not found`);
      return res.status(404).json({ error: 'Job not found' });
    }

    const status = jobStatuses.get(jobId);
    console.log(`[${jobId}] Status:`, status);
    res.json(status);

  } catch (error) {
    console.error('Status error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Error handling
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Health check: http://0.0.0.0:${PORT}/health`);
  console.log(`Test endpoint: http://0.0.0.0:${PORT}/test`);
});