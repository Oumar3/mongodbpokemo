const mongoose = require('mongoose');

const ZoneSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  region: { type: String, required: true },
  // Relation many-to-many avec Pokemon
  pokemons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pokemon' }]
}, {
  timestamps: true
});

const Zone = mongoose.model("Zone", ZoneSchema);

module.exports = Zone

