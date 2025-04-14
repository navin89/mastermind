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
const {clearLogs, LOG_FILE } = require('./utils/logUtils');
const fs = require('fs');
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
    return res.sendStatus(200);
  }
  next();
});
/////-----------------/////

//clear logs
clearLogs();

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
app.use('/log', logRoute);
app.use('/authenticationRoute', authenticationRoute);
app.use('/api/products', productRoute);

//Invalid Route Error Handler
app.use(notFound);
//Server Error Middleware Handler
app.use(serverError)

app.listen(PORT, () => {
  console.log(`Server started. Log file: ${LOG_FILE}`);
  // // verify file creation
  fs.access(LOG_FILE, fs.constants.W_OK, (err) => {
    if (err) {
      console.error('Cannot write to log file:', err);
    } else {
      console.log('Log file is writable');
    }
  });
  console.log(`therapy2go backend-middleware-server successfully started on port ${PORT}`);
});
