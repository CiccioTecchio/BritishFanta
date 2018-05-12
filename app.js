const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const bodyParser= require('body-parser');

let app = express();



let dbUrl = "mongodb://localhost:27017/";
mongoose.connect(dbUrl);

let server = app.listen(8081, function () {
    let host = server.address().address;
    let port = server.address().port;

    console.log("In ascoloto su: "+port);
});
