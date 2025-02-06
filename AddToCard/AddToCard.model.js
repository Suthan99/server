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
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product', // Reference to the Product model
          
        },
        quantity: {
          type: String,
          
          default: 1, // Default quantity is 1
        },
        price: {
          type: String,
          
        },
      },
    ],
  },
  { timestamps: true }
);
addToCartSchema.set('strictPopulate', false); // Add this line to allow population


module.exports = mongoose.model('Cart', addToCartSchema);
