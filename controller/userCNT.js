const schemas = require('../model/schema.js');
let d = new Date();

function insertOne(res, obj) {
    schemas.user.create(obj).then(() => {
        console.log(d.toLocaleString() + "\tinsertOne()");
        res.status(200).end();
    })
        .catch(() => {
            console.log(d.toLocaleString() + "\tERROR insertOne()\n");
            res.status(500).end();
        });

}

function userList(res) {
    schemas.user.find({}, {name: 1, surname: 1, nick: 1, budget: 1, points: 1, _id: 0}, function (err, doc) {
        if (err) throw err;
        res.json(doc);
        console.log(d.toLocaleString() + '\tuserList()');
    });
}

function findByNick(res, nick) {
    schemas.user.find({name: nick}, {name: 1, surname: 1, nick: 1, budget: 1, points: 1, _id: 0}, function (err, doc) {
        if (err) throw err;
        res.json(doc);
        console.log(d.toLocaleString() + '\tfindByNick()');
    });
}


function signIn(req, res, nick, pswd) {

    schemas.user.findOne({nick: nick, pswd: pswd}, function (err, doc) {
        if (err) {
            throw err;
            console.log(d.toLocaleString() + '\tsignIn() FAILURE');
            res.status(500).end();
        }
        else {
            console.log(d.toLocaleString() + '\tsignIn()');

            if (!doc) {
                console.log(d.toLocaleString() + '\tsignIn() NO ELEMENT');
                res.json({message:"NOT FOUND"}).status(404).end();
            } else {

                console.log(d.toLocaleString() + '\tsignIn() FOUND');
                res.json(doc);
                res.status(200).end();
            }
        }


    })
}


module.exports = {
    insertOne: insertOne,
    userList: userList,
    signIn: signIn
};