const mongoose = require("mongoose");
const Users = require("../models/userModel");

const orderSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Users" },
    orderItems: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    totalPrice: { type: Number, required: true },
    isPaid: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }

);

const Orders = mongoose.model("Orders",orderSchema);

module.exports= Orders ;