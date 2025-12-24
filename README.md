# 🎙️ EchoMate Voice Bot

Discord Bot với Voice Recognition và AI Response (Tiếng Việt)

**Đã chuyển từ Self-bot → Bot thông thường**

## ⚠️ QUAN TRỌNG

- ✅ **Hợp pháp**: Bot thông thường (không vi phạm ToS)
- ✅ **Hoạt động đầy đủ**: Voice receiving + STT + AI
- ✅ **Cài đặt đơn giản**: Không cần Visual Studio

## 📋 Tính Năng

### ✅ Đã Hoàn Thành

- [x] Bot đăng nhập bằng bot token
- [x] Slash commands: `/join`, `/leave`
- [x] Tự động vào/rời voice channel
- [x] **Voice receiving hoạt động!**
- [x] Phát hiện khi user nói
- [x] Ghi audio stream ra file PCM

### 🔜 Đang Phát Triển

- [ ] Speech-to-Text (Wit.ai)
- [ ] Gemini AI response
- [ ] Text-to-Speech (phát lại voice)

## 🛠️ Công Nghệ

- **Node.js** >= 16.11.0
- **discord.js** v14
- **@discordjs/voice** (voice receiving)
- **opusscript** (audio codec - không cần Visual Studio)
- **prism-media** (audio processing)
- **libsodium-wrappers** (encryption)

## 📁 Cấu Trúc Dự Án

```
EchoMate-Voice-Bot/
├─ client/
│   ├─ index.js          # Bot entry point
│   ├─ ai/
│   │   └─ stt.js        # Speech-to-Text (TODO)
│   └─ voice/
│       ├─ joinLeave.js  # /join, /leave commands
│       ├─ listen.js     # Voice receiver
│       └─ speak.js      # TTS output (TODO)
├─ utils/
│   └─ log.js            # Logger tiếng Việt
├─ temp/                 # Audio tạm
├─ .env                  # Config
├─ package.json
└─ README.md
```

## 🚀 Hướng Dẫn Cài Đặt

### Bước 1: Tạo Discord Bot

1. Truy cập: [Discord Developer Portal](https://discord.com/developers/applications)
2. Click **New Application** → đặt tên (vd: `EchoMate`)
3. Vào tab **Bot** → **Add Bot**
4. **Reset Token** → Copy token
5. Bật **Privileged Gateway Intents**:
   - ✅ Server Members Intent
   - ✅ Message Content Intent
6. Vào tab **OAuth2** → **URL Generator**
   - Scopes: `bot`, `applications.commands`
   - Permissions: 
     - `Send Messages`
     - `Connect` (Voice)
     - `Speak` (Voice)
     - `Use Voice Activity`
7. Copy **Generated URL** → mở trong trình duyệt → invite bot vào server

### Bước 2: Cài Đặt Dependencies

```bash
npm install
```

**Lưu ý:**
- ✅ Dùng `opusscript` (không cần Visual Studio)
- ✅ Cài đặt nhanh (~5 giây)
- ✅ Không cần build tools

### Bước 3: Tạo File .env

```env
BOT_TOKEN=paste_bot_token_vào_đây
```

### Bước 4: Chạy Bot

```bash
npm start
```

## 📖 Cách Sử Dụng

1. **Khởi động bot:**
   ```bash
   npm start
   ```

2. **Vào Discord server (nơi đã invite bot)**

3. **Vào voice channel**

4. **Gõ lệnh:**
   ```
   /join   → Bot vào voice channel của bạn
   /leave  → Bot rời voice
   ```

5. **Nói trong voice:**
   - Bot sẽ phát hiện và log:
     ```
     [VOICE] <User 123456...> đang nói
     [VOICE] <User 123456...> ngừng nói
     📁 Đã lưu audio: audio_123_1234567890.pcm
     ```

## 🎯 Kết Quả Mong Đợi

```
✓ Bot đã online: EchoMate#1234
✓ Bot ID: 987654321...
📊 Đang phục vụ 1 server(s)
Đang đăng ký slash commands...
✓ Đã đăng ký slash commands: /join, /leave
Hệ thống đã sẵn sàng!

[User dùng /join]
🎤 Đang vào voice channel: General
✓ Đã vào voice channel: General
🎤 Bắt đầu lắng nghe giọng nói...
✓ Voice receiver đã sẵn sàng!

[User nói]
[VOICE] <User 1064755989229867008> đang nói
[VOICE] <User 1064755989229867008> ngừng nói
📁 Đã lưu audio: audio_1064755989229867008_1703425123456.pcm
🗑️ Đã xóa file tạm: audio_1064755989229867008_1703425123456.pcm
```

## 🐛 Xử Lý Lỗi

### Bot không online?
- Kiểm tra `BOT_TOKEN` trong `.env`
- Đảm bảo bot đã được invite vào server

### Lỗi `/join` không hoạt động?
- Đợi 1-2 phút để Discord sync slash commands
- Hoặc kick + invite lại bot

### Không nhận được audio?
- Kiểm tra bot có quyền `Connect` và `Speak`
- Đảm bảo đã cài `@discordjs/opus`

### Lỗi `libsodium` hoặc `sodium`?
```bash
npm install libsodium-wrappers
```

## 🔜 Roadmap

### PHASE 1 ✅ (Hoàn thành)
- [x] Bot login
- [x] Slash commands
- [x] Voice receiving

### PHASE 2 🔄 (Đang làm)
- [ ] Wit.ai STT integration
- [ ] Xử lý audio → text

### PHASE 3 📅 (Kế hoạch)
- [ ] Gemini AI response
- [ ] Context memory
- [ ] Personality traits

### PHASE 4 📅 (Kế hoạch)
- [ ] Text-to-Speech (TTS)
- [ ] Phát lại response vào voice

## 📝 So Sánh Self-bot vs Bot

| Tính năng | Self-bot (Cũ) | Bot (Mới) |
|-----------|---------------|-----------|
| **Hợp pháp** | ❌ Vi phạm ToS | ✅ Hợp pháp |
| **Voice receiving** | ❌ Không hoạt động | ✅ Hoạt động |
| **Cài đặt** | 🟡 Khó (lỗi nhiều) | ✅ Dễ |
| **Ổn định** | ❌ Không | ✅ Rất ổn |
| **Quyền** | ⚠️ Như user | ✅ Như bot |

## 🙏 Credits

- **discord.js** - Discord API wrapper
- **@discordjs/voice** - Voice support

---

**Lưu ý:** Dự án này chỉ phục vụ mục đích học tập. Sử dụng có trách nhiệm!
