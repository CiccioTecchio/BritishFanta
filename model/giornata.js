const mongoose = require('mongoose');
let Schema = mongoose.Schema;

giornataSchema = new Schema({
    num: {
        type: Number,
    },
    titolari: {
        player: {type: String},
        team: {type: String},
        voto: {type: Number},
        GF: {type: Number},
        GS: {type: Number},
    }
});

let giornata = mongoose.model('giornata', giornataSchema);

module.exports = giornata;
