const asyncHandler = require("express-async-handler");
const Cart = require("../models/cartModel");

// Add Item to Cart
const addToCart = asyncHandler(async (req, res) => {
    const { userId, productId, name, price, image } = req.body;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
        cart = new Cart({ userId, items: [] });
    }

    const existingItem = cart.items.find(item => item.productId.toString() === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.items.push({ productId, name, price, image, quantity: 1 });
    }

    await cart.save();
    res.json(cart);
});

// Get Cart Items
const getCart = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const cart = await Cart.findOne({ userId });
    res.json(cart || { userId, items: [] });
});

// Remove Item from Cart
const removeFromCart = asyncHandler(async (req, res) => {
    const { userId, productId } = req.body;
    let cart = await Cart.findOne({ userId });

    if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter(item => item.productId.toString() !== productId);
    await cart.save();
    res.json(cart);
});

module.exports = { addToCart, getCart, removeFromCart };
