# 🎨 HƯỚNG DẪN DEPLOY FRONTEND LÊN VERCEL (CHI TIẾT TỪNG BƯỚC)

---

## BƯỚC 1: ĐĂNG NHẬP VERCEL

### 1.1 Truy cập
Mở trình duyệt, vào: https://vercel.com/dashboard

### 1.2 Đăng nhập
Nếu chưa login:
- Click nút **"Login"** (góc phải trên)
- Chọn **"Continue with GitHub"**
- Cho phép quyền truy cập

---

## BƯỚC 2: TẠO PROJECT MỚI

### 2.1 Tìm nút tạo project
Trên Vercel Dashboard:
- Góc trái trên, tìm nút: **"Add New..."**
- Click vào nút này

### 2.2 Chọn Project
Menu thả xuống hiện ra:
- Chọn **"Project"**

---

## BƯỚC 3: IMPORT GITHUB REPOSITORY

### 3.1 Tìm repository
Trên trang **"Import Git Repository"**:
- Sẽ thấy danh sách repository GitHub của bạn
- Tìm repo: **kamen-rider-vietsub**

### 3.2 Import
- Ở bên phải repo, có nút **"Import"**
- Click vào nút này

---

## BƯỚC 4: CẤU HÌNH PROJECT

Sau khi click "Import", sẽ thấy trang **"Configure Project"**

### 4.1 Framework Preset
- Tìm dropdown: **"Framework Preset"**
- Click vào đó
- Chọn: **"Create React App"**
  - (Nếu không thấy, chọn "Other" hoặc để mặc định)

### 4.2 Root Directory ⚠️ QUAN TRỌNG
- Tìm ô: **"Root Directory"**
- Click vào ô đó
- Xóa hết chữ trong đó
- Gõ: `frontend`

**Chú ý:**
- ❌ Không phải `/frontend` (có dấu / ở đầu)
- ✅ Phải là `frontend` (không có dấu /)

### 4.3 Environment Variables ⚠️ QUAN TRỌNG NHẤT!

#### Bước 4.3.1: Tìm phần Environment Variables
- Kéo xuống, tìm phần: **"Environment Variables"**

#### Bước 4.3.2: Thêm biến mới
- Tìm nút: **"+ New"** (màu đen hoặc xanh)
- Click vào nút này

#### Bước 4.3.3: Điền thông tin
Sẽ hiện 2 ô: **NAME** và **VALUE**

**Điền chính xác:**

```
NAME: REACT_APP_API_URL
VALUE: https://kamen-rider-backend.onrender.com
```

**Lưu ý:**
- **NAME**: Gõ `REACT_APP_API_URL` (chính xác, không space, không sai chính tả)
- **VALUE**: Gõ URL backend của bạn
  - Nếu backend URL: `https://kamen-rider-backend.onrender.com`
  - Copy URL đó và paste vào VALUE
  - Không được có quote, không space ở đầu/cuôi

#### Bước 4.3.4: Kiểm tra giá trị VALUE

**Đúng:**
```
https://kamen-rider-backend.onrender.com
```

**Sai:**
```
"https://kamen-rider-backend.onrender.com"     (có quote)
 https://kamen-rider-backend.onrender.com       (space ở đầu)
https://kamen-rider-backend.onrender.com        (space ở cuối)
```

### 4.4 Các phần khác (giữ mặc định)
- **Project Name**: Giữ nguyên `kamen-rider-vietsub` hoặc sửa tên khác
- **Build Command**: Giữ mặc định (thường là `npm run build`)
- **Output Directory**: Giữ mặc định (thường là `build`)

---

## BƯỚC 5: DEPLOY

### 5.1 Tìm nút Deploy
- Kéo xuống dưới cùng trang
- Tìm nút màu đen: **"Deploy"**

### 5.2 Click Deploy
- Click vào nút **"Deploy"**
- Sẽ chuyển sang trang **"Deployments"**

---

## BƯỚC 6: THEO DÕI DEPLOY

