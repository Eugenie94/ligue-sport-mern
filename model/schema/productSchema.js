const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  quantity: String,
  price: Number
}, { collection: 'products' });

module.exports = mongoose.model('Product', productSchema, 'products');
