const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const bodyParser= require('body-parser');
const playerCNT = require('./controller/playerCNT.js');
const userCNT = require('./controller/userCNT.js');
const fs= require('fs');
const routing= require('./route/route')
let app= express();

let dbUrl = "mongodb://localhost:27017/dbpl";
mongoose.connect(dbUrl);




app.get('/playerlist', function (req, res, next) {
    playerCNT.playerList(res);
});

app.get('/insertOne', function (req,res,next) {

   // let obj=JSON.stringify( );
    userCNT.insertOne(res,{name:"Paolo",surname:"Brosio",nick:"medjugorie",pswd:"1234"});
});

app.get('/find', function (req,res,next) {
    let query={Roule: 'GK'};
    playerCNT.find(res,query);
});

app.get('/userlist', function (req,res,next) {
    userCNT.userList(res);
});

/*app.get('/', function (req,res,next) {
        res.send('BritishFanta🇬🇧');
});*/

app.get('/route', function (req, res) {
routing.routing(res,'./view/route.html');
});

//app.use(express.static(__dirname + '/view'));
app.use(express.static(__dirname + '/view/'));

let urlencodedParser = bodyParser.urlencoded({ extended: true });

app.get('/sender', function (req, res) {
    var html='';
    html +="<body>";
    html += "<form action='/receiver'  method='post' name='form1'><br>";
    html += "<input type= 'text' name='name' placeholder='nome'><br>";
    html += "<input type='text' name='email' placeholder='email'><br>";
    html += "<input type='text' name='address' placeholder='address'><br>";
    html += "<input type='text' name='mobilno' placeholder='mobile number'><br>";
    html += "<input type='submit' value='submit'>";
    html += "<INPUT type='reset'  value='reset'>";
    html += "</form>";
    html += "</body>";
    res.send(html);
});


app.post('/receiver', urlencodedParser, function (req, res){
    var reply='';
    reply += "Your name is" + req.body.name;
    reply += "Your E-mail id is" + req.body.email;
    reply += "Your address is" + req.body.address;
    reply += "Your mobile number is" + req.body.mobilno;
    res.send(reply);
});

let server = app.listen(8081, function () {
    let host = server.address().address;
    let port = server.address().port;

    console.log("In ascoloto su: "+port);
});

