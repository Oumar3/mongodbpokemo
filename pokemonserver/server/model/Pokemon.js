// This is the model
const mongoose = require('mongoose');
const Trainer= require('./Trainer.js');

// TODO: Complete the pokemonSchema below.
const pokemonSchema = new mongoose.Schema({
  number: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  types: [{ type: String, required: true }],
  imageUrl: [{ type: String }],
  trainer: { type: mongoose.Schema.Types.ObjectId, ref: 'Trainer' }
});


// TODO: Register the pokemonSchema with Mongoose as the 'Pokemon' collection.
const Pokemon = mongoose.model('Pokemon', pokemonSchema);

module.exports = Pokemon;
