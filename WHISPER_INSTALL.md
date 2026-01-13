# Cài đặt Whisper trên Windows

## Phương pháp 1: Dùng pip (Khuyên dùng)

1. Mở Command Prompt hoặc PowerShell
2. Chạy lệnh:

```bash
pip install openai-whisper
```

3. Kiểm tra cài đặt:

```bash
whisper --help
```

Nếu thấy help message là thành công.

## Phương pháp 2: Dùng Docker (Nếu pip không hoạt động)

1. Cài đặt Docker Desktop từ: https://www.docker.com/products/docker-desktop/

2. Chạy lệnh:

```bash
docker pull openai/whisper.cpp
```

3. Sử dụng Docker (cần chỉnh sửa code backend):

```bash
docker run --rm -v %cd%:/app openai/whisper.cpp /app/audio.wav --model base
```

## Phương pháp 3: Tải bản binary (Nếu không muốn cài đặt)

1. Download từ GitHub Releases:
   https://github.com/openai/whisper/releases

2. Tải file `whisper.exe` cho Windows

3. Copy vào thư mục `backend/`

## Kiểm tra cài đặt

Sau khi cài đặt, test bằng lệnh:

```bash
whisper --help
```

Bạn nên thấy output tương tự:

```
usage: whisper [-h] [--model MODEL] [--format FORMAT] ...

OpenAI Whisper: Automatic Speech Recognition
```

## Lưu ý

- Whisper model "base" cần ~140MB disk
- Model "medium" cần ~1.5GB
- Model "large" cần ~3GB
- Mặc định dùng model "base" (nhanh nhất)
```