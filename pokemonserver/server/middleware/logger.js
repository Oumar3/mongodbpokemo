// Logger simple pour voir les requêtes et erreurs
const logger = (req, res, next) => {
    const now = new Date().toLocaleString();
    const method = req.method;
    const url = req.url;
    // Log de la requête
    console.log(`[${now}] ${method} ${url}`);
    next();
};


module.exports = logger