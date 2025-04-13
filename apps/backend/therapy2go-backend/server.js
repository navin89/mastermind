const express = require('express');
const morgan = require('morgan');
const notFound = require('./middleware/notFound');
const serverError = require('./middleware/serverError');
const dotenv = require('dotenv');
dotenv.config({path: ".env"});
const mongoose = require('mongoose');
const authenticationRoute = require('./routes/userRoutes');
const productRoute = require('./routes/productRoutes');
const fs = require('fs');
const path = require('path');
const LOG_DIR = path.join(__dirname, 'logs');
const LOG_FILE = path.join(LOG_DIR, 'therapienow-uat.log');

const app = express();
const PORT = process.env.PORT || 8081
app.use(express.urlencoded({extended: true}));
app.use(express.json());

/////-----------------/////

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
    res.sendStatus(200);
  }
  next();
});
/////-----------------/////


// Enable logger route
// Clear log on server start
const initLogs = () => {
  if (!fs.existsSync(LOG_DIR)) fs.mkdirSync(LOG_DIR);
  fs.writeFileSync(LOG_FILE, '');
};

initLogs();

app.post('/log', (req, res) => {
  try {
    const { message, level, timestamp, fileName, lineNumber } = req.body;
    console.log('Received log request:', req.body);

    if (!message || !level) {
      return res.status(400).send('Missing required log fields');
    }

    const logEntry = `[${timestamp || new Date().toISOString()}] [${level}] ${message}` +
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
/////-----------------/////

// Enable mongoose connection to MongoDb
mongoose.connect(process.env.MONGO_URL, {})
    .then((res) => {
        console.log("mongo db connected with ready-state value::", res.connection.readyState);
    })
    .catch((error) => {
        console.log(error);
    });
/////-----------------/////

app.use(morgan("common"));
//configure routes
app.use('/authenticationRoute', authenticationRoute)
app.use('/api/products', productRoute)
//Invalid Route Error Handler
app.use(notFound);
//Server Error Middleware Handler
app.use(serverError)

app.listen(PORT, () => {
    console.log(`Log server ready on port ${PORT}`);
    console.log(`Logs will be saved to: ${LOG_FILE}`);
    console.log(`therapy2go backend-middleware-server successfully started on port ${PORT}`);
});
