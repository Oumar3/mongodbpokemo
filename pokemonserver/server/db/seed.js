const mongoose  = require('mongoose');
const Pokemon = require('../model/Pokemon.js');

const allPokemons = require('../../data/pokemon.json')

const insertAllPokemons = function() {
  Pokemon.create(allPokemons)
    .then(() => {
      console.log('Pokemon data seeded successfully!');
      mongoose.disconnect();
    })
    .catch(err => {
      console.error('Error seeding data:', err);
      mongoose.disconnect();
    });
};

insertAllPokemons();
