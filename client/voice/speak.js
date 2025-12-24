/**
 * Module phát audio vào voice channel
 * Dùng để test hoặc phát TTS response
 */

const { createAudioPlayer, createAudioResource, AudioPlayerStatus } = require('@discordjs/voice');
const logger = require('../../utils/log');

/**
 * Phát file audio vào voice channel
 * @param {VoiceConnection} connection - Voice connection
 * @param {string} audioPath - Đường dẫn file audio
 */
function playAudio(connection, audioPath) {
  try {
    logger.voice('🔊 Đang phát audio...');

    // Tạo audio player
    const player = createAudioPlayer();

    // Tạo audio resource
    const resource = createAudioResource(audioPath);

    // Subscribe player vào connection
    connection.subscribe(player);

    // Phát audio
    player.play(resource);

    // Xử lý events
    player.on(AudioPlayerStatus.Playing, () => {
      logger.success('✓ Đang phát audio');
    });

    player.on(AudioPlayerStatus.Idle, () => {
      logger.info('✓ Đã phát xong audio');
    });

    player.on('error', (err) => {
      logger.error(`Lỗi khi phát audio: ${err.message}`);
    });

  } catch (err) {
    logger.error(`Không thể phát audio: ${err.message}`);
  }
}

/**
 * Phát text bằng TTS (TODO)
 * @param {VoiceConnection} connection 
 * @param {string} text 
 */
function speakText(connection, text) {
  // TODO: Chuyển text → audio bằng TTS
  // - Google TTS
  // - ElevenLabs
  // - Edge TTS (miễn phí)
  
  logger.warn('TODO: TTS chưa được implement');
  logger.info(`Text cần nói: "${text}"`);
}

module.exports = {
  playAudio,
  speakText
};

