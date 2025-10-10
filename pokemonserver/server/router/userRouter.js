const express = require('express');
const userRouter = express.Router();
const userController = require('../controller/userController');
const { authenticateToken } = require('../middleware/auth');

// Routes d'authentification (publiques)
userRouter.post('/register', userController.RegisterUser);
userRouter.post('/login', userController.loginUser);

module.exports = userRouter;