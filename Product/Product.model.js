const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  category: { type: String, required: true },
  image: { type: String }, // URL of the product image
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Product", productSchema);
