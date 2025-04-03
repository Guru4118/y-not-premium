const express = require("express");
const { deleteProduct, createProduct, getAllProducts, getProductById, updateProduct, upload } = require("../controllers/productController");

const router = express.Router();

router.get("/getallproduct", getAllProducts);
router.get("/getproduct/:id", getProductById);

// 🟢 CREATE PRODUCT (With Cloudinary Upload)
router.post("/addproduct", upload.single("image"), createProduct); 

// 🟢 UPDATE PRODUCT
router.put("/updateproduct/:id", updateProduct);

// 🟢 DELETE PRODUCT
router.delete("/deleteproduct/:id", deleteProduct);

module.exports = router;
