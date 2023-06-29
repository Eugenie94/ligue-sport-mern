// Import du module Express
const express = require('express');
// Initialisation de l'application Express
const app = express();
// Import du module CORS
const cors = require('cors');
// Import du module Mongoose pour la communication avec MongoDB
const mongoose = require('mongoose');
// Import du modèle de schéma User
const User = require('../model/schema/userSchema');


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

// Affichage de la page permettant de supprimer un user : fait 
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

// Permet d'enregistrer les données
function saveProduct() {
      fs.writeFile('./product.json', JSON.stringify(product), (err) => {
            if (err) {
                  console.error("Erreur lors de l'écriture du fichier JSON :", err);
            } else {
                  console.log("Fichier JSON mis à jour avec succès");
            }
      });
}

// Affichage de la page permettant d'afficher un product
app.get("/admin/product", (req, res) => {
      res.status(200).json(product)
})

// Affichage de la page permettant d'ajouter un product
app.post("/admin/product", (req, res) => {
      product.push(req.body);
      saveProduct();
      res.status(200).json(product);
})

// Affichage de la page permettant de modifier un product
app.put("/admin/product/:id", (req, res) => {
      const id = parseInt(req.params.id);
      let unProduct = product.find((product) => product.id === id);
      if (unProduct) {
            unProduct.titre = req.body.name;
            unProduct.auteur = req.body.price;
            unProduct.prix = req.body.description;
            saveProduct();
            res.status(200).json(unProduct);
      } else {
            res.status(404).json({ message: "Aucun product trouvé" });
      }
});

// Affichage de la page permettant de supprimer un product
app.delete("/admin/product/:id", (req, res) => {
      const id = parseInt(req.params.id);
      const index = product.findIndex((product) => product.id === id);
      if (index !== -1) {
            product.splice(index, 1);
            saveProduct();
            res.status(200).json(product);
      } else {
            res.status(404).json({ message: "Aucun product trouvé" });
      }
});

app.listen(4000, () => {
      console.log("Serveur à l'écoute");
})
