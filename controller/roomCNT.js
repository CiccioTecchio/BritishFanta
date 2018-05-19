const room = require('../model/room.js');
const user = require('../model/user.js');
let d = new Date();

function createRoom(res, obj) {
    let roomO = new room(obj);
    let lenf = obj.participants.length;
    for (let i = 0; i < lenf; i++) {
        user.findOne({nick: obj.participants[i].nick}, function (err, doc) {
            if (err) {
                console.log(d.toLocaleString() + '\tuserList() FAILURE');
                res.status(500).send('500').end();
            } else {
                doc.rooms = obj.roomName;
                let userO = new user(doc);
                userO.save(doc);
            }

        });
    }
    roomO.save(err => {
        if (err) {
            console.log(d.toLocaleString() + '\tcreateRoom() room already exists');
            res.status(409).send('409').end();
        } else {
            console.log(d.toLocaleString() + '\tcreateRoom()');
            res.status(200).json({message: '200 OK'}).end();
        }
    });
}

module.exports = {
    createRoom: createRoom
};