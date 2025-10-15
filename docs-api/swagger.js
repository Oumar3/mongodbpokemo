// Importation des modules Swagger
const { baseConfig, securitySchemes, tags } = require('./modules_swager/baseConfig');
const { userPaths, userSchemas } = require('./modules_swager/users');
const { pokemonPaths, pokemonSchemas } = require('./modules_swager/pokemon');
const { trainerPaths, trainerSchemas } = require('./modules_swager/trainers');
const { zonePaths, zoneSchemas } = require('./modules_swager/zones');

// Construction de la définition Swagger complète
const swaggerDefinition = {
  ...baseConfig,
  paths: {
    ...userPaths,
    // ...pokemonPaths,
    // ...trainerPaths,
    // ...zonePaths
  },
  components: {
    schemas: {
      ...userSchemas,
      // ...pokemonSchemas,
      // ...trainerSchemas,
      // ...zoneSchemas
    }
  },
};

module.exports = swaggerDefinition;
