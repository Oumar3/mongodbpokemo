const mongoose = require('mongoose');

const TrainerShema = new mongoose.Schema({
  name: { type: String, required: true },
  age:{type:Number, require:true},
});

const Trainer = mongoose.model("Trainer", TrainerShema)

module.exports = Trainer;
