# 🎙️ EchoMate-SelfVoice-VI

Self-bot Discord tự động vào voice channel theo user (Phiên bản tiếng Việt)

## ⚠️ CẢNH BÁO QUAN TRỌNG

**Self-bot vi phạm Terms of Service của Discord!**

- Tài khoản có thể bị khóa/cấm vĩnh viễn
- Chỉ sử dụng cho mục đích học tập và thử nghiệm
- Sử dụng với tài khoản phụ, không dùng tài khoản chính
- Tác giả không chịu trách nhiệm về bất kỳ hậu quả nào

## 📋 Mục Tiêu PHASE 1

- ✅ Đăng nhập Discord bằng USER TOKEN
- ✅ Theo dõi voice state của chính user
- ✅ Tự động vào voice channel khi user vào
- ✅ Tự động rời voice channel khi user rời

## 🛠️ Công Nghệ

- **Node.js** >= 16.9.0
- **discord.js-selfbot-v13** (by aiko-chan-ai)
- **dotenv** (quản lý biến môi trường)

## 📁 Cấu Trúc Dự Án

```
EchoMate-SelfVoice-VI/
│
├─ client/
│   ├─ index.js          # Đăng nhập self-bot
│   └─ voice/
│       └─ follow.js     # Logic theo dõi voice
│
├─ utils/
│   └─ log.js            # Hệ thống log tiếng Việt
│
├─ .env.example          # Mẫu file cấu hình
├─ .env                  # File cấu hình thực (tự tạo)
├─ package.json
└─ README.md
```

## 🚀 Hướng Dẫn Cài Đặt

### Bước 1: Clone/Download dự án

```bash
cd EchoMate-SelfVoice-VI
```

### Bước 2: Cài đặt dependencies

```bash
npm install
```

### Bước 3: Lấy USER TOKEN

1. Mở Discord trên trình duyệt (Web Discord)
2. Nhấn **F12** để mở Developer Tools
3. Chuyển sang tab **Network**
4. Nhấn **F5** để reload trang
5. Lọc XHR requests, tìm bất kỳ request nào tới Discord API
6. Xem tab **Headers** → tìm **Authorization**
7. Copy giá trị của **Authorization** (đó chính là USER TOKEN)

**Lưu ý:** Token có dạng dài, bắt đầu bằng các ký tự ngẫu nhiên (không phải "Bot ...")

### Bước 4: Tạo file .env

Tạo file `.env` trong thư mục gốc:

```env
USER_TOKEN=paste_token_của_bạn_vào_đây
```

**Quan trọng:** Không chia sẻ token này với ai!

### Bước 5: Chạy self-bot

```bash
npm start
```

Hoặc:

```bash
node client/index.js
```

## 📖 Cách Sử Dụng

1. Chạy self-bot bằng lệnh `npm start`
2. Đợi self-bot online (sẽ có thông báo màu xanh)
3. Vào bất kỳ voice channel nào trên Discord
4. Self-bot sẽ **tự động vào theo** bạn
5. Khi bạn rời voice, self-bot cũng **tự động rời theo**

## 🎯 Tính Năng PHASE 1

### ✅ Đã Hoàn Thành

- [x] Đăng nhập bằng USER TOKEN
- [x] Theo dõi voice state của user
- [x] Tự động join voice khi user join
- [x] Tự động leave voice khi user leave
- [x] Tự động chuyển channel khi user chuyển
- [x] Kiểm tra tránh join trùng lặp
- [x] Log tiếng Việt đầy đủ
- [x] Xử lý lỗi cơ bản

### ❌ Không Có Trong PHASE 1

- Không có slash command
- Không có prefix command
- Không gửi tin nhắn
- Không tích hợp AI/Gemini
- Không phát nhạc

## 🐛 Xử Lý Lỗi Thường Gặp

### Lỗi: "Không tìm thấy USER_TOKEN"
- Kiểm tra file `.env` đã tạo chưa
- Đảm bảo có dòng `USER_TOKEN=...`

### Lỗi: "Đăng nhập thất bại"
- Token có thể đã hết hạn, lấy token mới
- Token không đúng định dạng
- Tài khoản có thể đã bị khóa

### Lỗi: "Không thể vào voice channel"
- Kiểm tra quyền của tài khoản trong server
- Server có thể chặn self-bot
- Kênh voice có thể đầy người

## 📝 Log Màu Sắc

- 🔵 **INFO** (Xanh dương): Thông tin chung
- 🟢 **SUCCESS** (Xanh lá): Thành công
- 🔴 **ERROR** (Đỏ): Lỗi
- 🟡 **WARN** (Vàng): Cảnh báo
- 🟣 **VOICE** (Tím): Hoạt động voice

## 🔧 Tắt Self-bot

Nhấn **Ctrl+C** trong terminal để tắt an toàn.

## 📜 License

MIT License - Tự do sử dụng cho mục đích học tập

## 🙏 Credits

- **discord.js-selfbot-v13** by [aiko-chan-ai](https://github.com/aiko-chan-ai/discord.js-selfbot-v13)

---

**Lưu ý cuối:** Dự án này chỉ phục vụ mục đích học tập. Sử dụng có trách nhiệm!
