const Cart = require('./AddToCard.model'); // Import the Cart model
const Product = require('../Product/Product.model'); // Import the Product model (assuming you have it)
const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');
const productdata = require("../Product/demoProduct")
// Add an item to the cart
const addToCar2t = asyncHandler(async (req, res) => {
  const { productId, quantity } = req.body;

  if (!productId || !quantity) {
    return res.status(400).json({ message: 'Product ID and quantity are required' });
  }

  const userId = req.user._id; // Get user ID from authenticated user

  try {
    // Ensure the productId is a valid ObjectId
    const productObjectId = mongoose.Types.ObjectId(productId); // This is the correct way to get the ObjectId.

    // Check if the cart exists for the user
    let cart = await Cart.findOne({ userId }).populate('items.productId'); // Populate product details

    if (cart) {
      // Cart exists, check if the product already exists in the cart
      const existingItem = cart.items.find(item => item.productId.toString() === productObjectId.toString());

      if (existingItem) {
        // Product already in cart, update the quantity
        existingItem.quantity += quantity;
      } else {
        // New product, add to the cart
        cart.items.push({ productId: productObjectId, quantity });
      }

      // Save the updated cart
      await cart.save();
    } else {
      // Create a new cart for the user
      cart = await Cart.create({
        userId,
        items: [{ productId: productObjectId, quantity }],
      });
    }

    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to add to cart' });
  }
});
const addToCart = asyncHandler(async (req, res) => {
  const userId = req.user._id; // Get user ID from authenticated user

  const {  productId, quantity } = req.body;
console.log(userId,productId, quantity,"-=-=-=-=-=-=-=-=-=-=-=");

  // Validate incoming data
  if (!userId || !productId || !quantity) {
    return res.status(400).json({ message: 'userId, productId, and quantity are required.' });
  }

  // Check if the user and product exist
  const product = productdata.find(item => item.id == productId);

  // const product = await productdata.findById(productId);
  if (!product) {
    return res.status(404).json({ message: 'Product not found.' });
  }
console.log(product,"0-0-0-0-0-000000000000000000000000");

  try {
    // Find the cart for the user
    let cart = await Cart.findOne({ userId });
console.log(cart,"carttttttttttttt");

    if (cart) {
      // If cart exists, check if the product is already in the cart
      const existingItem = cart.items.find(item => item.productId.toString() === productId);

      if (existingItem) {
        // Product already in cart, update the quantity
        existingItem.quantity += parseInt(quantity); // Convert string to number
        existingItem.price = product.price; // Update price
      } else {
        // New product, add to the cart
        cart.items.push({ productId, quantity, price: product.price });
      }
console.log(existingItem,"existingItemexistingItem");

      // Save the updated cart
      await cart.save();
      res.status(200).json(cart);
    } else {
      // If cart doesn't exist, create a new one
      cart = new Cart({
        userId,
        items: [{ productId, quantity, price: product.price }],
      });
      await cart.save();
      res.status(201).json(cart);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to add to cart' });
  }
});

// Get the user's cart
const getCart = asyncHandler(async (req, res) => {
  const userId = req.user.id; // assuming you are passing the user info from the middleware
  console.log(userId);

  // Check if the cart exists for the user
  let cartItems = await Cart.findOne({ user: userId })
    console.log(cartItems, "--------------------------");

  if (!cartItems) {
    // If no cart exists, create a new cart document for the user
    cartItems = await Cart.create({
      userId,
      products: [], // initialize with an empty array
    });
    return res.status(200).json(cartItems.products); // Return an empty array as no items are in the cart
  }

  res.status(200).json(cartItems.products); // Return the list of cart items
});
const getAllUserCarts = asyncHandler(async (req, res) => {
  try {
    // Fetch all carts with populated product details
    const allCarts = await Cart.find().populate('products.productId'); // Populate product details
console.log(allCarts);

    if (!allCarts || allCarts.length === 0) {
      return res.status(200).json({ message: 'No carts found' });
    }

    // Calculate total price for each user's cart
    const cartWithTotal = allCarts.map(cart => {
      let totalPrice = 0;
      cart.products.forEach(item => {
        totalPrice += item.productId.price * item.quantity; // Calculate total price for each item in the cart
      });

      // Return the cart with product details and total price
      return {
        user: cart.user,
        products: cart.products,
        total: totalPrice
      };
    });

    res.status(200).json(cartWithTotal);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to retrieve all user carts' });
  }
});

module.exports = { addToCart, getCart,getAllUserCarts };
