/**
 * Module Speech-to-Text sử dụng Wit.ai (miễn phí, không cần Visual Studio)
 * Chuyển đổi audio → text (tiếng Việt)
 */

const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const logger = require('../../utils/log');

// Wit.ai API token
let witAiToken = null;

/**
 * Khởi tạo Speech-to-Text
 */
function initializeSpeechClient() {
  try {
    // Lấy Wit.ai token từ env
    witAiToken = process.env.WIT_AI_TOKEN;
    
    if (!witAiToken) {
      logger.warn('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      logger.warn('⚠ Không tìm thấy WIT_AI_TOKEN');
      logger.warn('📥 Tạo token miễn phí tại: https://wit.ai');
      logger.warn('   1. Đăng nhập wit.ai (dùng Facebook/GitHub)');
      logger.warn('   2. Tạo app mới, chọn Language: Vietnamese');
      logger.warn('   3. Settings → Copy Server Access Token');
      logger.warn('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      return false;
    }

    logger.success('✓ Đã khởi tạo Wit.ai Speech-to-Text (miễn phí)');
    return true;

  } catch (err) {
    logger.error(`Không thể khởi tạo STT: ${err.message}`);
    return false;
  }
}

/**
 * Chuyển đổi audio file thành text (tiếng Việt)
 * @param {string} audioFilePath - Đường dẫn file audio (WAV format)
 * @returns {Promise<string>} - Text nhận được
 */
async function transcribeAudio(audioFilePath) {
  if (!witAiToken) {
    logger.warn('STT chưa được khởi tạo');
    return null;
  }

  try {
    // Đọc file audio
    const audioStream = fs.createReadStream(audioFilePath);

    // Gửi request lên Wit.ai
    const response = await axios.post(
      'https://api.wit.ai/speech?v=20220622',
      audioStream,
      {
        headers: {
          'Authorization': `Bearer ${witAiToken}`,
          'Content-Type': 'audio/wav',
        },
        timeout: 30000 // 30 giây timeout
      }
    );

    // Lấy text từ response
    const text = response.data?.text || '';

    if (!text || text.trim() === '') {
      logger.warn('Không nhận dạng được giọng nói');
      return null;
    }

    return text.trim();

  } catch (err) {
    if (err.response?.status === 401) {
      logger.error('WIT_AI_TOKEN không hợp lệ - kiểm tra lại token');
    } else if (err.response?.status === 429) {
      logger.error('Đã vượt giới hạn requests - đợi 1 phút');
    } else {
      logger.error(`Lỗi khi transcribe audio: ${err.message}`);
    }
    return null;
  }
}

/**
 * Xóa file audio tạm sau khi xử lý
 * @param {string} filePath - Đường dẫn file cần xóa
 */
function cleanupAudioFile(filePath) {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  } catch (err) {
    logger.warn(`Không thể xóa file tạm: ${err.message}`);
  }
}

/**
 * Dọn dẹp khi tắt chương trình
 */
function cleanup() {
  // Wit.ai không cần cleanup
}

// TODO: Có thể thay Wit.ai bằng STT engine khác:
// - Google Cloud Speech-to-Text (cần API key, có phí)
// - AssemblyAI (miễn phí 3 giờ/tháng)
// - Deepgram (miễn phí $200 credit)
// - VOSK (offline nhưng cần Visual Studio trên Windows)
// - Whisper API (OpenAI, chính xác nhưng có phí)

module.exports = {
  initializeSpeechClient,
  transcribeAudio,
  cleanupAudioFile,
  cleanup
};
