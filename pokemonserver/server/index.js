// Charger les variables d'environnement
require('dotenv').config();
const swaggerUi = require('swagger-ui-express');
let express = require('express');
let db = require('./db');
let pokemonRouter = require('./router/pokemonRouter');
let trainerRouter = require('./router/trainerRouter');
let zoneRouter = require('./router/zoneRouter');
let userRouter = require('./router/userRouter');
let rateLimiter = require('./middleware/rateLimiter');
let log = require('./middleware/logger.js')

let app = express();

// Charger le fichier JavaScript swagger
const swaggerDocument = require('../../docs-api/swagger.js');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json());
app.use(log);

// Routes API avec middleware de rate limiting
app.use('/api/pokemon', rateLimiter,pokemonRouter);
app.use('/api/trainers', trainerRouter);
app.use('/api/zones', zoneRouter);
app.use('/api/users', userRouter);

var PORT = 3000;

app.listen(PORT, function () {
  console.log('Db connected http://localhost:' + PORT);
});
