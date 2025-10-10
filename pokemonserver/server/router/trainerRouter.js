const trainerRouter = require('express').Router();
const controller = require('../controller/trainerController.js');
const authenticateToken = require('../middleware/auth');

// Routes CRUD de base
trainerRouter.route('/')
  .get(controller.getTrainers)        // GET /trainers - Récupérer tous les trainers
  .post(authenticateToken, controller.createTrainer);    // POST /trainers - Créer un nouveau trainer

trainerRouter.route('/:id')
  .get(controller.getTrainerById)     // GET /trainers/:id - Récupérer un trainer par ID
  .put(controller.updateTrainer)      // PUT /trainers/:id - Mettre à jour un trainer
  .delete(controller.deleteTrainer);  // DELETE /trainers/:id - Supprimer un trainer

// Route pour assigner un pokémon à un trainer
trainerRouter.route('/:trainerId/assign-pokemon')
  .post(controller.assignPokemonToTrainer); // POST /trainers/:trainerId/assign-pokemon

module.exports = trainerRouter;