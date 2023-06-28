const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb+srv://admin:admin@cluster-ligue-sport.eujmpwy.mongodb.net/?retryWrites=true&w=majority';

let db = null;

function connect(callback) {
  MongoClient.connect(url, function(err, client) {
    if (err) {
      console.error('Erreur de connexion à MongoDB :', err);
      return;
    }
    console.log('Connecté à la base de données MongoDB');
    db = client.db(); // Référence à la base de données

    if (callback) {
      callback();
    }
  });
}

function getDB() {
  return db;
}

module.exports = { connect, getDB };