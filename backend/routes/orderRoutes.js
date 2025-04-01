const express = require("express");
const {createOrder,  getAllOrders,  getOrderById,  updateOrderStatus,deleteOrder,} =require("../controllers/orderControllers.js");

const router = express.Router();

// 🆕 Create a new order
router.post("/createorder", createOrder);

// 📌 Get all orders
router.get("/getallorders", getAllOrders);

// 📌 Get order by ID
router.get("/getasingleorder/:id", getOrderById);

// ✅ Update order status (mark as paid)
router.put("/updateorder/:id", updateOrderStatus);

// ❌ Delete an order
router.delete("/deleteorder/:id", deleteOrder);

module.exports= router;
