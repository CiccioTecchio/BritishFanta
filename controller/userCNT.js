const user = require('../model/user.js');
let d = new Date();

function insertOne(res, obj) {
    user.create(obj).then(() => {
        console.log(d.toLocaleString() + "\tinsertOne()");
        res.status(200).end();
    })
        .catch(() => {
            console.log(d.toLocaleString() + "\tERROR insertOne()\n");
            res.status(500).end();
        });
}

function userList(res) {
    user.find({}, {name: 1, surname: 1, nick: 1, budget: 1, points: 1, _id: 0}, function (err, doc) {
        if (err) throw err;
        res.json(doc);
        console.log(d.toLocaleString() + '\tuserList()');
    });
}

function signIn(req, res, nick, pswd) {

    user.findOne({nick: nick, pswd: pswd}, {budget: 1, points: 1, name: 1, surname: 1, nick: 1}, function (err, doc) {
        if (err) {
            throw err;
            console.log(d.toLocaleString() + '\tsignIn() FAILURE');
            res.status(500).end();
        }
        else {
            if (!doc) {
                console.log(d.toLocaleString() + '\tsignIn() NO ELEMENT');
                res.json({message: "NOT FOUND"}).status(404).end();
            } else {

                console.log(d.toLocaleString() + '\tsignIn() FOUND');
                res.json(doc);
                res.status(200).end();
            }
        }
    });
}


module.exports = {
    insertOne: insertOne,
    userList: userList,
    signIn: signIn
};