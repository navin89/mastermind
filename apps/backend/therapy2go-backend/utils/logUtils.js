const fs = require('fs');
const path = require('path');
const LOG_DIR = path.join(__dirname, '../logs');
const LOG_FILE = path.join(LOG_DIR, 'therapienow-uat.log');
const AWS = require('aws-sdk');
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

// AWS
const s3 = new AWS.S3({
  endpoint: 'https://logs-bucket-mastermind.fra1.digitaloceanspaces.com',
  accessKeyId: process.env.SPACES_KEY,
  secretAccessKey: process.env.SPACES_SECRET
});

// Improved stack trace parser for backend calls
const getCallerInfo = () => {
  const stack = new Error().stack.split('\n');
  let caller = null;

  for (let i = 3; i < stack.length; i++) {
    const frame = stack[i];
    if (!frame.includes('logUtils.js')) {
      const match = frame.match(/\((.*):(\d+):(\d+)\)/);
      if (match) {
        caller = {
          file: path.basename(match[1]),
          line: match[2]
        };
        break;
      }
    }
  }

  return caller || { file: 'internal', line: '0' };
};

const clearLogs = () => {
  if (!fs.existsSync(LOG_DIR)) {
    fs.mkdirSync(LOG_DIR, { recursive: true });
    fs.chmodSync(LOG_DIR, 0o777); // Read/write for all
  }
  fs.writeFileSync(LOG_FILE, '');
  fs.chmodSync(LOG_FILE, 0o666); // Read/write for all
};

const log = (level, message, origin= 'backend') => {
  const timestamp = new Date().toISOString();
  const caller = getCallerInfo();

  const entry = `[${timestamp}] [${origin}] [${level}] ${message} ` +
    `(${caller.file}:${caller.line})\n`;

  fs.appendFile(LOG_FILE, entry, (err) => {
    if (err) console.error(`Failed to write log: ${err.message}`);
  });

  // Upload to Spaces
  s3.upload({
    Bucket: 'logs-bucket-mastermind',
    Key: `logs/therapienow-${new Date().toISOString()}.log`,
    Body: entry
  }).promise()
    .then(result => {
      console.log(result)
    });
};


module.exports =
  {
    LOG_DIR,
    LOG_FILE,
    validLogNumbers,
    validLogStrings,
    NGX_LEVELS,

    //functions
    clearLogs,
    log,
    info: (msg) => log('INFO', msg),
    error: (msg) => log('ERROR', msg),
    debug: (msg) => log('DEBUG', msg),
    warn: (msg) => log('WARN', msg)
  };




