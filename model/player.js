const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let playerSchema = new Schema({
    player: String,
    team: String,
    points: Number,
    cost: Number,
    roule: String
});

let player = mongoose.model('player', playerSchema);

module.exports = player;