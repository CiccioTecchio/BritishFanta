const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let rosaSchema = new Schema({
    nick: {type: Schema.Types.ObjectId, ref: "users"},
    team: [{player: {type: Schema.Types.ObjectId, ref: "player"}}],
    points: {
      type: Number,
      default: 0,
  }
});

let rosa = mongoose.model('rosa', rosaSchema);

module.exports = rosa;