const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
const port = 4000;

const db = require('../model/db.js'); // Importez le module db.js
const User = require('../model/schema/userSchema.js'); // Importez le schéma utilisateur
const Product = require('../model/schema/productSchema.js'); // Importez le schéma produit

app.use(express.json());
app.use(cors());

// Route pour afficher tous les utilisateurs
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs' });
  }
});

// Route pour afficher tous les produits
app.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.send(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de la récupération des produits' });
  }
});

// Route de connexion
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Vérifiez les informations d'identification de l'utilisateur dans la base de données
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      res.status(401).json({ error: 'Identifiants de connexion invalides' });
      return;
    }

    // Récupérez toutes les informations de l'utilisateur
    const { _id, admin } = user;

    // Connexion réussie, renvoyez les informations de l'utilisateur
    res.json({
      user: { _id,admin},
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de la connexion' });
  }
});


// Route pour obtenir les informations d'un utilisateur spécifique
app.get('/user/:id', async (req, res) => {
  const userId = req.params.id;

  try {
    // Recherchez l'utilisateur dans la base de données par son identifiant
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ error: 'Utilisateur non trouvé' });
      return;
    }
    // Renvoyer les informations de l'utilisateur
    res.json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de la récupération des informations de l\'utilisateur' });
  }
});

//Afficher un utilisateur par son id
app.get('/users/:email', async (req, res) => {
      try {
        const userID = req.params.id;
        const user = await User.findOne({ id: userID });
        if (!user) {
          return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        res.json(user);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Erreur du serveur');
      }
    });


//Afficher un produit par son id
app.get('/products/:id', async (req, res) => {
      try {
        const productID = req.params.id;
        const product = await Product.findOne( {id : productID});
        if (!product) {
          return res.status(404).json({ message: 'Produit non trouvé' });
        }
        res.json(product);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Erreur du serveur');
      }
    });

// Affichage de la page permettant de modifier un product
app.put('/products/:id', async (req, res) => {
      try {
        const productID = req.params.id;
        const updatedProduct = req.body;
    
        const product = await Product.findOne({ id: productID });
        if (!product) {
          return res.status(404).json({ message: 'Produit non trouvé' });
        }
    
        // Mettre à jour les propriétés du produit
        product.name = updatedProduct.name;
        product.quantity = updatedProduct.quantity;
        product.price = updatedProduct.price;
    
        // Enregistrer les modifications dans la base de données
        await product.save();
    
        res.json(product);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Erreur du serveur');
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
