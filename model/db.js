const mongoose = require('mongoose');

const uri = 'mongodb+srv://admin:admin@cluster-ligue-sport.eujmpwy.mongodb.net/ligue-sportive?retryWrites=true&w=majority';

async function connect() {
  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("MongoDB connecté avec succès");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
}

module.exports = { connect };
