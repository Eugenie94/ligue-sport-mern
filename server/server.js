const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
const port = 4000;

const db = require('../model/db.js');
const User = require('../model/schema/userSchema.js');
const Product = require('../model/schema/productSchema.js');

app.use(express.json());
app.use(cors());

// Connexion à la base de données MongoDB
db.connect()
  .then(() => {
    app.listen(port, () => {
      console.log(`Le serveur est à l'écoute sur le port ${port}`);
    });
  })
  .catch((err) => {
    console.error('Erreur lors de la connexion à la base de données', err);
  });

// Route de connexion
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({ error: 'Identifiants de connexion invalides' });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ error: 'Identifiants de connexion invalides' });
      return;
    }

    const { _id, admin } = user;

    res.json({
      user: { _id, admin },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de la connexion' });
  }
});

// Route d'inscription
app.post('/register', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ error: 'Cet email est déjà utilisé' });
      return;
    }

    const newUser = new User({
      firstName,
      lastName,
      email,
      password,
      admin: false
    });

    const hashedPassword = await bcrypt.hash(password, 10);
    newUser.password = hashedPassword;

    const savedUser = await newUser.save();

    res.json(savedUser);
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de l\'inscription' });
  }
});

// Afficher tous les utilisateurs
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs' });
  }
});

// User par id
app.get('/user/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ error: 'Utilisateur non trouvé' });
      return;
    }
    res.json({ user });
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la récupération des informations de l\'utilisateur' });
  }
});

// Modifier un utilisateur
app.put('/user/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const { firstName, lastName, email, password } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { firstName, lastName, email, password },
      { new: true }
    );
    if (updatedUser) {
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
    res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'utilisateur' });
  }
});

// Supprimer un utilisateur
app.delete("/user/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findByIdAndDelete(id);
    if (user) {
      const users = await User.find();
      res.status(200).json(users);
    } else {
      res.status(404).json({ message: "Aucun utilisateur trouvé" });
    }
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'utilisateur:', error);
    res.status(500).json({ message: "Erreur lors de la suppression de l'utilisateur" });
  }
});

// Afficher tous les produits
app.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.send(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de la récupération des produits' });
  }
});

// Afficher un produit par son id
app.get('/product/:id', async (req, res) => {
  try {
    const productID = req.params.id;
    const product = await Product.findOne({ id: productID });
    if (!product) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).send('Erreur du serveur');
  }
});

// Modifier un produit
app.put('/product/:id', async (req, res) => {
  try {
    const productID = req.params.id;
    const updatedProduct = req.body;
    const product = await Product.findOne({ id: productID });
    if (!product) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }

    product.name = updatedProduct.name;
    product.quantity = updatedProduct.quantity;
    product.price = updatedProduct.price;

    await product.save();
    res.json(product);
  } catch (err) {
    res.status(500).send('Erreur du serveur');
  }
});

// Ajouter un product
app.post('/product', async (req, res) => {
  try {
    const { name, quantity, price, image } = req.body;
    const newProduct = new Product({ name, quantity, price,  image });
    await newProduct.save();
    res.status(200).json(newProduct);
  } catch (error) {
    console.error('Erreur lors de l\'ajout du produit', error);
    res.status(500).json({ error: 'Erreur lors de l\'ajout du produit' });
  }
});

// Supprimer un produit : fait 
app.delete("/product/:id", async (req, res) => {
  const id = req.params.id;
  try {
        const product = await Product.findByIdAndDelete(id);
        if (product) {
              const products = await Product.find();
              res.status(200).json(products);
        } else {
              res.status(404).json({ message: "Aucun produit trouvé" });
        }
  } catch (error) {
        console.error('Erreur lors de la suppression du produit :', error);
        res.status(500).json({ message: "Erreur lors de la suppression du produit" });
  }
});




