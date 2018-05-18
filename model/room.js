const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let roomSchema = new Schema({
    roomName: {
        type: String,
        unique: true
    },
    /* participants: [{
         nick: {
             type: String,
             unique: true
         },
         teamName: String,
         points: Number,
         ft_team: [{
             player: {type: String, unique: true},
             pl_team: String
         }]
     }]*/
    participants: [{nick:String}]
});

let room = mongoose.model('room', roomSchema);

module.exports = room;