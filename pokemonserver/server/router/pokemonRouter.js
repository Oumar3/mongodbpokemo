var pokemonRouter = require('express').Router();
const controller = require('../controller/pokemonController.js');
const authenticateToken = require('../middleware/auth');

// TODO: Create route handlers for each of the six methods in pokemonController
pokemonRouter.route('/')
  .get(controller.retrieve)
  .post(controller.createOne);

pokemonRouter.route('/:id')
  .get(controller.retrieveOne)
  .put(controller.updateOne)
  .delete(controller.deleteOne);

module.exports = pokemonRouter;
