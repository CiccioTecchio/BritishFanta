const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
const bodyParser = require('body-parser');
const playerCNT = require('./controller/playerCNT.js');
const userCNT = require('./controller/userCNT.js');
const rosaCNT =require('./controller/rosaCNT.js')
const roomCNT =require('./controller/roomCNT.js')
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
    roomCNT.createRoom(res,req.body);
});

app.get('/insertoneplayer', function (req,res) {
    let obj={
        nick: "vj",
        team: [{player:"j"},{player: "h"}]
    };
    //res.send(obj).status(200).end();
    rosaCNT.insertOnePlayer(res,obj);
});



let server = app.listen(8081, "127.0.0.1", function () {
    let address = server.address().address;
    let port = server.address().port;
    console.log("Listening on "+address+":"+port);
});