const Users = require("../models/userModel.js");
const bcrypt = require("bcryptjs");

// Register User
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if user exists
        const userExists = await Users.findOne({ email });
        if (userExists) {
            console.log("User already exists. Please login.");
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user with hashed password and empty cart
        const user = await Users.create({ name, email, password: hashedPassword, cart: [] });

        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                cart: user.cart, // Send cart as well
            });
        } else {
            res.status(400).json({ message: "Invalid user data" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error registering user", error: error.message });
    }
};

// Login User
const authUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await Users.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                cart: user.cart, // Return cart data on login
            });
        } else {
            res.status(400).json({ message: "Invalid email or password" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error: error.message });
    }
};

// Add Item to Cart
const addToCart = async (req, res) => {
    const { userId, productId, name, price, quantity, image } = req.body;

    try {
        const user = await Users.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if item already exists in cart
        const itemIndex = user.cart.findIndex(item => item.productId.toString() === productId);

        if (itemIndex > -1) {
            // If item exists, update quantity
            user.cart[itemIndex].quantity += quantity;
        } else {
            // Otherwise, add new item
            user.cart.push({ productId, name, price, quantity, image });
        }

        await user.save();
        res.status(200).json({ message: "Item added to cart", cart: user.cart });
    } catch (error) {
        res.status(500).json({ message: "Error adding to cart", error: error.message });
    }
};

// Get Cart Items
const getCartItems = async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await Users.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user.cart);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving cart", error: error.message });
    }
};

module.exports = { registerUser, authUser, addToCart, getCartItems };
