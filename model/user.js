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
        default: 1000
    }, // può essere 250, 500 o 1000
    points: {
        type: Number,
        default: 0,
    }
});

let user = mongoose.model('users', userSchema);

module.exports = user;