const mongoose = require('mongoose');
let Schema = mongoose.Schema;

giornataSchema = new Schema({
    day: Number,
    player: String,
    team: String,
    roule: String,
    vote: Number,
    GF: Number,
    GS: Number
});

let giornata = mongoose.model('giornatas', giornataSchema);

module.exports = giornata;
