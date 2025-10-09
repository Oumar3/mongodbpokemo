let express = require('express');
let db = require('./db');
let pokemonRouter = require('./router/pokemonRouter');
let rateLimiter = require('./middleware/rateLimiter');

let app = express();

app.use(express.json());
app.use(rateLimiter);



// TODO: Import the pokemonRouter and assign it to the correct route:
app.use('/api/pokemon', pokemonRouter);

var PORT = 3000;

app.listen(PORT, function () {
  console.log('Poke-MongoDB RESTful API listening on http://localhost:' + PORT);
});
