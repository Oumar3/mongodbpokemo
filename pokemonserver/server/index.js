// Charger les variables d'environnement
require('dotenv').config();
const swaggerUi = require('swagger-ui-express');
let express = require('express');
let db = require('./db');
const fs = require('fs');
let pokemonRouter = require('./router/pokemonRouter');
let trainerRouter = require('./router/trainerRouter');
let zoneRouter = require('./router/zoneRouter');
let userRouter = require('./router/userRouter');
let rateLimiter = require('./middleware/rateLimiter');
let log = require('./middleware/logger.js')

let app = express();

// Charger le fichier JavaScript swagger modulaire
const swaggerDocument = require('../../docs-api/swagger.js');
//dredd --config dredd.yml

//fs.writeFileSync('./swagger.json', JSON.stringify(swaggerDocument, null, 2));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json());
app.use(log);

// Middleware pour corriger le Content-Type pour Dredd
app.use((req, res, next) => {
    const originalJson = res.json;
    
    res.json = function(obj) {
        // Forcer exactement 'application/json' sans charset pour Dredd
        this.set('Content-Type', 'application/json');
        return originalJson.call(this, obj);
    };
    
    next();
});

// Routes API avec middleware de rate limiting
app.use('/api/pokemon', rateLimiter,pokemonRouter);
app.use('/api/trainers', trainerRouter);
app.use('/api/zones', zoneRouter);
app.use('/api/users', userRouter);

var PORT = 3000;

app.listen(PORT, function () {
  console.log('Db connected http://localhost:' + PORT);
});
