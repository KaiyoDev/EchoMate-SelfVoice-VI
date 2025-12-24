/**
 * Module lắng nghe audio từ voice channel
 * Sử dụng @discordjs/voice receiver
 */

const { EndBehaviorType } = require('@discordjs/voice');
const prism = require('prism-media');
const fs = require('fs');
const path = require('path');
const logger = require('../../utils/log');

// Thư mục lưu audio tạm
const TEMP_DIR = path.join(__dirname, '../../temp');

// Map lưu các listener đang active: guildId -> { streams, ... }
const activeListeners = new Map();

/**
 * Khởi tạo thư mục temp nếu chưa có
 */
function ensureTempDir() {
  if (!fs.existsSync(TEMP_DIR)) {
    fs.mkdirSync(TEMP_DIR, { recursive: true });
  }
}

/**
 * Bắt đầu lắng nghe audio trong voice channel
 * @param {VoiceConnection} connection - Voice connection
 * @param {string} guildId - Guild ID
 */
function startListening(connection, guildId) {
  ensureTempDir();

  logger.info('🎤 Bắt đầu lắng nghe giọng nói...');

  // Lấy voice receiver
  const receiver = connection.receiver;

  // Lắng nghe khi có user nói
  receiver.speaking.on('start', (userId) => {
    handleUserStartSpeaking(receiver, userId, guildId);
  });

  // Lưu vào map
  activeListeners.set(guildId, { receiver });

  logger.success('✓ Voice receiver đã sẵn sàng!');
}

/**
 * Xử lý khi user bắt đầu nói
 */
function handleUserStartSpeaking(receiver, userId, guildId) {
  try {
    logger.voice(`[VOICE] <User ${userId}> đang nói`);

    // Subscribe audio stream của user này
    const audioStream = receiver.subscribe(userId, {
      end: {
        behavior: EndBehaviorType.AfterSilence,
        duration: 1000 // Kết thúc sau 1s im lặng
      }
    });

    // Tạo file để ghi audio (tùy chọn)
    const timestamp = Date.now();
    const fileName = `audio_${userId}_${timestamp}.pcm`;
    const filePath = path.join(TEMP_DIR, fileName);
    const writeStream = fs.createWriteStream(filePath);

    // Decode Opus → PCM
    const opusDecoder = new prism.opus.Decoder({
      frameSize: 960,
      channels: 2,
      rate: 48000
    });

    // Pipe: audioStream → Opus Decoder → File
    audioStream.pipe(opusDecoder).pipe(writeStream);

    // Khi stream kết thúc
    audioStream.on('end', () => {
      logger.voice(`[VOICE] <User ${userId}> ngừng nói`);
      
      // TODO: Gửi file audio qua STT (Wit.ai / Google / VOSK)
      // TODO: Nhận text → gửi cho Gemini
      // TODO: Gemini trả lời → TTS → phát lại voice
      
      logger.info(`📁 Đã lưu audio: ${fileName}`);
      
      // Xóa file sau 5 giây (cleanup)
      setTimeout(() => {
        try {
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            logger.info(`🗑️ Đã xóa file tạm: ${fileName}`);
          }
        } catch (err) {
          // Ignore
        }
      }, 5000);
    });

    audioStream.on('error', (err) => {
      logger.error(`Lỗi audio stream: ${err.message}`);
    });

  } catch (err) {
    logger.error(`Lỗi khi xử lý audio: ${err.message}`);
  }
}

/**
 * Dừng lắng nghe
 */
function stopListening(guildId) {
  if (activeListeners.has(guildId)) {
    activeListeners.delete(guildId);
    logger.info('🎤 Đã dừng lắng nghe');
  }
}

module.exports = {
  startListening,
  stopListening
};
