# Documentation Swagger Modulaire

## Structure des modules

La documentation Swagger a été organisée en modules séparés pour une meilleure maintenabilité :

```
docs-api/
├── swagger.js              # Point d'entrée principal
├── modules_swager/         # Modules Swagger
│   ├── baseConfig.js       # Configuration de base
│   ├── users.js           # Routes et schémas utilisateurs
│   ├── pokemon.js         # Routes et schémas Pokémon
│   ├── trainers.js        # Routes et schémas dresseurs
│   └── zones.js           # Routes et schémas zones
└── test-swagger.js        # Script de test
```

## Utilisation

### Import principal
```javascript
const swaggerDefinition = require('./swagger.js');
```

### Import d'un module spécifique
```javascript
const { userPaths, userSchemas } = require('./modules_swager/users');
const { pokemonPaths, pokemonSchemas } = require('./modules_swager/pokemon');
```

## Structure d'un module

Chaque module exporte :
- `*Paths` : Définitions des routes
- `*Schemas` : Schémas de données

Exemple (users.js) :
```javascript
const userPaths = {
  '/api/users/register': { /* définition route */ },
  '/api/users/login': { /* définition route */ }
};

const userSchemas = {
  User: { /* schéma utilisateur */ },
  UserRegistration: { /* schéma inscription */ }
};

module.exports = {
  userPaths,
  userSchemas
};
```

## Configuration de base (baseConfig.js)

Contient :
- Informations générales de l'API
- Configuration des serveurs
- Schémas de sécurité
- Définition des tags

## Test

Exécuter le script de test :
```bash
node test-swagger.js
```

## Avantages de cette structure

1. **Modularité** : Chaque entité a son propre module
2. **Maintenabilité** : Modifications isolées par module  
3. **Réutilisabilité** : Import sélectif des modules
4. **Lisibilité** : Structure claire et organisée
5. **Collaboration** : Travail en parallèle sur différents modules