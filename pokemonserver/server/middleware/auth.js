const jwt = require('jsonwebtoken');
const User = require('../model/User');

// Middleware pour vérifier le token JWT
const authenticateToken = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1]; // Format: "Bearer TOKEN

        if (!token) {
            return res.status(401).json({ 
                success: false, 
                message: 'Token d\'accès requis' 
            });
        }

        // Vérifier et décoder le token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Ajouter les informations utilisateur à la requête
        req.user = {
            userId: decoded.userId,
            username: decoded.username,
            email: decoded.email
        };

        next();
    } catch (error) {
        return res.status(403).json({ 
            success: false, 
            message: 'Token invalide ou expiré', 
            error: error.message 
        });
    }
};

module.exports = authenticateToken;