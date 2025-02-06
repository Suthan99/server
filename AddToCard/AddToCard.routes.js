const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware'); // Protect middleware
const { addToCart, getCart,getAllUserCarts } = require('./AddToCard.controller');

// Add an item to the cart (protected)
router.post('/add', protect, addToCart);

// Get the user's cart (protected)
router.get('/cart', protect, getCart);
router.get('/cart/all', protect, getAllUserCarts);

module.exports = router;
