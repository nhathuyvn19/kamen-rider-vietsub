# Hướng dẫn Cài đặt và Chạy Local (Thử nghiệm trước khi deploy)

## 🔧 Cài đặt Node.js

1. Download Node.js 18 LTS từ: https://nodejs.org/
2. Install default settings
3. Kiểm tra cài đặt:

```bash
node --version
npm --version
```

## 📦 Cài đặt Python và pip

Whisper cần Python 3.8 trở lên.

### Windows:
1. Download Python từ: https://www.python.org/downloads/
2. Chọn "Add Python to PATH" khi install
3. Kiểm tra:

```bash
python --version
pip --version
```

## 🎬 Cài đặt FFmpeg

### Windows:
1. Download từ: https://www.gyan.dev/ffmpeg/builds/
2. Chọn `ffmpeg-git-full.7z`
3. Extract vào `C:\ffmpeg`
4. Thêm `C:\ffmpeg\bin` vào Environment Variables:
   - Right-click "This PC" > Properties > Advanced > Environment Variables
   - Path > Edit > New > `C:\ffmpeg\bin`
5. Kiểm tra:

```bash
ffmpeg -version
```

## 🤖 Cài đặt Whisper

Xem file `WHISPER_INSTALL.md` để chi tiết.

```bash
pip install openai-whisper
```

## 📝 Cài đặt Cloudinary API Key

1. Đăng nhập Cloudinary: https://cloudinary.com
2. Vào Dashboard > Account Details
3. Copy:
   - Cloud Name
   - API Key
   - API Secret

4. Tạo file `backend/.env`:

```
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
PORT=5000
```

Thay `your_*` bằng thông tin từ Cloudinary.

## 🚀 Chạy local

### Cài đặt dependencies:

```bash
cd "E:\Kamen rider translate\kamen-rider-subtitle"
npm run setup
```

### Chạy Backend (Mở terminal mới):

```bash
cd "E:\Kamen rider translate\kamen-rider-subtitle\backend"
npm start
```

Backend sẽ chạy ở: http://localhost:5000

### Chạy Frontend (Mở terminal mới):

```bash
cd "E:\Kamen rider translate\kamen-rider-subtitle\frontend"
npm start
```

Frontend sẽ mở ở: http://localhost:3000

## 🧪 Test upload video

1. Mở http://localhost:3000 trên trình duyệt
2. Upload video Kamen Rider MP4
3. Chờ xử lý (~5-10 phút)
4. Xem video đã có vietsub

## 📊 Kiểm tra logs

### Backend logs:
Xem terminal chạy backend

### Frontend logs:
Mở Developer Tools (F12) > Console

## ⚡ Thời gian xử lý ước tính

- Nhận diện giọng nói (Whisper): 1-3 phút
- Dịch (LibreTranslate): 30-60 giây
- Ghép subtitle + upload: 2-5 phút
- Tổng: ~4-9 phút cho video 20-25 phút

## 🐛 Xử lý lỗi

### Lỗi "whisper not found"
- Cài đặt Whisper theo `WHISPER_INSTALL.md`
- Kiểm tra đường dẫn trong backend/server.js

### Lỗi "ffmpeg not found"
- Cài đặt FFmpeg và thêm vào PATH
- Restart terminal

### Lỗi "Cloudinary error"
- Kiểm tra API key trong .env
- Kiểm tra storage limit trên Cloudinary

### Lỗi "Port 5000 in use"
- Thay đổi PORT trong backend/.env
- Hoặc kill process dùng port 5000:

```bash
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

## ✅ Sau khi test thành công

Nếu mọi thứ hoạt động tốt, tiếp tục deploy lên Render và Vercel theo file `README.md`.

---

**Chúc bạn thành công! 🎉**