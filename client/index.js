/**
 * EchoMate Voice Bot - Discord Bot với Voice Recognition
 * Chuyển đổi từ self-bot sang bot thông thường
 */

require('dotenv').config();
const { Client, GatewayIntentBits, REST, Routes } = require('discord.js');
const logger = require('../utils/log');
const { registerCommands } = require('./voice/joinLeave');

// Khởi tạo Discord Bot Client
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// Xử lý khi bot sẵn sàng
client.on('ready', async () => {
  logger.success('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  logger.success(`✓ Bot đã online: ${client.user.tag}`);
  logger.success(`✓ Bot ID: ${client.user.id}`);
  logger.success('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  
  logger.info(`📊 Đang phục vụ ${client.guilds.cache.size} server(s)`);
  logger.info('Hệ thống đã sẵn sàng!');
  
  // Đăng ký slash commands
  await registerSlashCommands();
});

// Đăng ký slash commands
async function registerSlashCommands() {
  const commands = [
    {
      name: 'join',
      description: 'Bot tham gia voice channel của bạn'
    },
    {
      name: 'leave',
      description: 'Bot rời khỏi voice channel'
    }
  ];

  try {
    const rest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN);
    
    logger.info('Đang đăng ký slash commands...');
    
    // Đăng ký global commands (có thể mất vài phút để sync)
    await rest.put(
      Routes.applicationCommands(client.user.id),
      { body: commands }
    );
    
    logger.success('✓ Đã đăng ký slash commands: /join, /leave');
  } catch (err) {
    logger.error(`Lỗi khi đăng ký commands: ${err.message}`);
  }
}

// Xử lý slash commands
client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  try {
    await registerCommands(interaction);
  } catch (err) {
    logger.error(`Lỗi khi xử lý command: ${err.message}`);
    
    if (!interaction.replied && !interaction.deferred) {
      await interaction.reply({ 
        content: '❌ Có lỗi xảy ra khi thực thi lệnh!', 
        ephemeral: true 
      });
    }
  }
});

// Xử lý lỗi
client.on('error', (err) => {
  logger.error(`Lỗi client: ${err.message}`);
});

// Xử lý cảnh báo
client.on('warn', (warning) => {
  logger.warn(`Cảnh báo: ${warning}`);
});

// Đăng nhập bằng BOT TOKEN
async function login() {
  const token = process.env.BOT_TOKEN;

  if (!token) {
    logger.error('Không tìm thấy BOT_TOKEN trong file .env');
    logger.error('Vui lòng tạo bot tại: https://discord.com/developers/applications');
    logger.error('Sau đó thêm BOT_TOKEN vào file .env');
    process.exit(1);
  }

  try {
    logger.info('Đang đăng nhập...');
    await client.login(token);
  } catch (err) {
    logger.error(`Đăng nhập thất bại: ${err.message}`);
    logger.error('Kiểm tra lại BOT_TOKEN trong file .env');
    process.exit(1);
  }
}

// Xử lý tắt chương trình
process.on('SIGINT', () => {
  logger.warn('\nĐang tắt bot...');
  client.destroy();
  process.exit(0);
});

// Bắt đầu đăng nhập
login();

module.exports = { client };
