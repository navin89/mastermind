const express = require('express');
const morgan = require('morgan');
const notFound = require('./middleware/notFound');
const serverError = require('./middleware/serverError');
const dotenv = require('dotenv');
dotenv.config({path: ".env"});
const mongoose = require('mongoose');
const authenticationRoute = require('./routes/userRoutes');
const productRoute = require('./routes/productRoutes');
const logRoute = require('./routes/logRoute');
const {info, warn, error, clearLogs, LOG_FILE } = require('./utils/logUtils');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 8081
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Enable CORS for a specific origin
const allowedOrigins = [
  'http://localhost:4200',
  'https://therapienow.com'
];

// Set up CORS
app.use((req, res, next)=> {
  const originalOrigin = req.headers.origin;
  if(allowedOrigins.includes(originalOrigin)){
    res.header("Access-Control-Allow-Origin", originalOrigin);
  }
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});
/////-----------------/////

// trust the one reverse proxy
// app.set('trust proxy', 2);
// app.get('/log-ip', (req, res) => {
//   console.log('Client IP:', req.ip);
//   res.send('check server logs for the IP.');
// });

app.get('/test-ip', (req, res) => {
  console.log('X-Forwarded-For:', req.headers['x-forwarded-for']);
  console.log('req.ip:', req.ip);
  res.send('check server logs for IP details.');
});

/////-----------------/////

//clear logs
clearLogs();

/////-----------------/////
// document database connected
mongoose.connect(process.env.MONGO_URL, {})
    .then((res) => {
        info(`MongoDB connected (readyState: ${res.connection.readyState})`);
    })
    .catch((error) => {
        error(`MongoDB connection error: ${error}`);
    });
/////-----------------/////

app.use(morgan("common"));
//configure routes
app.use('/log', logRoute);
app.use('/authenticationRoute', authenticationRoute);
app.use('/api/products', productRoute);

//Invalid Route Error Handler
app.use(notFound);
//Server Error Middleware Handler
app.use(serverError)

app.listen(PORT, () => {
  info(`Server started. Log file: ${LOG_FILE}`);
  // // verify file creation
  fs.access(LOG_FILE, fs.constants.W_OK, (err) => {
    if (err) {
      error('Cannot write to log file:', err);
    } else {
      info('Log file is writable');
    }
  });
  info(`therapy2go backend-middleware-server successfully started on port ${PORT}`);
});

process.on('uncaughtException', (err) => {
  error(`Uncaught Exception: ${err.message}`);
});

process.on('unhandledRejection', (reason) => {
  warn(`Unhandled Rejection: ${reason}`);
});
