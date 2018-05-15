const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const playerCNT = require('./controller/playerCNT.js');
const userCNT = require('./controller/userCNT.js');
const fs = require('fs');
const routing = require('./route/route')
let app = express();

let dbUrl = "mongodb://localhost:27017/dbpl";
mongoose.connect(dbUrl);

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/view'));
app.use(bodyParser.json());
app.use(cookieParser());

app.get('/playerlist', function (req, res, next) {
    playerCNT.playerList(res);
});

app.get('/insertOne', function (req, res, next) {

    // let obj=JSON.stringify( );
    userCNT.insertOne(res, {name: "Paolo", surname: "Brosio", nick: "medjugorie", pswd: "1234"});
});

app.get('/find', function (req, res, next) {
    let query = {Roule: 'GK'};
    playerCNT.find(res, query);
});

app.get('/userlist', function (req, res, next) {
    userCNT.userList(res);
});

/*app.get('/', function (req,res,next) {
        res.send('BritishFanta🇬🇧');
});*/

app.get('/findbynick', function (req, res, next) {

});
//todo far caricare la home se solo se autenticato
app.post('/signin', function (req, res) {
    let nick = req.body.nick;
    let pswd = req.body.pswd;
    userCNT.signIn(req, res, nick, pswd);
});

app.get('/cookie', function (req, res) {
    res.cookie('name', 'bivaebviea', {expire: 360000 + Date.now()}).send(); //Sets name = express
});

app.post('/registrazione', function (req, res) {
    console.log(req.body);
    userCNT.insertOne(res, req.body);
});

//app.use(express.static(__dirname + '/view'));


let server = app.listen(8081, function () {
    let host = server.address().address;
    let port = server.address().port;

    console.log("Listening on " + port);
});

