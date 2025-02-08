const mongoose = require("mongoose");
const Order = require("./order.model"); // Correct Order model path
const Cart = require("../AddToCard/AddToCard.model");   // Correct Cart model path

// Place an order
const placeOrder = async (req, res) => {
  console.log("hello");
  
  try {
    const { name, address, phoneNumber, age, totalPrice } = req.body;
    const userId = req.user._id;

    // Validate inputs
    if (!name || !address || !phoneNumber || !age || !totalPrice) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Check if the user's cart exists
    const cart = await Cart.findOne({ userId });
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Your cart is empty." });
    }

    // Create new order
    const order = new Order({
      userId,
      name,
      address,
      phoneNumber,
      age,
      items: cart.items,
      totalPrice,
      status: "Pending",
    });

    await order.save();

    // Clear cart after successful order
    await Cart.deleteOne({ userId });

    res.status(201).json({ message: "Order placed successfully!", order });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ message: "Failed to place order", error: error.message });
  }
};
const getOrder =  async (req, res) => {
  try {
    const userId = req.user._id; // Get user ID from middleware
    const orders = await Order.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

module.exports = {
  placeOrder,getOrder
};
