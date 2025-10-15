// Configuration de base de l'API Swagger
const baseConfig = {
  openapi: '3.0.3',
  info: {
    title: 'Pokémon API',
    description: 'API REST pour gérer les Pokémon, Trainers, Zones et Utilisateurs avec authentification JWT',
    version: '1.0.0',
    contact: {
      name: 'Oumar Ali Tori',
      email: 'oumar.ali@gmail.com'
    }
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Serveur de développement local'
    }
  ]
};

// Schémas de sécurité supprimés pour les tests
const securitySchemes = {};

// Tags pour organiser l'API
const tags = [
  {
    name: 'Users',
    description: 'Gestion des utilisateurs et authentification JWT'
  },
  // {
  //   name: 'Pokemon',
  //   description: 'Opérations CRUD sur les Pokémon avec relations'
  // },
  // {
  //   name: 'Trainers',
  //   description: 'Gestion des dresseurs Pokémon'
  // },
  // {
  //   name: 'Zones',
  //   description: 'Gestion des zones géographiques où vivent les Pokémon'
  // }
];

module.exports = {
  baseConfig,
  securitySchemes,
  tags
};