# 🎯 HƯỚNG DẪN CHI TIẾT - BƯỚC TÍNH TỪNG CÁCH (CÓ HÌNH)

---

## BƯỚC 3: DEPLOY BACKEND LÊN RENDER

### 3.1 Đăng nhập Render
1. Mở trình duyệt, vào: https://dashboard.render.com
2. Nếu chưa đăng nhập:
   - Click "Log In" ở góc phải trên
   - Chọn "Log in with GitHub"
   - Cho phép quyền truy cập GitHub
   - Sau khi đăng nhập sẽ thấy dashboard

---

### 3.2 Tạo Web Service
**Giao diện Dashboard:**
- Ở góc trái trên, có nút **"+ New"** (màu xanh)
- Click vào nút này
- Menu thả xuống hiện ra
- Chọn **"Web Service"**

---

### 3.3 Kết nối GitHub
**Giao diện Create New Web Service:**
- Phần "Connect a repository"
- Click nút **"Connect"** ở bên cạnh GitHub
- Nếu lần đầu, sẽ hiện popup:
  - "Authorize renderinc"
  - Click nút màu xanh **"Authorize renderinc"**
- Sau đó sẽ thấy danh sách repository của bạn
- Tìm và click chọn repository: **kamen-rider-vietsub**

---

### 3.4 Cấu hình Repository
**Sau khi chọn repo, sẽ thấy form cấu hình:**

#### Phần "Name & Instance":
- **Name**: gõ `kamen-rider-backend`
- **Region**: mặc định (Oregon, US)
- **Instance Type**: chọn **Free** (dòng đầu tiên, giá $0.00/month)

#### Phần "Build, Deploy, & Runtime":
- **Environment**: Chọn **Node** trong dropdown
- **Node Version**: Chọn **18** (hoặc bản mới nhất > 18)
- **Build Command**: gõ `npm install`
- **Start Command**: gõ `npm start`

#### Phần "Root Directory":
- Click vào ô "Root Directory"
- Gõ: `backend`
  (Đây là quan trọng! Vì backend nằm trong thư mục /backend)

#### Phần "Advanced":
- Click mũi tên xuống ở cạnh chữ "Advanced" để mở rộng
- Kéo xuống phần "Environment Variables"
- Click nút **"+ Add Environment Variable"** (màu xanh)
- Mỗi lần click sẽ hiện 2 ô: "Key" và "Value"

**Thêm lần lượt 4 biến:**

1. **Biến 1:**
   - Key: `CLOUDINARY_CLOUD_NAME`
   - Value: (lấy từ Cloudinary, xem bên dưới)

2. **Biến 2:**
   - Click "+ Add Environment Variable" lần nữa
   - Key: `CLOUDINARY_API_KEY`
   - Value: (lấy từ Cloudinary)

3. **Biến 3:**
   - Click "+ Add Environment Variable" lần nữa
   - Key: `CLOUDINARY_API_SECRET`
   - Value: (lấy từ Cloudinary)

4. **Biến 4:**
   - Click "+ Add Environment Variable" lần nữa
   - Key: `PORT`
   - Value: `5000`

---

### 3.5 Lấy thông tin Cloudinary
**Để lấy 3 thông tin cho Environment Variables:**

1. Đăng nhập Cloudinary: https://cloudinary.com
2. Sau khi login, sẽ thấy Dashboard
3. Ở menu bên trái, tìm và click:
   - **"Account Settings"** (hoặc Settings)
4. Trong tab **"Account Details"**, sẽ thấy 3 thông tin:

```
Cloud Name: abc123xyz
API Key: 123456789
API Secret: AbCdEfGhIjKlMnOpQrStUvWxYz123456
```

5. Copy từng cái và paste vào Render (ở bước 3.4)

---

### 3.6 Tạo Web Service
**Cuối cùng:**
- Kéo xuống dưới cùng
- Có nút màu xanh **"Create Web Service"**
- Click vào nút này
- Sẽ chuyển sang trang "Overview" của web service

---

### 3.7 Theo dõi quá trình deploy
**Trang Overview:**
- Sẽ thấy card "kamen-rider-backend"
- Status sẽ là: **"In Progress"** (màu vàng)
- Click vào tên service để xem chi tiết

**Tab "Events":**
- Sẽ thấy dòng "Build in progress..."
- Chờ khoảng 5-10 phút

**Khi deploy thành công:**
- Status sẽ là **"Live"** (màu xanh lá)
- Ở góc trái trên, sẽ thấy URL:
  - Ví dụ: `https://kamen-rider-backend.onrender.com`
- **Copy URL này!** Cần dùng cho bước 4

