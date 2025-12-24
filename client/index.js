/**
 * EchoMate-SelfVoice-VI
 * Self-bot tự động vào voice channel theo user
 */

require('dotenv').config();
const { Client } = require('discord.js-selfbot-v13');
const logger = require('../utils/log');
const { setupVoiceFollow } = require('./voice/follow');

// Khởi tạo Discord self-bot client
const client = new Client({
  checkUpdate: false, // Tắt kiểm tra cập nhật để giảm log
  readyStatus: false, // Không set status khi ready
  patchVoice: true,   // Bật hỗ trợ voice
  ws: {
    properties: {
      browser: 'Discord Client'
    }
  }
});

// Xử lý khi self-bot sẵn sàng
client.on('ready', () => {
  logger.success('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  logger.success(`✓ Self-bot đã online: ${client.user.tag}`);
  logger.success(`✓ ID: ${client.user.id}`);
  logger.success('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  logger.info('Đang theo dõi voice channel...');
  
  // Khởi tạo hệ thống theo dõi voice
  setupVoiceFollow(client);
});

// Xử lý lỗi
client.on('error', (err) => {
  logger.error(`Lỗi client: ${err.message}`);
});

// Xử lý cảnh báo
client.on('warn', (warning) => {
  logger.warn(`Cảnh báo: ${warning}`);
});

// Đăng nhập bằng USER TOKEN
async function login() {
  const token = process.env.USER_TOKEN;

  if (!token) {
    logger.error('Không tìm thấy USER_TOKEN trong file .env');
    logger.error('Vui lòng tạo file .env và thêm USER_TOKEN=your_token_here');
    process.exit(1);
  }

  try {
    logger.info('Đang đăng nhập...');
    await client.login(token);
  } catch (err) {
    logger.error(`Đăng nhập thất bại: ${err.message}`);
    logger.error('Kiểm tra lại USER_TOKEN trong file .env');
    process.exit(1);
  }
}

// Xử lý tắt chương trình
process.on('SIGINT', () => {
  logger.warn('\nĐang tắt self-bot...');
  client.destroy();
  process.exit(0);
});

// Bắt đầu đăng nhập
login();

