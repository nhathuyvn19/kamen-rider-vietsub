const express = require('express');
const cors = require('cors');
const multer = require('multer');

const app = express();
const PORT = process.env.PORT || 5000;

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

// In-memory storage
const jobStatuses = new Map();
const uploadedVideos = new Map();

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

// Upload endpoint - receive file and store info
app.post('/api/upload', upload.single('video'), (req, res) => {
  try {
    console.log('Upload requested');
    console.log('File:', req.file ? req.file.originalname : 'No file');

    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const jobId = Date.now().toString(36);
    console.log(`[${jobId}] Creating job for: ${req.file.originalname}`);

    // Store video info
    uploadedVideos.set(jobId, {
      filename: req.file.originalname,
      size: req.file.size,
      mimetype: req.file.mimetype
    });

    // Create job status
    jobStatuses.set(jobId, {
      status: 'processing',
      progress: 10,
      message: 'Processing video...'
    });

    // Simulate processing (10 seconds)
    let progress = 10;
    const interval = setInterval(() => {
      progress += 10;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);

        jobStatuses.set(jobId, {
          status: 'completed',
          progress: 100,
          videoInfo: uploadedVideos.get(jobId),
          message: 'Processing completed (simulated)'
        });
        console.log(`[${jobId}] Job completed`);
      } else {
        jobStatuses.set(jobId, {
          status: 'processing',
          progress,
          message: `Processing... ${progress}%`
        });
      }
    }, 1000);

    console.log(`[${jobId}] Job started, returning response`);
    res.json({
      jobId,
      message: 'Upload successful',
      filename: req.file.originalname,
      size: req.file.size,
      status: 'processing'
    });

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