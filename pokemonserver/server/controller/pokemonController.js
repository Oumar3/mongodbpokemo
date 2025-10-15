const Pokemon = require('../model/Pokemon');
const mongoose = require('mongoose');
const trainer = require('../model/Trainer.js');

// TODO: Complete each of the following controller methods 
const controller = {
  createOne: function (req, res) {
    const { number, name, types, imageUrl, trainer, zones } = req.body;
    const newPokemon = new Pokemon({ number, name, types, imageUrl, trainer, zones });
    newPokemon.save()
      .then((pokemon) => res.status(201).json({
        success: true,
        data: pokemon
      }))
      .catch((error) => res.status(400).json({ success: false, error: error.message }));
  },

  retrieve: function (req, res) {
    Pokemon.find()
    .populate('trainer')
    .populate('zones')
      .then((pokemons) => res.status(200).json({
        success: true,
        count: pokemons.length,
        data: pokemons
      }))
      .catch((error) => res.status(400).json({ success: false, error: error.message }));
  },

  retrieveOne: function (req, res) {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, error: 'Invalid ID format' });
    }
    Pokemon.findById(id)
    .populate('trainer')
    .populate('zones')
      .then((pokemon) => {
        if (!pokemon) {
          return res.status(404).json({ success: false, message: 'Pokemon non trouvé' });
        }
        res.status(200).json({
          success: true,
          data: pokemon
        });
      })
      .catch((error) => res.status(400).json({ success: false, error: error.message }));
  },

  updateOne: function (req, res) {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, error: 'Invalid ID format' });
    }
    const { number, name, types, imageUrl } = req.body;

    Pokemon.findByIdAndUpdate(id, { number, name, types, imageUrl }, { new: true })
    .populate('trainer')
    .populate('zones')
      .then((pokemon) => {
        if (!pokemon) {
          return res.status(404).json({ success: false, message: 'Pokemon non trouvé' });
        }
        res.status(200).json({
          success: true,
          data: pokemon
        });
      })
      .catch((error) => res.status(400).json({ success: false, error: error.message }));
  },

  deleteOne: function (req, res) {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, error: 'Invalid ID format' });
    }
    Pokemon.findByIdAndDelete(id)
      .then((pokemon) => {
        if (!pokemon) {
          return res.status(404).json({ success: false, message: 'Pokemon non trouvé' });
        }
        res.status(200).json({ 
          success: true,
          message: 'Pokemon supprimé avec succès' 
        });
      })
      .catch((error) => res.status(400).json({ success: false, error: error.message }));
  }
};

module.exports = controller;
