const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for all origins
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

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

// Upload endpoint (simplified - just creates a job)
app.post('/api/upload', (req, res) => {
  try {
    console.log('Upload requested');
    console.log('Headers:', req.headers);
    console.log('Body type:', typeof req.body);

    const jobId = Date.now().toString(36);
    console.log(`[${jobId}] Creating job`);

    // Create job status
    jobStatuses.set(jobId, {
      status: 'processing',
      progress: 10,
      message: 'Job created successfully'
    });

    // Simulate processing
    let progress = 10;
    const interval = setInterval(() => {
      progress += 10;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        jobStatuses.set(jobId, {
          status: 'completed',
          progress: 100,
          videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
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