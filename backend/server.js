const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db.js");
const userRoutes = require("./routes/userRoutes.js");
const orderRoutes = require("./routes/orderRoutes.js");
const productRoutes = require("./routes/productRoutes.js");
const cartRoutes = require("./routes/cartRoutes");
const path = require("path");
const paymentRoutes = require("./routes/paymentRoutes");


dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors({
    origin: "https://y-not-premium-b533.onrender.com",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"]
}));

// Serve static files from the uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// API Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/payment", paymentRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running at: ${port}`);
}).on("error", (error) => {
    console.log("Error in server running: ", error);
});
