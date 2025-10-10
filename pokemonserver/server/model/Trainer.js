const mongoose = require('mongoose');

const TrainerShema = new mongoose.Schema({
  name: { type: String, required: true },
  age:{type:Number, require:true},
  pokemons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pokemon' }]
});

const Trainer = mongoose.model("Trainer", TrainerShema)

module.exports = Trainer;
