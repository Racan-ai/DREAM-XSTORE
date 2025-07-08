const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: String,
  isLiked: { type: Boolean, default: false },
  slug: { type: String, unique: true }
});

module.exports = mongoose.model('Product', ProductSchema);
