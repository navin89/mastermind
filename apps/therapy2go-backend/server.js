const express = require('express');
const morgan = require('morgan');
const notFound = require('./middleware/notFound');
const serverError = require('./middleware/serverError');
const http = require('http');
const dotenv = require('dotenv');
dotenv.config({path: ".env"});
const mongoose = require('mongoose');
const api = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');


mongoose.connect(process.env.MONGO_URL, {})
    .then((res) => {
        console.log("Mongo DB connected");
    })
    .catch((error) => {
        console.log(error);
    });

const app = express()
const PORT = process.env.PORT || 8200

// Enable CORS for a specific origin
// Set up CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Origin", "http://localhost:4200"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

app.use(express.urlencoded({extended: true}));

//configure api from api route
app.use('/api', api)
app.use('/api/course', productRoutes)

app.use(express.json());
app.use(morgan("common"));
//Invalid Route Error Handler
app.use(notFound);
//Server Error Middleware Handler
app.use(serverError)

const requestListener = function (req, res) {
    res.statusCode = 200;
    res.end("My first server!");
}

const server = http.createServer(requestListener);

app.listen(PORT, () => {
    console.log(`therapy2go backend-middleware-server successfully started on port ${PORT}`);
});