**Khi deploy thất bại:**
- Status sẽ là "Failed" (màu đỏ)
- Click vào "Build Logs" để xem lỗi
- Lỗi thường gặp:
  - ❌ Quên set Root Directory = backend
  - ❌ Quên add Environment Variables
  - ❌ Sai Cloudinary API key

---

---

## BƯỚC 4: DEPLOY FRONTEND LÊN VERCEL

### 4.1 Đăng nhập Vercel
1. Mở trình duyệt, vào: https://vercel.com/dashboard
2. Nếu chưa đăng nhập:
   - Click "Login" ở góc phải trên
   - Chọn "Continue with GitHub"
   - Cho phép quyền truy cập
   - Sau khi login sẽ thấy dashboard

---

### 4.2 Tạo Project mới
**Giao diện Dashboard:**
- Click nút **"Add New..."** ở góc trái trên
- Menu thả xuống hiện ra
- Chọn **"Project"**

---

### 4.3 Import GitHub Repository
**Trang "Import Git Repository":**
- Sẽ thấy danh sách repo GitHub của bạn
- Tìm repo: **kamen-rider-vietsub**
- Click nút **"Import"** ở bên phải repo đó

---

### 4.4 Cấu hình Project
**Trang "Configure Project":**

#### Phần "Framework Preset":
- Click vào dropdown
- Chọn **"Create React App"**
- (Nếu không thấy, có thể chọn "Other" hoặc để mặc định)

#### Phần "Root Directory":
- Click vào ô "Root Directory"
- Gõ: `frontend`
  (Quan trọng! Vì frontend nằm trong /frontend)

#### Phần "Environment Variables":
- Kéo xuống tìm phần "Environment Variables"
- Click nút **"+ New"**
- Sẽ hiện 2 ô: "NAME" và "VALUE"

**Thêm 1 biến:**
- **NAME**: gõ `REACT_APP_API_URL`
- **VALUE**: gõ URL backend từ bước 3.7
  - Ví dụ: `https://kamen-rider-backend.onrender.com`

---

### 4.5 Deploy
**Cuối cùng:**
- Kéo xuống dưới cùng
- Có nút màu đen **"Deploy"**
- Click vào nút này
- Sẽ chuyển sang trang "Deployments"

---

### 4.6 Theo dõi deploy
**Trang Deployments:**
- Sẽ thấy card deployment đang chạy
- Status: "Building..."
- Chờ khoảng 2-3 phút

**Khi deploy thành công:**
- Sẽ thấy: "✔︎ Building"
- Sẽ thấy: "✔︎ Deployment Completed"
- URL frontend sẽ hiện ở trên cùng:
  - Ví dụ: `https://kamen-rider-vietsub.vercel.app`
- Click vào URL để mở website

**Khi deploy thất bại:**
- Sẽ thấy dòng đỏ: "Build Failed"
- Click "View Logs" để xem lỗi
- Lỗi thường gặp:
  - ❌ Quên set Root Directory = frontend
  - ❌ URL backend sai hoặc chưa deploy xong

---

---

## ✅ KIỂM TRA SAU KHI DEPLOY XONG

### Test backend:
1. Mở URL backend: `https://kamen-rider-backend.onrender.com`
2. Thêm `/api/health` vào cuối
   - Ví dụ: `https://kamen-rider-backend.onrender.com/api/health`
3. Nên thấy JSON:
   ```json
   {
     "status": "ok",
     "timestamp": "2024-01-13T..."
   }
   ```

### Test frontend:
1. Mở URL frontend: `https://kamen-rider-vietsub.vercel.app`
2. Nên thấy trang web "Kamen Rider Vietsub"
3. Click "Upload và Tạo Vietsub"
4. Chọn video Kamen Rider
5. Chờ 5-10 phút
6. Xem video đã có vietsub!

---

---

## 📸 NHỮNG ĐIỀU CẦN TÌM TRÊN GIAO DIỆN WEB:

### Render:
- ✅ Nút **"+ New"** màu xanh (góc trái trên)
- ✅ Nút **"Connect"** bên cạnh GitHub
- ✅ Nút **"+ Add Environment Variable"** (màu xanh)
- ✅ Nút **"Create Web Service"** (màu xanh, dưới cùng)
- ✅ Tab **"Build Logs"** để xem lỗi

### Vercel:
- ✅ Nút **"Add New..."** (góc trái trên)
- ✅ Nút **"Import"** bên cạnh repo
- ✅ Nút **"+ New"** trong Environment Variables
- ✅ Nút **"Deploy"** (màu đen, dưới cùng)
- ✅ Nút **"View Logs"** để xem lỗi

---

## ❓ Gặp lỗi? Hỏi tôi ngay!

Nói rõ:
- Bước nào?
- Thông báo lỗi là gì?
- Mình sẽ giúp fix! 🚀

---

**Làm theo từng bước sẽ thành công 100%! 💪**