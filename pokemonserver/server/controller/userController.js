const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// CRUD de base pour les utilisateurs
const userController = {
    // Créer un nouvel utilisateur
    RegisterUser: async (req, res) => {
        try {
            const { username, password, email } = req.body;
            if (!username || !password || !email) {
                return res.status(400).json({ error: 'Tous les champs sont requis' });
            }
            // Vérifier si l'utilisateur existe déjà
            const existingUser = await User.findOne({ $or: [{ username }, { email }] });
            if (existingUser) {
                return res.status(400).json({ error: 'Nom d\'utilisateur ou email déjà pris' });
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({ username, password: hashedPassword, email });
            newUser.save()
            .then((savedUser) => {
                // Réponse conforme au schéma Swagger
                const userResponse = {
                    username: savedUser.username,
                    email: savedUser.email,
                    password: "" // Mot de passe vide pour respecter le schéma Swagger
                };
                res.status(201).json(userResponse);
            })
            .catch((error) => {
                res.status(400).json({ error: error.message });
            });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    
   loginUser: async (req, res) => {
        try {
            const { username, password } = req.body;
            const user = await User.findOne({ username });
            if (!user) {
                return res.status(404).json({ error: 'Utilisateur non trouvé' });
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ error: 'Mot de passe incorrect' });
            }

            // Génération du token JWT
            const token = jwt.sign(
                { 
                    userId: user._id, 
                    username: user.username,
                    email: user.email 
                },
                process.env.JWT_SECRET,
                { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
            );

            res.status(200).json({ 
                message: 'Connexion réussie',
                token: token,
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email
                }
            });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
};

module.exports = userController;
   
