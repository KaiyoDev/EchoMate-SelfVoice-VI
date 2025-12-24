/**
 * EchoMate-SelfVoice-VI - PHASE 2
 * Self-bot tự động vào voice channel theo user mục tiêu
 */

require('dotenv').config();
const { Client } = require('discord.js-selfbot-v13');
const logger = require('../utils/log');
const { setupVoiceFollow } = require('./voice/follow');

// ===== CẤU HÌNH USER MỤC TIÊU =====
// ID của user cần theo dõi voice
const TARGET_USER_ID = process.env.TARGET_USER_ID || '1064755989229867008';

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
client.on('ready', async () => {
  logger.success('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  logger.success(`✓ Self-bot đã online: ${client.user.tag}`);
  logger.success(`✓ ID Self-bot: ${client.user.id}`);
  logger.success('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  
  // Hiển thị thông tin user mục tiêu
  try {
    const targetUser = await client.users.fetch(TARGET_USER_ID);
    logger.info(`🎯 Đang theo dõi user: ${targetUser.tag} (ID: ${TARGET_USER_ID})`);
  } catch (err) {
    logger.warn(`🎯 Đang theo dõi user ID: ${TARGET_USER_ID} (chưa fetch được thông tin)`);
  }
  
  logger.info('Hệ thống đã sẵn sàng - Chờ user mục tiêu vào voice...');
  
  // Khởi tạo hệ thống theo dõi voice với TARGET_USER_ID
  setupVoiceFollow(client, TARGET_USER_ID);
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

  // Kiểm tra TARGET_USER_ID
  if (!TARGET_USER_ID) {
    logger.error('Không tìm thấy TARGET_USER_ID');
    logger.error('Vui lòng thêm TARGET_USER_ID vào file .env hoặc sửa trong index.js');
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

