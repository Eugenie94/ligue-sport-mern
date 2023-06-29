const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  quantity: String,
}, { collection: 'products' });

module.exports = mongoose.model('Product', productSchema, 'products');
