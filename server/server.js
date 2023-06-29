// Import du module Express
const express = require('express');
const cors = require('cors');
// Import du module Mongoose pour la communication avec MongoDB
const mongoose = require('mongoose');
// Import du modèle de schéma User
const User = require('../model/schema/userSchema');
const Product = require('../model/schema/productSchema');

const db = require('../model/db.js');
const User = require('../model/schema/userSchema.js');
const Product = require('../model/schema/productSchema.js');

app.use(express.json()); // Utilisation du middleware pour parser les requêtes au format JSON
app.use(cors()); // Activation de CORS pour autoriser les requêtes cross-origin

const url = 'mongodb+srv://admin:admin@cluster-ligue-sport.eujmpwy.mongodb.net/ligue-sportive?retryWrites=true&w=majority';

mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
      .then(() => {
        console.log('Connexion à la base de données réussie');
      })
      .catch((error) => {
        console.error('Erreur lors de la connexion à la base de données:', error);
      });

// Route page d'accueil
app.get("/", (req, res) => {
      res.writeHead(200, { "Content-type": "text/html" });
      res.end("<h1> Page d'accueil </h1>");
})

// ----------------------------------------------------------------- User ----------------------------------------------------------------- //

// Affiche les produits : a faire
app.get("/product", (req, res) => {
      res.status(200).json(product)
})

// Affiche le panier : a faire
app.get("/cart", (req, res) => {
      res.status(200).json(product)
})

// ----------------------------------------------------------------- Admin ----------------------------------------------------------------- //

// ----------------------------- User ----------------------------- //

// Affichage la page admin
app.get("/admin", (req, res) => {
      res.writeHead(200, { "Content-type": "text/html" });
      res.end("<h1> Page Administrateur avec deus boutons (user et product)</h1>");
      res.status(200).json(users)
})

// Affichage de la page permettant d'afficher les users
app.get("/admin/users", async (req, res) => {
      try {
            const users = await User.find();
            res.status(200).json(users);
      } catch (error) {
            console.error("Erreur lors de la récupération des utilisateurs :", error);
            res.status(500).json({ error: "Erreur lors de la récupération des utilisateurs" });
      }
});

// Affichage de la page permettant d'ajouter un user
app.post('/admin/users', async (req, res) => {
      try {
        const { firstName, lastName, email, password } = req.body;
        const newUser = new User({ firstName, lastName, email,  password });
        await newUser.save();
        res.status(200).json(newUser);
      } catch (error) {
        console.error('Erreur lors de l\'ajout de l\'utilisateur:', error);
        res.status(500).json({ error: 'Erreur lors de l\'ajout de l\'utilisateur' });
      }
    });

// Affichage de la page permettant de modifier un user
app.put('/admin/users/:id', async (req, res) => {
      try {
            const userId = req.params.id;
            const { firstName, lastName, email, password  } = req.body;
            const updatedUser = await User.findByIdAndUpdate(
                  userId,
                  { firstName, lastName, email, password  },
                  { new: true }
            );
            if (updatedUser) {
                  res.status(200).json(updatedUser);
            } else {
                  res.status(404).json({ message: 'Utilisateur non trouvé' });
            }
      } catch (error) {
            console.error('Erreur lors de la mise à jour de l\'utilisateur :', error);
            res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'utilisateur' });
      }
});

// Affichage de la page permettant de supprimer un user4
app.delete("/admin/users/:id", async (req, res) => {
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
            console.error('Erreur lors de la suppression de l\'utilisateur :', error);
            res.status(500).json({ message: "Erreur lors de la suppression de l'utilisateur" });
      }
});

// ----------------------------- Product  ----------------------------- //

// Affichage la page admin
app.get("/admin", (req, res) => {
      res.writeHead(200, { "Content-type": "text/html" });
      res.end("<h1> Page Administrateur avec deus boutons (user et product)</h1>");
      res.status(200).json(products)
})

// Affichage de la page permettant d'afficher les products
app.get("/admin/products", async (req, res) => {
      try {
            const products = await Product.find();
            res.status(200).json(products);
      } catch (error) {
            console.error("Erreur lors de la récupération des produits :", error);
            res.status(500).json({ error: "Erreur lors de la récupération des produits" });
      }
});

// Affichage de la page permettant d'ajouter un product
app.post('/admin/products', async (req, res) => {
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

// Affichage de la page permettant de modifier un produit
app.put('/admin/products/:id', async (req, res) => {
      try {
            const productId = req.params.id;
            const { name, quantity, price, image  } = req.body;
            const updatedProduct = await Product.findByIdAndUpdate(
                  productId,
                  { name, quantity, price, image  },
                  { new: true }
            );
            if (updatedProduct) {
                  res.status(200).json(updatedProduct);
            } else {
                  res.status(404).json({ message: 'Produit non trouvé' });
            }
      } catch (error) {
            console.error('Erreur lors de la mise à jour du produit :', error);
            res.status(500).json({ error: 'Erreur lors de la mise à jour du produit' });
      }
});

// Affichage de la page permettant de supprimer un produit : fait 
app.delete("/admin/products/:id", async (req, res) => {
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

app.listen(4000, () => {
      console.log("Serveur à l'écoute");
})

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

// Route pour afficher tous les utilisateurs
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs' });
  }
});

// Route pour obtenir les informations d'un utilisateur spécifique
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

// Affichage de la page permettant d'ajouter un product
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

// Affichage de la page permettant de supprimer un produit : fait 
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




