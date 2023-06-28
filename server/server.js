const express = require('express')
const app = express()
let cors = require('cors');

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb+srv://admin:admin@cluster-ligue-sport.eujmpwy.mongodb.net/?retryWrites=true&w=majority';

MongoClient.connect(url, function(err, client) {
  if (err) {
    console.error('Erreur de connexion à MongoDB :', err);
    return;
  }
  console.log('Connecté à la base de données MongoDB');
  
  // À ce stade, vous pouvez effectuer des opérations sur la base de données
});

app.use(express.json())
app.use(cors())

// Route page d'accueil
app.get("/", (req, res) => {
      res.writeHead(200, {"Content-type": "text/html"});
      res.end("<h1> Page d'accueil </h1>");
})

// Affiche les produits
app.get("/produits", (req, res) => {
      res.status(200).json(url)
})







app.listen(3000, () => {
      console.log("Serveur à l'écoute");
})