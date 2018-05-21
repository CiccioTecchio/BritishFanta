const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    surname: {
        type: String,
        required: true
    },

    nick: {
        type: String,
        unique: true
    },

    pswd: {
        type: String,
        required: true
    },
    budget: {
        type: Number,
        default: 250
    }, // può essere 250, 500 o 1000
    rooms: {
        type: String,
        default: null
    },
    team: {
        type: String,
        unique:true
    }
});

let user = mongoose.model('users', userSchema);

module.exports = user;