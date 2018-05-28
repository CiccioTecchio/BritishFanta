const user = require('../model/user.js');

let d = new Date();

function insertOne(res, obj) {
    let userO = new user(obj);
    userO.save(err => {
        if (err) {
            console.log(d.toLocaleString() + '\tinsertOne() User already exists');
            res.status(409).send('409').end();
        } else {
            console.log(d.toLocaleString() + '\tinsertOne()');
            res.status(200).send('200').end();
        }
    });
}



function userList(res, nick) {
    user.find({rooms: null, nick: {$ne: nick}}, {name: 1, surname: 1, nick: 1, budget: 1, points: 1, _id: 0}, function (err, doc) {

        if (err) {

            console.log(d.toLocaleString() + '\tuserListPost() FAILURE');
            res.status(500).send('500').end();
        } else {
            console.log(d.toLocaleString() + '\tuserListPost()');

            res.status(200).json(doc).end();
        }
    });
}

function signIn(req, res, nick, pswd) {

    user.findOne({nick: nick, pswd: pswd}, {budget: 1, points: 1, name: 1, surname: 1, nick: 1, rooms:1, team:1}, function (err, doc) {
        if (err) {
            console.log(d.toLocaleString() + '\tsignIn() FAILURE');
            res.status(500).end();
        }
        else {
            if (!doc) {
                console.log(d.toLocaleString() + '\tsignIn() NO ELEMENT');
                res.status(404).end();
            } else {
                /*room.findOne({roomName: doc.rooms}, function (err, data) {
                    console.log(data);
                });*/
                console.log(d.toLocaleString() + '\tsignIn()');
                res.status(200).json(doc).end();
            }
        }
    });
}

function getBudgetByNick(res,obj){
    user.findOne({nick: obj.nick},{budget:1, _id:0},function (err,doc) {
        if(err){
            console.log(d.toLocaleString()+"\tgetBudgetByNick() ERROR");
            res.status(500).json({message:"500 - internal server"});
        }else{
            console.log(d.toLocaleString()+"\tgetBudgetByNick()");
            res.json(doc);
        }
    })
}

function createRoom(res,obj){



user.find({rooms:obj.roomName}, function (err,doc) {
    if(doc.length===0){
        let partecipants= obj.participants;
        let len= partecipants.length;
        for(let i=0;i<len;i++){
            user.findOneAndUpdate({nick: partecipants[i].nick},{rooms:obj.roomName}, function (err,doc) {
            });
        }
        console.log(d.toLocaleString()+" createRoom()");
res.status(200);
    }else{
        console.log(d.toLocaleString()+" createRoom() ROOM ALREDY EXSIST");
        res.json({roomName:obj.roomName}).status(409);
    }
});

/*for(let i=0;i<len;i++){
    user.findOneAndUpdate({nick: partecipants[i].nick},{rooms:obj.roomName}, function (err,doc) {

    });
}*/
}


module.exports = {
    insertOne: insertOne,
    userList: userList,
    signIn: signIn,
    getBudgetByNick: getBudgetByNick,
    createRoom: createRoom
};