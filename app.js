const createError = require('http-errors');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const playerCNT = require('./controller/playerCNT.js');
const userCNT = require('./controller/userCNT.js');
const fs = require('fs');
let app = express();

let dbUrl = "mongodb://localhost:27017/dbpl";
mongoose.connect(dbUrl);

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/view'));
app.use(bodyParser.json());

app.get('/playerlist', function (req, res) {
    playerCNT.playerList(res);
});

app.get('/find', function (req, res) {
    let query = {Roule: 'GK'};
    playerCNT.find(res, query);
});

app.get('/userlist', function (req, res) {
    userCNT.userList(res);
});

app.post('/signin', function (req, res) {
    userCNT.signIn(req, res, req.body.nick, req.body.pswd);
});

app.post('/registrazione', function (req, res) {
    userCNT.insertOne(res, req.body);
});

let server = app.listen(8081, function () {
    let port = server.address().port;
    console.log("Listening on " + port);
});