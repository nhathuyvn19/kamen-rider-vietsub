# 🎬 Kamen Rider Vietsub - Tự động thêm subtitle tiếng Việt

Trang web miễn phí để upload phim Kamen Rider, tự động nhận diện giọng nói tiếng Nhật và thêm vietsub bằng AI.

## ✅ Đã xong:
- ✅ Backend API (Node.js + Express)
- ✅ Frontend Web App (React)
- ✅ Speech-to-Text (OpenAI Whisper)
- ✅ Translation API (LibreTranslate)
- ✅ Video processing (FFmpeg)
- ✅ Video storage (Cloudinary)
- ✅ Dependencies đã cài đặt

## 🚀 LÀM NGAY (Bắt buộc theo thứ tự):

### Bước 1: Đăng ký tài khoản (15 phút)

1. **GitHub** (Free): https://github.com/signup
2. **Cloudinary** (Free 25GB): https://cloudinary.com/users/register_free
3. **Vercel** (Free): https://vercel.com/signup
4. **Render** (Free): https://dashboard.render.com/register

Đăng ký xong rồi quay lại đây!

---

### Bước 2: Push code lên GitHub (10 phút)

#### 2.1 Cài đặt Git (nếu chưa có)
- Download từ: https://git-scm.com/download/win
- Install default settings

#### 2.2 Tạo repository trên GitHub
1. Vào: https://github.com/new
2. Repository name: `kamen-rider-vietsub`
3. Chọn "Public"
4. Click "Create repository"

#### 2.3 Push code lên GitHub
Mở **Git Bash** (hoặc Command Prompt) và chạy:

```bash
cd "E:\Kamen rider translate\kamen-rider-subtitle"

# Khởi tạo git
git init
git add .
git commit -m "Initial commit"

# Thay USERNAME bằng tên GitHub của bạn
git remote add origin https://github.com/USERNAME/kamen-rider-vietsub.git
git branch -M main
git push -u origin main
```

Nếu bảo nhập username/password, hãy dùng:
- Username: GitHub username
- Password: GitHub Personal Access Token (lấy từ GitHub Settings > Developer settings > Personal access tokens > Generate new token)

---

### Bước 3: Deploy Backend lên Render (15 phút)

1. Đăng nhập: https://dashboard.render.com
2. Click **"+ New"** → **"Web Service"**
3. Click **"Connect GitHub"**
4. Chọn repository `kamen-rider-vietsub`
5. Chọn root directory: `/backend`

**Cấu hình:**
```
Name: kamen-rider-backend
Environment: Node 18
Build Command: npm install
Start Command: npm start
Instance Type: Free
```

**Thêm Environment Variables** (kéo xuống phần "Advanced" > "Add Environment Variable"):
```
CLOUDINARY_CLOUD_NAME = (lấy từ Cloudinary Dashboard)
CLOUDINARY_API_KEY = (lấy từ Cloudinary Dashboard)
CLOUDINARY_API_SECRET = (lấy từ Cloudinary Dashboard)
PORT = 5000
```

**Lấy thông tin Cloudinary:**
- Đăng nhập Cloudinary → Dashboard → Account Details
- Copy 3 thông tin trên

6. Click **"Create Web Service"**
7. Chờ 5-10 phút
8. Lưu URL backend: ví dụ `https://kamen-rider-backend.onrender.com`

---

### Bước 4: Deploy Frontend lên Vercel (10 phút)

1. Đăng nhập: https://vercel.com/dashboard
2. Click **"Add New"** → **"Project"**
3. Import GitHub repository `kamen-rider-vietsub`
4. Chọn root directory: `/frontend`

**Cấu hình:**
```
Framework Preset: Create React App
```

**Thêm Environment Variable:**
```
REACT_APP_API_URL = https://kamen-rider-backend.onrender.com
```
(Thay bằng URL backend ở bước 3)

5. Click **"Deploy"**
6. Chờ 2-3 phút
7. Lưu URL frontend: ví dụ `https://kamen-rider-vietsub.vercel.app`

---

### Bước 5: Test (5 phút)

1. Mở URL frontend trên trình duyệt
2. Upload video Kamen Rider (MP4, 20-25 phút)
3. Chờ 5-10 phút để xử lý
4. Xem video đã có vietsub!

---

## 📚 Tài liệu chi tiết:

- **Deploy chi tiết**: Xem file `README.md`
- **Test local trước**: Xem file `SETUP_LOCAL.md`
- **Cài đặt Whisper**: Xem file `WHISPER_INSTALL.md`

---

## ⏱️ Thời gian xử lý ước tính:

- Nhận diện giọng nói: 1-3 phút
- Dịch tiếng Việt: 30-60 giây
- Ghép subtitle: 2-5 phút
- Upload video: 1-2 phút
- **Tổng: ~5-10 phút** cho video 20-25 phút

---

## 🎯 Giới hạn Free Tier:

| Service | Free Tier | Lưu ý |
|---------|-----------|-------|
| Vercel | Unlimited | Frontend |
| Render | 750h/tháng | Backend ngủ sau 15 phút |
| Cloudinary | 25GB | ~25 video |

---

## ❓ Gặp lỗi?

### Lỗi "Job not found" → Backend đang khởi động lại, chờ 30-60s
### Lỗi "Upload failed" → Kiểm tra file size (max 500MB)
### Lỗi "Translation failed" → LibreTranslate quá tải, thử lại sau

Xem chi tiết trong `README.md`

---

**Bắt đầu làm ngay nhé! 🚀**

Sau khi hoàn thành, bạn có trang web tự động vietsub cho phim Kamen Rider hoàn toàn miễn phí! 🎬🇻🇳