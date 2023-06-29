const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

const db = require('../model/db.js'); // Importez le module db.js

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String
}, { collection: 'users' });

const User = mongoose.model('User', userSchema, 'users');

app.use(express.json());
app.use(cors());

// Route pour afficher tous les utilisateurs
app.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs' });
  }
});

// Connexion à la base de données MongoDB
db.connect()
  .then(() => {
    // Démarrer le serveur après la connexion réussie
    app.listen(port, () => {
      console.log(`Le serveur est à l'écoute sur le port ${port}`);
    });
  })
  .catch((err) => {
    console.error('Erreur lors de la connexion à la base de données', err);
  });
