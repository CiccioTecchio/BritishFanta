const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let playerSchema= new Schema({
    player: String,
    team: String,
    points: Number,
    cost: Number,
    roule: String
});

let userSchema= new Schema({
    name: {type: String,
            required: true},

    surname: {type: String,
            required: true},

    nick: { type: String,
            unique: true},

    pswd: {type: String,
            required: true},
    budget: {type: Number,
             default:1000}, // può essere 250, 500 o 1000
    points: {type:Number,
             default: 0,}
});

/* TODO formazioneSchema
la formazione comprende 25 giocatori:
3 portieri,
8 difensori,
8 centrocampisti,
6 attaccanti
 */

let rosaSchema = new Schema({
    nick: {type: Schema.Types.ObjectId, ref: "users"},
    team: [{player:{type: Schema.Types.ObjectId, ref: "player"}}]
});



let player=mongoose.model('player',playerSchema);
let user=mongoose.model('users',userSchema);
let rosa=mongoose.model('rosa',rosaSchema);

module.exports = {
    player,
    user,
    rosa
}

/*module.exports = {
    user
};

module.exports = {
    rosa
};*/