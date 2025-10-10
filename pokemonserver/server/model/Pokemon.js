// This is the model
const mongoose = require('mongoose');
const Trainer = require('./Trainer.js');
const Zone = require('./Zones.js');

// TODO: Complete the pokemonSchema below.
const pokemonSchema = new mongoose.Schema({
  number: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  types: [{ type: String, required: true }],
  imageUrl: [{ type: String }],
  trainer: { type: mongoose.Schema.Types.ObjectId, ref: 'Trainer' },
  Zones: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Zone' }]
});


// TODO: Register the pokemonSchema with Mongoose as the 'Pokemon' collection.
const Pokemon = mongoose.model('Pokemon', pokemonSchema);

module.exports = Pokemon;
