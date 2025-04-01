const express = require("express");
const { registerUser, authUser, addToCart, getCartItems } = require("../controllers/userController.js");

const router = express.Router();

// User Authentication
router.post("/register", registerUser);
router.post("/login", authUser);

// Cart Operations
router.post("/cart/add", addToCart); // Add item to cart
router.get("/cart/:userId", getCartItems); // Get user's cart items

module.exports = router;
