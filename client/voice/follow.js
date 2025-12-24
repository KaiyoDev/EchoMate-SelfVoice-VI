/**
 * Module theo dõi và tự động vào voice channel theo user mục tiêu
 */

const logger = require('../../utils/log');

// Lưu trạng thái voice hiện tại để tránh join trùng
let currentVoiceChannel = null;
let targetUserId = null;
let clientInstance = null;

/**
 * Khởi tạo listener theo dõi voice state của user mục tiêu
 * @param {Client} client - Discord self-bot client
 * @param {string} userId - ID của user cần theo dõi
 */
function setupVoiceFollow(client, userId) {
  targetUserId = userId;
  clientInstance = client;
  logger.info(`Đã khởi tạo hệ thống theo dõi voice channel`);
  logger.info(`Đang theo dõi user ID: ${targetUserId}`);

  client.on('voiceStateUpdate', async (oldState, newState) => {
    try {
      // CHỈ xử lý khi user mục tiêu thay đổi voice state
      if (newState.id !== targetUserId) {
        return;
      }

      // Lấy thông tin user để log
      const targetUser = await client.users.fetch(targetUserId).catch(() => null);
      const userName = targetUser ? targetUser.tag : `User ${targetUserId}`;

      // Trường hợp 1: User mục tiêu vào voice channel mới
      if (!oldState.channel && newState.channel) {
        logger.voice(`🎯 ${userName} đã vào voice channel`);
        await handleUserJoinVoice(newState.channel);
      }
      
      // Trường hợp 2: User mục tiêu chuyển voice channel
      else if (oldState.channel && newState.channel && oldState.channel.id !== newState.channel.id) {
        logger.voice(`🎯 ${userName} đã chuyển voice channel`);
        await handleUserSwitchVoice(oldState.channel, newState.channel);
      }
      
      // Trường hợp 3: User mục tiêu rời voice channel
      else if (oldState.channel && !newState.channel) {
        logger.voice(`🎯 ${userName} đã rời voice channel`);
        await handleUserLeaveVoice(oldState.channel);
      }

    } catch (err) {
      logger.error(`Lỗi khi xử lý voice state: ${err.message}`);
    }
  });
}

/**
 * Xử lý khi user mục tiêu vào voice channel
 */
async function handleUserJoinVoice(channel) {
  try {
    // Kiểm tra xem đã ở trong channel này chưa
    if (currentVoiceChannel && currentVoiceChannel.id === channel.id) {
      logger.warn(`Self-bot đã ở trong voice channel: ${channel.name}`);
      return;
    }

    logger.voice(`→ Self-bot đang vào voice channel: ${channel.name} (${channel.guild.name})`);
    
    // Join voice channel - Sử dụng client.voice.joinChannel()
    const connection = await clientInstance.voice.joinChannel(channel);
    currentVoiceChannel = channel;
    
    logger.success(`✓ Self-bot đã vào voice channel: ${channel.name}`);

  } catch (err) {
    logger.error(`Không thể vào voice channel: ${err.message}`);
    currentVoiceChannel = null;
  }
}

/**
 * Xử lý khi user mục tiêu chuyển voice channel
 */
async function handleUserSwitchVoice(oldChannel, newChannel) {
  logger.voice(`→ Self-bot đang chuyển từ "${oldChannel.name}" sang "${newChannel.name}"`);
  
  // Rời channel cũ
  try {
    await clientInstance.voice.disconnect();
  } catch (err) {
    logger.warn(`Không thể rời channel cũ: ${err.message}`);
  }

  // Vào channel mới
  await handleUserJoinVoice(newChannel);
}

/**
 * Xử lý khi user mục tiêu rời voice channel
 */
async function handleUserLeaveVoice(channel) {
  try {
    logger.voice(`→ Self-bot đang rời voice channel: ${channel.name}`);
    
    // Disconnect voice - Sử dụng client.voice.disconnect()
    await clientInstance.voice.disconnect();
    currentVoiceChannel = null;
    
    logger.success(`✓ Self-bot đã rời voice channel: ${channel.name}`);

  } catch (err) {
    logger.error(`Không thể rời voice channel: ${err.message}`);
  }
}

module.exports = {
  setupVoiceFollow
};

