# 🎙️ EchoMate-SelfVoice-VI - PHASE 2

Self-bot Discord tự động vào voice channel theo user mục tiêu (Phiên bản tiếng Việt)

## ⚠️ CẢNH BÁO QUAN TRỌNG

**Self-bot vi phạm Terms of Service của Discord!**

- Tài khoản có thể bị khóa/cấm vĩnh viễn
- Chỉ sử dụng cho mục đích học tập và thử nghiệm
- Sử dụng với tài khoản phụ, không dùng tài khoản chính
- Tác giả không chịu trách nhiệm về bất kỳ hậu quả nào

## 📋 Mục Tiêu PHASE 2

- ✅ Đăng nhập Discord bằng USER TOKEN
- ✅ Theo dõi voice state của **user mục tiêu** (không phải chính mình)
- ✅ Tự động vào voice channel khi user mục tiêu vào
- ✅ Tự động rời voice channel khi user mục tiêu rời
- ✅ Cấu hình TARGET_USER_ID linh hoạt

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

### Bước 3: Lấy USER TOKEN (Self-bot)

1. Mở Discord trên trình duyệt (Web Discord)
2. Nhấn **F12** để mở Developer Tools
3. Chuyển sang tab **Network**
4. Nhấn **F5** để reload trang
5. Lọc XHR requests, tìm bất kỳ request nào tới Discord API
6. Xem tab **Headers** → tìm **Authorization**
7. Copy giá trị của **Authorization** (đó chính là USER TOKEN)

**Lưu ý:** Token có dạng dài, bắt đầu bằng các ký tự ngẫu nhiên (không phải "Bot ...")

### Bước 4: Lấy TARGET_USER_ID (User cần theo dõi)

1. Mở Discord
2. Vào **User Settings** → **Advanced** → Bật **Developer Mode**
3. Right-click vào user cần theo dõi
4. Chọn **Copy ID**
5. Đây chính là TARGET_USER_ID

**Ví dụ:** `1064755989229867008`

### Bước 5: Tạo file .env

Tạo file `.env` trong thư mục gốc:

```env
USER_TOKEN=paste_token_của_bạn_vào_đây
TARGET_USER_ID=1064755989229867008
```

**Quan trọng:** 
- Không chia sẻ token này với ai!
- Thay `TARGET_USER_ID` bằng ID của user bạn muốn theo dõi

### Bước 6: Chạy self-bot

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
3. Self-bot sẽ hiển thị: `🎯 Đang theo dõi user: Username#1234 (ID: ...)`
4. Khi **user mục tiêu** vào voice channel → Self-bot **tự động vào theo**
5. Khi **user mục tiêu** rời voice → Self-bot **tự động rời theo**
6. Self-bot chỉ theo dõi user có ID trong `TARGET_USER_ID`, bỏ qua tất cả user khác

## 🎯 Tính Năng PHASE 2

### ✅ Đã Hoàn Thành

- [x] Đăng nhập bằng USER TOKEN
- [x] Theo dõi voice state của **user mục tiêu cụ thể**
- [x] Tự động join voice khi user mục tiêu join
- [x] Tự động leave voice khi user mục tiêu leave
- [x] Tự động chuyển channel khi user mục tiêu chuyển
- [x] Kiểm tra tránh join trùng lặp
- [x] Log tiếng Việt đầy đủ với icon 🎯
- [x] Xử lý lỗi cơ bản
- [x] Cấu hình TARGET_USER_ID qua .env hoặc code
- [x] Hiển thị thông tin user mục tiêu khi khởi động

### 🔄 Thay Đổi So Với PHASE 1

- **PHASE 1:** Self-bot theo voice của chính mình
- **PHASE 2:** Self-bot theo voice của user khác (TARGET_USER_ID)

### ❌ Không Có Trong PHASE 2

- Không có slash command
- Không có prefix command
- Không gửi tin nhắn
- Không tích hợp AI/Gemini
- Không phát nhạc

## 🐛 Xử Lý Lỗi Thường Gặp

### Lỗi: "Không tìm thấy USER_TOKEN"
- Kiểm tra file `.env` đã tạo chưa
- Đảm bảo có dòng `USER_TOKEN=...`

### Lỗi: "Không tìm thấy TARGET_USER_ID"
- Thêm dòng `TARGET_USER_ID=...` vào file `.env`
- Hoặc sửa trực tiếp trong `client/index.js` dòng 11

### Lỗi: "Đăng nhập thất bại"
- Token có thể đã hết hạn, lấy token mới
- Token không đúng định dạng
- Tài khoản có thể đã bị khóa

### Lỗi: "Không thể vào voice channel"
- Kiểm tra quyền của tài khoản trong server
- Server có thể chặn self-bot
- Kênh voice có thể đầy người

### Self-bot không theo dõi user mục tiêu?
- Đảm bảo TARGET_USER_ID chính xác (18-19 chữ số)
- Kiểm tra user mục tiêu có trong server chung không
- Xem log có hiển thị `🎯 Đang theo dõi user: ...` không

## 📝 Log Màu Sắc

- 🔵 **INFO** (Xanh dương): Thông tin chung
- 🟢 **SUCCESS** (Xanh lá): Thành công
- 🔴 **ERROR** (Đỏ): Lỗi
- 🟡 **WARN** (Vàng): Cảnh báo
- 🟣 **VOICE** (Tím): Hoạt động voice
- 🎯 **Icon mục tiêu**: User mục tiêu thực hiện hành động

## 🔧 Cách Đổi User Mục Tiêu

### Cách 1: Sửa file .env (Khuyến nghị)

```env
TARGET_USER_ID=123456789012345678
```

### Cách 2: Sửa trực tiếp trong code

Mở `client/index.js`, sửa dòng 11:

```javascript
const TARGET_USER_ID = process.env.TARGET_USER_ID || '123456789012345678';
```

Thay `123456789012345678` bằng ID user bạn muốn theo dõi.

## 🔧 Tắt Self-bot

Nhấn **Ctrl+C** trong terminal để tắt an toàn.

## 📜 License

MIT License - Tự do sử dụng cho mục đích học tập

## 🙏 Credits

- **discord.js-selfbot-v13** by [aiko-chan-ai](https://github.com/aiko-chan-ai/discord.js-selfbot-v13)

---

**Lưu ý cuối:** Dự án này chỉ phục vụ mục đích học tập. Sử dụng có trách nhiệm!
