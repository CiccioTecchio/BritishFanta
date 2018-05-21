const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let roomSchema = new Schema({
    roomName: {
        type: String,
        unique: true
    },
    participants: [{nick:String}]
});

let room = mongoose.model('room', roomSchema);

module.exports = room;