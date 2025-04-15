const fs = require('fs');
const path = require('path');
// Central configuration
const LOG_DIR = path.join(__dirname, '../logs');
console.log(__dirname);
const LOG_FILE = path.join(LOG_DIR, 'therapienow-uat.log');
const NGX_LEVELS = {
  0: 'TRACE',
  1: 'DEBUG',
  2: 'INFO',
  3: 'LOG',
  4: 'WARN',
  5: 'ERROR',
  6: 'FATAL'
};

const validLogNumbers = [0, 1, 2, 3, 4, 5, 6];
const validLogStrings = Object.values(NGX_LEVELS);
const clearLogs = () => {
  if (!fs.existsSync(LOG_DIR)) {
    fs.mkdirSync(LOG_DIR, { recursive: true });
    fs.chmodSync(LOG_DIR, 0o777); // Read/write for all
  }
  fs.writeFileSync(LOG_FILE, '');
  fs.chmodSync(LOG_FILE, 0o666); // Read/write for all
  console.log('Logs initialized at:', LOG_FILE);
};

module.exports = {LOG_DIR, LOG_FILE, validLogNumbers, validLogStrings, NGX_LEVELS, clearLogs};




