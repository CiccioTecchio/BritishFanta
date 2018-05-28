const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let rosaSchema = new Schema({
    name: {type: String, unique: true},
    team: [{player: String, PLteam:String,roule:String,titolare:{type:String, default: 0}}],
    points: {
      type: Number,
      default: 0,
  },
    positions: {type: Number,
                default:0}
});

let rosa = mongoose.model('rosa', rosaSchema);

module.exports = rosa;