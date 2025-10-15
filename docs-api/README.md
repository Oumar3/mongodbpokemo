# Documentation Swagger Modulaire

## Structure

Cette documentation Swagger est maintenant organisée en modules pour une meilleure maintenabilité :

```
docs-api/
├── modules/
│   ├── baseConfig.js    # Configuration de base (info, servers, security, tags)
│   ├── users.js         # Routes et schémas pour l'authentification
│   ├── pokemon.js       # Routes et schémas pour les Pokémon
│   ├── trainers.js      # Routes et schémas pour les Trainers
│   └── zones.js         # Routes et schémas pour les Zones
├── swaggerModular.js    # Fichier principal qui assemble tous les modules
├── swagger.js          # Ancien fichier monolithique (conservé pour référence)
└── README.md           # Ce fichier
```

## Avantages de cette structure

### 1. **Séparation des responsabilités**
- Chaque module gère une entité spécifique
- Plus facile à comprendre et maintenir
- Évite les conflits lors du travail en équipe

### 2. **Facilité de maintenance**
- Modifications isolées par module
- Recherche et débogage simplifiés
- Ajout de nouvelles entités plus simple

### 3. **Réutilisabilité**
- Modules peuvent être réutilisés dans d'autres projets
- Import sélectif possible
- Tests unitaires par module

## Comment ajouter une nouvelle entité

1. **Créer un nouveau module** dans `modules/` :
```javascript
// modules/nouvelleEntite.js
const nouvelleEntitePaths = {
  '/api/nouvelle-entite': {
    // définir les routes
  }
};

const nouvelleEntiteSchemas = {
  NouvelleEntite: {
    // définir les schémas
  }
};

module.exports = {
  nouvelleEntitePaths,
  nouvelleEntiteSchemas
};
```

2. **Importer dans swaggerModular.js** :
```javascript
const { nouvelleEntitePaths, nouvelleEntiteSchemas } = require('./modules/nouvelleEntite');

// Ajouter aux paths et schemas
paths: mergeObjects(
  // ... autres paths
  nouvelleEntitePaths
),
schemas: mergeObjects(
  // ... autres schemas
  nouvelleEntiteSchemas
)
```

3. **Ajouter le tag** dans `baseConfig.js` :
```javascript
{
  name: 'NouvelleEntite',
  description: 'Description de la nouvelle entité'
}
```

## Modification d'un module existant

Pour modifier les routes ou schémas d'une entité, éditez simplement le module correspondant :

- **Users** (authentification) → `modules/users.js`
- **Pokemon** → `modules/pokemon.js`
- **Trainers** → `modules/trainers.js`
- **Zones** → `modules/zones.js`

## Configuration globale

Modifiez `modules/baseConfig.js` pour :
- Informations générales de l'API
- Configuration des serveurs
- Schémas de sécurité
- Tags globaux

## Tests

Vous pouvez tester chaque module indépendamment :

```javascript
// Test d'un module
const { userPaths, userSchemas } = require('./modules/users');
console.log('Routes users:', Object.keys(userPaths));
console.log('Schémas users:', Object.keys(userSchemas));
```

## Migration depuis l'ancien format

L'ancien fichier `swagger.js` monolithique est conservé pour référence. La nouvelle structure modulaire (`swaggerModular.js`) est maintenant utilisée par défaut dans le serveur.