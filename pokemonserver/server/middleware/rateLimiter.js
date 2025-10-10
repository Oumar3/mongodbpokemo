const rateLimit = require('express-rate-limit');

// Si l'utilisateur existe, appliquer le rate limiting
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // minutes * secondes * millisecondes
  max: 100, // 100 requêtes par IP
  legacyHeaders: false, // Désactiver les en-têtes `X-RateLimit-*`
  standardHeaders: true, // Activer les en-têtes `RateLimit-*`
  message: { error: "Trop de requêtes, veuillez réessayer plus tard." },
  // Utiliser l'ID utilisateur comme clé pour le rate limiting au lieu de l'IP
  keyGenerator: (req, res) => {
    const userId = req.headers['user-id'] || req.headers['x-user-id'];
    if (userId) {
      return userId;
    }
    // Utiliser le générateur par défaut pour l'IP (qui gère IPv6 correctement)
    return undefined; // Laisser express-rate-limit utiliser son keyGenerator par défaut
  }
});

const rateLimiter = (req, res, next) => {
  const userId = req.headers['user-id'] || req.headers['x-user-id'] || req.headers['authorization'];
  
  if (!userId) {
    return res.status(401).json({ 
      error: "Utilisateur non authentifié. Veuillez fournir un identifiant utilisateur dans le header." 
    });
  }
  return limiter(req, res, next);
};


module.exports = rateLimiter;
