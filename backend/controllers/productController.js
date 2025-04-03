const cloudinary = require("../config/cloudinaryConfig");
const multer = require("multer");
const Products = require("../models/productModel");

// Configure multer to store images in memory before uploading to Cloudinary
const storage = multer.memoryStorage();
const upload = multer({ storage });

// 🟢 CREATE PRODUCT & UPLOAD IMAGE TO CLOUDINARY
const createProduct = async (req, res) => {
  try {
    const { name, description, price, countInStock } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Please upload an image" });
    }

    // Upload image to Cloudinary
    cloudinary.uploader.upload_stream(
      { folder: "products" },
      async (error, result) => {
        if (error) return res.status(500).json({ message: "Cloudinary upload failed", error });

        // Save product to MongoDB with Cloudinary URL
        const product = new Products({
          name,
          image: result.secure_url, // Cloudinary URL
          description,
          price,
          countInStock,
        });

        const savedProduct = await product.save();
        res.status(201).json(savedProduct);
      }
    ).end(req.file.buffer);
    
  } catch (error) {
    res.status(500).json({ message: "Error saving product", error });
  }
};

// 🟢 GET ALL PRODUCTS (Images from Cloudinary)
const getAllProducts = async (req, res) => {
  try {
    const products = await Products.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error loading products", error });
  }
};

// 🟢 GET A SINGLE PRODUCT
const getProductById = async (req, res) => {
  try {
    const product = await Products.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error fetching product", error });
  }
};

// 🟢 UPDATE PRODUCT
const updateProduct = async (req, res) => {
  try {
    const { name, image, description, price, countInStock } = req.body;
    const updatedProduct = await Products.findByIdAndUpdate(
      req.params.id,
      { name, image, description, price, countInStock },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) return res.status(400).json({ message: "Product not found" });

    res.status(200).json({ message: "Product updated successfully", updatedProduct });
  } catch (error) {
    res.status(500).json({ message: "Error updating product", error });
  }
};

// 🟢 DELETE PRODUCT
const deleteProduct = async (req, res) => {
  try {
    const product = await Products.findByIdAndDelete(req.params.id);

    if (!product) return res.status(404).json({ message: "Product not found" });

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error });
  }
};

module.exports = { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct, upload };
