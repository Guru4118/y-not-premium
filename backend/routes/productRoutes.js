const express = require("express");
const {deleteProduct,createProduct,getallproduct,getProductById,updateproduct } = require("../controllers/productController.js")
const router = express.Router();
const multer = require("multer");

// Configure multer for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/"); // Store in 'uploads' directory
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage: storage });


router.get("/getallproduct",getallproduct);
router.get("/getproduct/:id",getProductById);
router.post("/addproduct", upload.single("image"), createProduct); 
//router.post("/addproduct",createProduct);
router.put("/updateproduct/:id",updateproduct);
router.delete("/deleteproduct/:id",deleteProduct);



module.exports= router;