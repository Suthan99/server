const mongoose = require('mongoose');

// Assuming you have a Product model
const Product = require('../Product/Product.model'); // Adjust the path according to your project structure

const addToCartSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'AllUser', // Reference to the User model
      
    },
    items: [
      {
        productId: { type: Number, required: true },
        quantity: {
          type: Number,
          default: 1, // Default quantity is 1
        },
        price: {
          type: Number,
          
        },
      },
    ],
  },
  { timestamps: true }
);
addToCartSchema.set('strictPopulate', false); // Add this line to allow population


module.exports = mongoose.model('Cart', addToCartSchema);
