const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    items: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Product" },
            name: String,
            price: Number,
            image: String,
            quantity: { type: Number, default: 1 }
        }
    ]
}, { timestamps: true });

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
