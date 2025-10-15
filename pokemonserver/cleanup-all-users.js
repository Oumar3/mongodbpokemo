const mongoose = require('mongoose');
const User = require('./server/model/User');

// Connexion à la base de données
mongoose.connect('mongodb://localhost:27018/pokemon')
  .then(() => {
    console.log('Connexion à la base de données réussie');
    return cleanupSpecificUser();
  })
  .then(() => {
    console.log('Nettoyage terminé');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Erreur:', error);
    process.exit(1);
  });

async function cleanupSpecificUser() {
  try {
    // Supprimer TOUS les utilisateurs pour avoir une base propre
    const result = await User.deleteMany({});
    console.log(`${result.deletedCount} utilisateur(s) supprimé(s) de la base de données`);
  } catch (error) {
    console.error('Erreur lors du nettoyage:', error);
    throw error;
  }
}