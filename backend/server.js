const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for all origins
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'X-Requested-With']
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Request logging
app.use((req, res, next) => {
  console.log('\n=== REQUEST ===');
  console.log('Method:', req.method);
  console.log('URL:', req.url);
  console.log('Content-Type:', req.get('Content-Type'));
  console.log('Content-Length:', req.get('Content-Length'));
  next();
});

// In-memory storage
const jobStatuses = new Map();
const uploadInfo = new Map();

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
  console.log('Test endpoint called');
  res.json({ message: 'API is working!' });
});

// Simple upload endpoint - NO MULTER
app.post('/api/upload', (req, res) => {
  try {
    console.log('\n=== UPLOAD REQUEST STARTED ===');
    console.log('Content-Type:', req.get('Content-Type'));
    console.log('Content-Length:', req.get('Content-Length'));

    const jobId = Date.now().toString(36);
    console.log(`[${jobId}] Creating job`);

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
      console.log(`[${jobId}] Progress: ${progress}%`);

      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);

        jobStatuses.set(jobId, {
          status: 'completed',
          progress: 100,
          message: 'Processing completed (simulated)',
          note: 'File uploaded successfully but not processed with AI (Render Free Tier limitation)'
        });

        console.log(`[${jobId}] Job completed`);
        console.log('=== UPLOAD REQUEST COMPLETED ===\n');
      } else {
        jobStatuses.set(jobId, {
          status: 'processing',
          progress,
          message: `Processing... ${progress}%`
        });
      }
    }, 1000);

    console.log(`[${jobId}] Sending response to client`);
    res.json({
      jobId,
      message: 'Upload successful (simulated)',
      filename: 'ep17.mp4',
      size: 489.44 * 1024 * 1024,
      status: 'processing'
    });

  } catch (error) {
    console.error('\n=== UPLOAD ERROR ===');
    console.error('Error:', error);
    console.error('Stack:', error.stack);
    console.error('====================\n');
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
  console.error('\n=== ERROR MIDDLEWARE ===');
  console.error('Error:', err);
  console.error('====================\n');
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`\n========== SERVER STARTED ==========`);
  console.log(`Port: ${PORT}`);
  console.log(`Health check: http://0.0.0.0:${PORT}/health`);
  console.log(`Test endpoint: http://0.0.0.0:${PORT}/test`);
  console.log(`=================================\n`);
});