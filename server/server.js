const express = require('express')
const app = express()
let cors = require('cors');
const db = require('./db');

app.use(express.json())
app.use(cors())

// Route page d'accueil
app.get("/", (req, res) => {
      res.writeHead(200, {"Content-type": "text/html"});
      res.end("<h1> Page d'accueil </h1>");

      //const database = db.getDB();
})

// Affiche les produits
app.get("/produits", (req, res) => {
      res.status(200).json(url)
})







app.listen(3000, () => {
      console.log("Serveur à l'écoute");
})