const mongoose = require("mongoose");

const  ProductSchema = mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, default: 0 },
    countInStock: { type: Number, required: true, default: 0 },
},
{timestamps :true});

const Products = mongoose.model("Products",ProductSchema);
module.exports = Products;