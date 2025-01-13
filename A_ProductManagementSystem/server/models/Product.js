const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String },
  description: { type: String },
  category: { type: String },
  price: { type: Number },
  quantity: { type: Number },
  link: { type: String },
});

module.exports = mongoose.model('Product', productSchema);