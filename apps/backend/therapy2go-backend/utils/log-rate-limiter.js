const rateLimit = require('express-rate-limit');
const { validLogNumbers } = require('./logUtils');

const logLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: (req) => {
    // Allow higher limits for error (level 5) & fatal (level 6) levels
    return req.body.level >= 5 ? 1000 : 100;
  },
  message: 'Too many log requests, please try later',
  skip: (req) => {
    // Skip validation if level is invalid - (error handled within route handler func)
    const level = Number(req.body.level);
    return !validLogNumbers.includes(level);
  }
});

module.exports = logLimiter;
