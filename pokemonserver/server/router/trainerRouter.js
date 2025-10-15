const trainerRouter = require('express').Router();
const controller = require('../controller/trainerController.js');

// Routes CRUD de base
trainerRouter.route('/')
  .get(controller.getTrainers)        // GET /trainers - Récupérer tous les trainers
  .post(controller.createTrainer);    // POST /trainers - Créer un nouveau trainer

trainerRouter.route('/:id')
  .get(controller.getTrainerById)     // GET /trainers/:id - Récupérer un trainer par ID
  .put(controller.updateTrainer)      // PUT /trainers/:id - Mettre à jour un trainer
  .delete(controller.deleteTrainer);  // DELETE /trainers/:id - Supprimer un trainer


module.exports = trainerRouter;