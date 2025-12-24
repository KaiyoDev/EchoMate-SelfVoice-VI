/**
 * Module theo dõi và tự động vào voice channel theo user
 */

const logger = require('../../utils/log');

// Lưu trạng thái voice hiện tại để tránh join trùng
let currentVoiceChannel = null;

/**
 * Khởi tạo listener theo dõi voice state của user
 * @param {Client} client - Discord self-bot client
 */
function setupVoiceFollow(client) {
  logger.info('Đã khởi tạo hệ thống theo dõi voice channel');

  client.on('voiceStateUpdate', async (oldState, newState) => {
    try {
      // Chỉ xử lý khi chính user thay đổi voice state
      if (newState.id !== client.user.id) {
        return;
      }

      // Trường hợp 1: User vào voice channel mới
      if (!oldState.channel && newState.channel) {
        await handleUserJoinVoice(newState.channel);
      }
      
      // Trường hợp 2: User chuyển voice channel
      else if (oldState.channel && newState.channel && oldState.channel.id !== newState.channel.id) {
        await handleUserSwitchVoice(oldState.channel, newState.channel);
      }
      
      // Trường hợp 3: User rời voice channel
      else if (oldState.channel && !newState.channel) {
        await handleUserLeaveVoice(oldState.channel);
      }

    } catch (err) {
      logger.error(`Lỗi khi xử lý voice state: ${err.message}`);
    }
  });
}

/**
 * Xử lý khi user vào voice channel
 */
async function handleUserJoinVoice(channel) {
  try {
    // Kiểm tra xem đã ở trong channel này chưa
    if (currentVoiceChannel && currentVoiceChannel.id === channel.id) {
      logger.warn(`Đã ở trong voice channel: ${channel.name}`);
      return;
    }

    logger.voice(`Đang vào voice channel: ${channel.name} (${channel.guild.name})`);
    
    // Join voice channel
    const connection = await channel.join();
    currentVoiceChannel = channel;
    
    logger.success(`✓ Đã vào voice channel: ${channel.name}`);

  } catch (err) {
    logger.error(`Không thể vào voice channel: ${err.message}`);
    currentVoiceChannel = null;
  }
}

/**
 * Xử lý khi user chuyển voice channel
 */
async function handleUserSwitchVoice(oldChannel, newChannel) {
  logger.voice(`Đang chuyển từ "${oldChannel.name}" sang "${newChannel.name}"`);
  
  // Rời channel cũ
  try {
    oldChannel.leave();
  } catch (err) {
    logger.warn(`Không thể rời channel cũ: ${err.message}`);
  }

  // Vào channel mới
  await handleUserJoinVoice(newChannel);
}

/**
 * Xử lý khi user rời voice channel
 */
async function handleUserLeaveVoice(channel) {
  try {
    logger.voice(`Đang rời voice channel: ${channel.name}`);
    
    channel.leave();
    currentVoiceChannel = null;
    
    logger.success(`✓ Đã rời voice channel: ${channel.name}`);

  } catch (err) {
    logger.error(`Không thể rời voice channel: ${err.message}`);
  }
}

module.exports = {
  setupVoiceFollow
};

