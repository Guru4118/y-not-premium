const mongoose = require("mongoose");
const Products = require("../models/productModel.js")


const multer = require("multer");

// Set Storage Engine
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/"); // Images will be stored in 'uploads' folder
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

// Upload Middleware
const upload = multer({ storage: storage });


//create a productt 

const createProduct = async (req, res) => {
  try {
      const { name, description, price, countInStock } = req.body;
      const image = req.file ? req.file.filename : null; // Get uploaded image filename

      if (!image) {
          return res.status(400).json({ message: "Please upload an image" });
      }

      const product = new Products({
          name,
          image,  // Store filename in MongoDB
          description,
          price,
          countInStock
      });

      const savedProduct = await product.save();
      res.status(201).json(savedProduct);

  } catch (error) {
      console.error("Could not save the product to DB", error);
      res.status(400).json({ message: "Error saving product", error });
  }
};

//get all product details
const getallproduct = async (req, res) => {
  try {
      const products = await Products.find();
      products.forEach(product => {
          product.image = product.image ? `http://localhost:5000/uploads/${product.image}` : "";
      });
      res.status(200).json(products);
  } catch (error) {
      res.status(400).json({ message: "Error in loading all products", error });
  }
};



//get particular product details 
const getProductById = async (req, res) => {
    try {
      const product = await Products.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ message: "Error fetching product", error: error.message });
    }
  };

  //update 

  const updateproduct = async(req,res)=>{
    try{
        const{name,image,description,price,countInStock}=req.body;
        const updateproduct = await Products.findByIdAndUpdate(req.params.id,{name,image,description,price,countInStock},{new :true,runValidators:true});
        if(!updateproduct)
        {
            return res.status(400).json({message : "product not found "});

        }
        else{
            res.status(201).json({message:"updated mamey"});
        }
    }
    catch(error)
    {
        res.status(500).json({message:"error",error});

    }
  
  }
  
  //del
  const deleteProduct = async (req, res) => {
    try {
      const product = await Products.findByIdAndDelete(req.params.id);
  
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
  
      res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting product", error: error.message });
    }
  };




module.exports = {deleteProduct,createProduct,getallproduct,getProductById,updateproduct};