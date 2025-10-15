const Pokemon = require('../model/Pokemon');
const mongoose = require('mongoose');
const trainer = require('../model/Trainer.js');

// TODO: Complete each of the following controller methods 
const controller = {
  createOne: function (req, res) {
    const { number, name, types, imageUrl, trainer, zones } = req.body;
    const newPokemon = new Pokemon({ number, name, types, imageUrl, trainer, zones });
    newPokemon.save()
      .then((pokemon) => res.status(201).json(pokemon))
      .catch((error) => res.status(400).json({ error: error.message }));
  },

  retrieve: function (req, res) {
    Pokemon.find()
    .populate('trainer')
    .populate('zones')
      .then((pokemons) => res.status(200).json(pokemons))
      .catch((error) => res.status(400).json({ error: error.message }));
  },

  retrieveOne: function (req, res) {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }
    Pokemon.findById(id)
    .populate('trainer')
    .populate('zones')
      .then((pokemon) => {
        if (!pokemon) {
          return res.status(404).json({ error: 'Pokemon not found' });
        }
        res.status(200).json(pokemon);
      })
      .catch((error) => res.status(400).json({ error: error.message }));
  },

  updateOne: function (req, res) {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }
    const { number, name, types, imageUrl } = req.body;

    Pokemon.findByIdAndUpdate(id, { number, name, types, imageUrl }, { new: true })
      .then((pokemon) => {
        if (!pokemon) {
          return res.status(404).json({ error: 'Pokemon not found' });
        }
        res.status(200).json(pokemon);
      })
      .catch((error) => res.status(400).json({ error: error.message }));
  },

  deleteOne: function (req, res) {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }
    Pokemon.findByIdAndDelete(id)
      .then((pokemon) => {
        res.status(200).json({ message: 'Pokemon deleted successfully' });
      })
      .catch((error) => res.status(400).json({ error: error.message }));
  }
};

module.exports = controller;
