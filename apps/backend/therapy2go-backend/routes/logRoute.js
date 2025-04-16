const express = require('express');
const fs = require('fs');
const {info, error, LOG_FILE, validLogNumbers, NGX_LEVELS} = require('../utils/logUtils');
const router = express.Router();
const logLimiter = require('../utils/log-rate-limiter');

router.post('/', logLimiter,(req, res) => {
  try {
    const { message, level, timestamp, fileName, lineNumber } = req.body;
    info('received log requests from client:', req.body);
    info(`logs will be saved to: ${LOG_FILE}`);

    // -------------------------------
    // Enhanced Validation Section
    // -------------------------------
    if (typeof message !== 'string' || message.trim().length === 0) {
      return res.status(400).send('Invalid message format');
    }

    const levelNum = Number(level);
    if (isNaN(levelNum) || !validLogNumbers.includes(levelNum)) {
      return res.status(400).send('Invalid log level');
    }

    if (typeof fileName !== 'undefined' && typeof fileName !== 'string') {
      return res.status(400).send('Invalid file name format');
    }
    // -------------------------------

    // Convert to standardized string
    const levelString = NGX_LEVELS[levelNum];
    // append log
    const logEntry = `[${timestamp || new Date().toISOString()}] [frontend] [${levelString}] ${message}` +
      (fileName ? ` (${fileName}:${lineNumber || '?'})` : '') + '\n';

    fs.appendFile(LOG_FILE, logEntry, (err) => {
      if (err) {
        error('Log write error:', err);
        return res.status(500).send('Error saving log');
      }
      res.status(200).send({ status: 'logged' });
    });
  } catch (err) {
    error('Log processing error:', err);
    res.status(500).send('Server error');
  }
});



module.exports = router;
