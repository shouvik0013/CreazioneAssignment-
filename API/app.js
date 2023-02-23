var path = require('path');
const fs = require('fs');

var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// * ROUTES *
const calculateRoute = require('./api/calculator/calculator.routes');

const app = express();
const accessLogStream = fs.createWriteStream(
    path.join(__dirname, 'access.log'),
    {
        flags: 'a', // 'a' for append
    }
);

app.use(logger('combined', { stream: accessLogStream }));
app.use(express.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Content-Type, Authorization'
    );
    next();
});
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/', calculateRoute);
app.use((error, req, res, next) => {
    console.log('IN APP.JS ERROR HANDLER -> ' + error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data || null;
    res.status(status).json({ message: message, data: data });
});

module.exports = app;
