/**
 * Module log đơn giản cho dự án
 * Tất cả log đều bằng tiếng Việt
 */

function log(message, type = 'INFO') {
  const timestamp = new Date().toLocaleString('vi-VN', {
    timeZone: 'Asia/Ho_Chi_Minh',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  const colors = {
    INFO: '\x1b[36m',    // Cyan
    SUCCESS: '\x1b[32m', // Green
    ERROR: '\x1b[31m',   // Red
    WARN: '\x1b[33m',    // Yellow
    VOICE: '\x1b[35m'    // Magenta
  };

  const reset = '\x1b[0m';
  const color = colors[type] || colors.INFO;

  console.log(`${color}[${timestamp}] [${type}]${reset} ${message}`);
}

function info(message) {
  log(message, 'INFO');
}

function success(message) {
  log(message, 'SUCCESS');
}

function error(message) {
  log(message, 'ERROR');
}

function warn(message) {
  log(message, 'WARN');
}

function voice(message) {
  log(message, 'VOICE');
}

module.exports = {
  log,
  info,
  success,
  error,
  warn,
  voice
};

