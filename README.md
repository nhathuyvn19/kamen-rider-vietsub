# Kamen Rider Vietsub - Hướng dẫn chi tiết

## 🎬 Tính năng
- Upload video Kamen Rider (MP4, 20-25 phút)
- Tự động nhận diện giọng nói tiếng Nhật (OpenAI Whisper)
- AI dịch tự động sang tiếng Việt (LibreTranslate)
- Ghép vietsub vào video
- Xem video trực tiếp trên trình duyệt
- Miễn phí 100%

## 📋 Yêu cầu
- Tài khoản GitHub
- Tài khoản Cloudinary (miễn phí 25GB/tháng)
- Máy tính cài đặt Git
- Video Kamen Rider file MP4

## 🚀 Bước 1: Tạo tài khoản

### 1.1 GitHub
1. Truy cập https://github.com/signup
2. Đăng ký tài khoản miễn phí
3. Xác minh email

### 1.2 Cloudinary
1. Truy cập https://cloudinary.com/users/register_free
2. Đăng ký tài khoản Free tier
3. Sau khi đăng nhập, lấy thông tin:
   - Cloud Name
   - API Key
   - API Secret
   (Tìm ở Dashboard > Account Details)

### 1.3 Vercel
1. Truy cập https://vercel.com/signup
2. Đăng ký bằng GitHub
3. Chọn Free plan

### 1.4 Render
1. Truy cập https://dashboard.render.com/register
2. Đăng ký bằng GitHub
3. Chọn Free plan

## 📦 Bước 2: Push code lên GitHub

### 2.1 Clone hoặc copy dự án này
Nếu bạn đang ở thư mục này:

```bash
cd "E:\Kamen rider translate"
```

### 2.2 Cài đặt Git
Nếu chưa có Git:
1. Download từ: https://git-scm.com/download/win
2. Install default settings
3. Mở Git Bash

### 2.3 Khởi tạo Git repository

```bash
cd "E:\Kamen rider translate\kamen-rider-subtitle"
git init
git add .
git commit -m "Initial commit: Kamen Rider Vietsub"
```

### 2.4 Tạo repository trên GitHub
1. Truy cập https://github.com/new
2. Repository name: `kamen-rider-vietsub`
3. Chọn "Public"
4. Click "Create repository"

### 2.5 Push code lên GitHub

```bash
git remote add origin https://github.com/TEN_GITHUB_CUA_BAN/kamen-rider-vietsub.git
git branch -M main
git push -u origin main
```

*(Thay TEN_GITHUB_CUA_BAN bằng username GitHub của bạn)*

## 🌐 Bước 3: Deploy Backend lên Render

### 3.1 Tạo Web Service trên Render
1. Đăng nhập Render: https://dashboard.render.com
2. Click "+ New" > "Web Service"
3. Connect GitHub repository `kamen-rider-vietsub`
4. Chọn root directory: `/backend`

### 3.2 Cấu hình Build & Deploy
```
Name: kamen-rider-backend
Environment: Node 18
Build Command: npm install
Start Command: npm start
Instance Type: Free
```

### 3.3 Thêm Environment Variables
Trong phần "Advanced", thêm các biến môi trường:

```
CLOUDINARY_CLOUD_NAME: cloud_name_tu_cloudinary
CLOUDINARY_API_KEY: api_key_tu_cloudinary
CLOUDINARY_API_SECRET: api_secret_tu_cloudinary
PORT: 5000
```

### 3.4 Deploy
1. Click "Create Web Service"
2. Chờ ~5-10 phút để deploy hoàn tất
3. Lưu URL backend: `https://kamen-rider-backend.onrender.com`

## 🎨 Bước 4: Deploy Frontend lên Vercel

### 4.1 Deploy trên Vercel
1. Đăng nhập Vercel: https://vercel.com/dashboard
2. Click "Add New" > "Project"
3. Import GitHub repository `kamen-rider-vietsub`
4. Chọn root directory: `/frontend`

### 4.2 Cấu hình Environment Variables
```
REACT_APP_API_URL: https://kamen-rider-backend.onrender.com
```

### 4.3 Deploy
1. Click "Deploy"
2. Chờ ~2-3 phút
3. Lưu URL frontend: `https://kamen-rider-vietsub.vercel.app`

## ✅ Bước 5: Kiểm tra và sử dụng

### 5.1 Test kết nối
1. Mở URL frontend trên trình duyệt
2. Tải video Kamen Rider (MP4, 20-25 phút)
3. Click "Upload và Tạo Vietsub"
4. Chờ 5-10 phút để xử lý
5. Xem video đã có vietsub

### 5.2 Theo dõi quá trình xử lý
Backend sẽ log các bước:
- Đang nhận diện giọng nói (30%)
- Đang dịch sang tiếng Việt (50%)
- Đang ghép vietsub (70%)
- Đang upload video (90%)
- Hoàn thành (100%)

## 🛠️ Bước 6: Chỉnh sửa URL (nếu cần)

Nếu URL backend không đúng, cập nhật file:
```
frontend/src/App.jsx
```
Thay đổi:
```javascript
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
```
Thành URL backend thực tế của bạn.

## 📊 Giới hạn Free Tier

### Vercel (Frontend)
- Unlimited bandwidth
- 3 domains
- Auto HTTPS

### Render (Backend)
- 750 hours/tháng
- 512MB RAM
- 0.1 CPU
- ❌ Sẽ "ngủ" sau 15 phút không dùng
- ❌ Cần ~30s để "thức dậy"

### Cloudinary (Storage)
- 25GB storage
- 25GB bandwidth/tháng
- ~25 video mỗi video 1GB

## 💡 Tips

### Lưu trữ nhiều video
1. Xóa video cũ trên Cloudinary Dashboard
2. Hoặc nâng cấp plan ($89/tháng: 100GB)

### Tăng tốc độ xử lý
1. Dùng Whisper model medium (chậm hơn nhưng chính xác hơn)
2. Upgrade Render plan ($5/tháng: 1GB RAM)

### Xử lý nhiều video cùng lúc
1. Upgrade Render plan ($7/tháng: 4 CPUs)
2. Tạo nhiều Web Services trên Render

## 🐛 Xử lý lỗi thường gặp

### Lỗi: "Job not found"
- Render đang khởi động lại
- Chờ 30-60 giây và thử lại

### Lỗi: "Upload failed"
- Kiểm tra file size (max 500MB)
- Kiểm tra format (chỉ MP4)

### Lỗi: "Translation failed"
- LibreTranslate đang quá tải
- Thử lại sau vài phút

### Lỗi: "Cloudinary upload failed"
- Kiểm tra API key
- Kiểm tra storage limit

## 🔄 Cập nhật code

Để cập nhật thay đổi:

```bash
cd "E:\Kamen rider translate\kamen-rider-subtitle"
git add .
git commit -m "Cập nhật mới"
git push
```

Vercel và Render sẽ tự deploy lại.

## 📞 Hỗ trợ

Nếu gặp vấn đề:
1. Kiểm tra Render Logs (Dashboard > Web Service > Logs)
2. Kiểm tra Cloudinary Dashboard
3. Kiểm tra Console browser (F12)

---

**Enjoy your Kamen Rider with automatic Vietnamese subtitles! 🎬🇻🇳**