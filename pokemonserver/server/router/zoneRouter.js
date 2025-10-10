const zoneRouter = require('express').Router();
const controller = require('../controller/zoneController.js');
const authenticateToken = require('../middleware/auth');

// Routes CRUD de base
zoneRouter.route('/')
  .get(controller.getZones)        // GET /zones - Récupérer toutes les zones
  .post(authenticateToken, controller.createZone);    // POST /zones - Créer une nouvelle zone

zoneRouter.route('/:id')
  .get(controller.getZoneById)     // GET /zones/:id - Récupérer une zone par ID
  .put(controller.updateZone)      // PUT /zones/:id - Mettre à jour une zone
  .delete(controller.deleteZone);  // DELETE /zones/:id - Supprimer une zone

module.exports = zoneRouter;