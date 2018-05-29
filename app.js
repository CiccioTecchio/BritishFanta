const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
const bodyParser = require('body-parser');
const playerCNT = require('./controller/playerCNT.js');
const userCNT = require('./controller/userCNT.js');
const rosaCNT =require('./controller/rosaCNT.js');
const giornataCNT =require('./controller/giornataCTN');
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
    let query = {Roule: 'MID', Team:'Southampton'};
    playerCNT.find(res, query);
});

app.post('/signin', function (req, res) {
    userCNT.signIn(req, res, req.body.nick, req.body.pswd);
});

app.post('/registrazione', function (req, res) {
    userCNT.insertOne(res, req.body);
});

app.post('/userlist',function (req,res) {
    userCNT.userList(res,req.body.nick);
});

app.post('/createRoom',function (req,res) {
    userCNT.createRoom(res,req.body);
});

app.post('/createteam',function(req,res){
 rosaCNT.createTeam(res,req.body);
});

app.post('/getpointsbyteam',function(req,res){
    rosaCNT.getPointsByTeam(res,req.body);
});

app.post('/getbudgetbynick', function (req,res) {
   userCNT.getBudgetByNick(res,req.body);
});

app.post('/getRosa', function (req,res) {
   rosaCNT.getRosa(res,req.body);
});

app.post('/formazione', function (req,res) {
    rosaCNT.formazione(res, req.body);
});

app.get('/getLastDay', function (req,res) {
   giornataCNT.getLastDay(res);
});

app.post('/getallvote', function (req,res) {
   giornataCNT.getAllVote(res,req.body);
});

app.post('/getvotebyteam',function (req,res) {
   giornataCNT.getVoteByTeam(res,req.body);
});

app.post('/sumpoints',function (req,res) {
    giornataCNT.sumPoints(res,req.body);
});

app.post('/leaderboard',function (req,res) {
    giornataCNT.leaderboard(res,req.body);
});


let server = app.listen(8081, "127.0.0.1", function () {
    let address = server.address().address;
    let port = server.address().port;
    console.log("Listening on "+address+":"+port);
});