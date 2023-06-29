const express = require('express')
const app = express()
let cors = require('cors');
const fs = require('fs');
const db = require('./db');
const url = 'mongodb+srv://admin:admin@cluster-ligue-sport.eujmpwy.mongodb.net/?retryWrites=true&w=majority';


app.use(express.json())
app.use(cors())

// Route page d'accueil
app.get("/", (req, res) => {
      res.writeHead(200, { "Content-type": "text/html" });
      res.end("<h1> Page d'accueil </h1>");
})

// ----------------------------------------------------------------- User ----------------------------------------------------------------- //

// Affiche les produits
app.get("/product", (req, res) => {
      res.status(200).json(product)
})

// Affiche le panier
app.get("/cart", (req, res) => {
      res.status(200).json(product)
})

// ----------------------------------------------------------------- Admin ----------------------------------------------------------------- //

// ----------------------------- User ----------------------------- //

// Permet d'enregistrer les données
function saveUser() {
      fs.writeFile('./user.json', JSON.stringify(user), (err) => {
            if (err) {
                  console.error("Erreur lors de l'écriture du fichier JSON :", err);
            } else {
                  console.log("Fichier JSON mis à jour avec succès");
            }
      });
}

// Affichage la page admin
app.get("/admin", (req, res) => {
      res.writeHead(200, { "Content-type": "text/html" });
      res.end("<h1> Page Administrateur avec deus boutons (user et product)</h1>");
      res.status(200).json(user)
})

// Affichage de la page permettant d'afficher les user ( if admin alors je peux crud user, a voir)
app.get("/admin/user", (req, res) => {
      // res.writeHead(200, { "Content-type": "text/html" });
      // res.end("<h1> users crud </h1>");
      res.status(200).json(user)
})

// Affichage de la page permettant d'ajouter un user
app.post("/admin/user", (req, res) => {
      user.push(req.body);
      saveUser();
      res.status(200).json(user);
})

// Affichage de la page permettant de modifier un user
app.put("/admin/user/:id", (req, res) => {
            const id = parseInt(req.params.id);
            let unUser = user.find((user) => user.id === id);
            if (unUser) {
                  unUser.firstname = req.body.firstname;
                  unUser.lastname = req.body.lastname;
                  unUser.age = req.body.age;
                  unUser.email = req.body.email;
                  saveUser();
                  res.status(200).json(unUser);
            } else {
                  res.status(404).json({ message: "Aucun user trouvé" });
            }
      });

// Affichage de la page permettant de supprimer un user
app.delete("/admin/user/:id", (req, res) => {
      const id = parseInt(req.params.id);
      const index = user.findIndex((user) => user.id === id);
      if (index !== -1) {
            user.splice(index, 1);
            saveUser();
            res.status(200).json(user);
      } else {
            res.status(404).json({ message: "Aucun user trouvé" });
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

app.listen(3000, () => {
      console.log("Serveur à l'écoute");
})
