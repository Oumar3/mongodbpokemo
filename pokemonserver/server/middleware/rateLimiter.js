const rateLimit = require('express-rate-limit');

const rateLimiter = (req,res,next) => {
  const limiter = rateLimit({
    windowMs: 60 * 60 * 1000, // minutes * secondes * millisecondes
    max: 100, // 100 requêtes par IP
    legacyHeaders: false, // Désactiver les en-têtes `X-RateLimit-*`
    standardHeaders: true, // Activer les en-têtes `RateLimit-*`
    message: { error: "Trop de requêtes, veuillez réessayer plus tard." },
  });
  limiter(req, res, next);
};

module.exports = rateLimiter;