### 6.1 Trang Deployments
Sẽ thấy card deployment đang chạy

### 6.2 Các trạng thái
- **Building...**: Đang build frontend
- Chờ khoảng **2-5 phút**

### 6.3 Khi deploy thành công
Sẽ thấy:
- ✔︎ **Building** (màu xanh)
- ✔︎ **Deployment Completed** (màu xanh)
- URL frontend sẽ hiện ở trên cùng:
  - Ví dụ: `https://kamen-rider-vietsub.vercel.app`

---

## BƯỚC 7: TEST FRONTEND

### 7.1 Mở frontend URL
- Click vào URL frontend
  - Ví dụ: `https://kamen-rider-vietsub.vercel.app`

### 7.2 Kiểm tra giao diện
Nên thấy:
- Tiêu đề: **🎬 Kamen Rider Vietsub**
- Mô tả: **Upload phim Kamen Rider, tự động thêm vietsub**
- Form upload video

### 7.3 Test chức năng
1. Click vào nút **"Upload và Tạo Vietsub"**
2. Chọn file video Kamen Rider (MP4)
3. Chờ 5-10 phút để xử lý
4. Xem video đã có vietsub

---

## 📸 NHỮNG ĐIỀU CẦN TÌM TRÊN GIAO DIỆN VERCEL:

### Nút quan trọng:
- ✅ Nút **"Add New..."** (góc trái trên)
- ✅ Nút **"Import"** (bên phải repo)
- ✅ Nút **"+ New"** (trong Environment Variables)
- ✅ Nút **"Deploy"** (dưới cùng)

### Cần điền:
- ✅ **Framework Preset**: Create React App
- ✅ **Root Directory**: `frontend`
- ✅ **NAME**: `REACT_APP_API_URL`
- ✅ **VALUE**: `https://kamen-rider-backend.onrender.com`

---

## ❓ GẶP LỖI?

### Lỗi 1: `Invalid request: env.REACT_APP_API_URL should be string`

**Nguyên nhân:**
- VALUE của Environment Variable bị sai format

**Fix:**
- Xóa biến cũ
- Thêm lại với VALUE đúng
- Không có quote, không space ở đầu/cuôi

---

### Lỗi 2: Deployment Failed

**Nguyên nhân:**
- Root Directory sai (không phải `frontend`)
- Hoặc code có lỗi

**Fix:**
- Kiểm tra Root Directory = `frontend`
- Xem Build Logs để biết lỗi cụ thể

---

### Lỗi 3: Frontend không connect được backend

**Nguyên nhân:**
- URL backend sai trong Environment Variable
- Hoặc backend chưa Live

**Fix:**
1. Test backend URL: `https://kamen-rider-backend.onrender.com/health`
2. Nếu backend OK → Sửa lại Environment Variable trên Vercel
3. Redeploy lại frontend

---

## ✅ KIỂM TRA SAU KHI DEPLOY THÀNH CÔNG:

### 1. Test backend
```
https://kamen-rider-backend.onrender.com/health
```
Nên thấy: `{"status": "ok", "timestamp": "..."}`

### 2. Test frontend
Mở URL frontend → Nên thấy trang upload video

### 3. Test upload
- Upload video Kamen Rider
- Chờ xử lý
- Xem video có vietsub

---

## 🎯 TÓM TẮT CÁC BƯỚC:

1. Vào Vercel Dashboard
2. Click **"Add New..."** → **"Project"**
3. Import repo **kamen-rider-vietsub**
4. Framework: **Create React App**
5. Root Directory: `frontend`
6. Environment Variable:
   - NAME: `REACT_APP_API_URL`
   - VALUE: `https://kamen-rider-backend.onrender.com`
7. Click **"Deploy"**
8. Chờ 2-5 phút
9. Mở URL frontend và test

---

**Làm theo từng bước sẽ thành công! Nếu gặp chỗ nào không hiểu, báo mình ngay!** 🚀