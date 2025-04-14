const express = require('express');
const fs = require('fs');
const {LOG_FILE, validLogNumbers, NGX_LEVELS} = require('../utils/logUtils');
const router = express.Router();
const logLimiter = require('../utils/log-rate-limiter');

router.post('/', logLimiter,(req, res) => {
  try {
    console.log(`logs will be saved to: ${LOG_FILE}`);
    const { message, level, timestamp, fileName, lineNumber } = req.body;
    console.log('Received log request:', req.body);

    // Validate numeric or string level
    const levelNum = Number(level);
    if (isNaN(levelNum)) {
      return res.status(400).send('Invalid log level type');
    }

    if (!validLogNumbers.includes(levelNum)) {
      return res.status(400).send('Invalid log level value');
    }

    // Convert to standardized string
    const levelString = NGX_LEVELS[levelNum];

    if (!message || !level) {
      return res.status(400).send('Missing required log fields');
    }

    // process log
    const logEntry = `[${timestamp || new Date().toISOString()}] [${levelString}] ${message}` +
      (fileName ? ` (${fileName}:${lineNumber || '?'})` : '') + '\n';

    fs.appendFile(LOG_FILE, logEntry, (err) => {
      if (err) {
        console.error('Log write error:', err);
        return res.status(500).send('Error saving log');
      }
      res.status(200).send({ status: 'logged' });
    });
  } catch (err) {
    console.error('Log processing error:', err);
    res.status(500).send('Server error');
  }
});



module.exports = router;
