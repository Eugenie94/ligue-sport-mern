const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  quantity: Number,
  price: Number,
  image: String,
}, { collection: 'products' });

module.exports = mongoose.model('Product', productSchema, 'products');
