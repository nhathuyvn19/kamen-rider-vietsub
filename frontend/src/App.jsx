import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function App() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [jobId, setJobId] = useState(null);
  const [status, setStatus] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [error, setError] = useState(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (!selectedFile.type.includes('video')) {
        setError('Vui lòng chọn file video MP4');
        setFile(null);
        return;
      }
      setFile(selectedFile);
      setError(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Vui lòng chọn file video');
      return;
    }

    setUploading(true);
    setError(null);
    setVideoUrl(null);

    const formData = new FormData();
    formData.append('video', file);

    try {
      const response = await axios.post(`${API_URL}/api/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const { jobId: newJobId } = response.data;
      setJobId(newJobId);

      intervalRef.current = setInterval(() => {
        checkJobStatus(newJobId);
      }, 3000);

    } catch (err) {
      setError(err.response?.data?.error || 'Lỗi khi upload video');
      setUploading(false);
    }
  };

  const checkJobStatus = async (id) => {
    try {
      const response = await axios.get(`${API_URL}/api/status/${id}`);
      const data = response.data;

      setStatus(data);

      if (data.status === 'completed' && data.videoUrl) {
        setVideoUrl(data.videoUrl);
        setUploading(false);
        clearInterval(intervalRef.current);
      } else if (data.status === 'error') {
        setError('Có lỗi xảy ra khi xử lý video');
        setUploading(false);
        clearInterval(intervalRef.current);
      }

    } catch (err) {
      console.error('Status check error:', err);
    }
  };

  const getProgressMessage = (status) => {
    const messages = {
      'transcribing': 'Đang nhận diện giọng nói...',
      'translating': 'Đang dịch sang tiếng Việt...',
      'embedding': 'Đang ghép vietsub vào video...',
      'uploading': 'Đang tải video lên server...',
    };
    return messages[status] || 'Đang xử lý...';
  };

  const resetUpload = () => {
    setFile(null);
    setJobId(null);
    setStatus(null);
    setVideoUrl(null);
    setError(null);
    setUploading(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1>🎬 Kamen Rider Vietsub</h1>
          <p>Upload phim Kamen Rider, tự động thêm vietsub</p>
        </header>

        {!videoUrl && (
          <div className="upload-section">
            {!uploading ? (
              <div className="upload-area">
                <input
                  type="file"
                  id="video-upload"
                  accept="video/mp4"
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                />
                <label htmlFor="video-upload" className="upload-label">
                  <div className="upload-icon">📁</div>
                  <p>{file ? file.name : 'Click để chọn file video MP4'}</p>
                  <p className="upload-hint">Độ dài: 20-25 phút</p>
                </label>

                {file && (
                  <div className="file-info">
                    <p>📄 {file.name}</p>
                    <p>📊 {(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                  </div>
                )}

                {error && (
                  <div className="error-message">
                    ⚠️ {error}
                  </div>
                )}

                <button
                  onClick={handleUpload}
                  disabled={!file || uploading}
                  className="upload-button"
                >
                  🚀 Upload và Tạo Vietsub
                </button>
              </div>
            ) : (
              <div className="processing-section">
                <div className="loading-spinner"></div>
                <h3>Đang xử lý video...</h3>
                <p>{status ? getProgressMessage(status.status) : 'Đang khởi tạo...'}</p>
                {status && (
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${status.progress}%` }}
                    ></div>
                  </div>
                )}
                <p className="job-id">Job ID: {jobId}</p>
              </div>
            )}
          </div>
        )}

        {videoUrl && (
          <div className="video-section">
            <div className="video-player">
              <video
                src={videoUrl}
                controls
                className="video-element"
                preload="metadata"
              />
            </div>
            <div className="video-actions">
              <button onClick={resetUpload} className="reset-button">
                🔄 Upload video khác
              </button>
            </div>
          </div>
        )}

        <footer className="footer">
          <p>
            ⚠️ Lưu ý: Quá trình xử lý mất khoảng 5-10 phút cho video 20-25 phút
          </p>
          <p>
            🎯 Tự động nhận diện giọng nói → Dịch → Ghép vietsub
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;