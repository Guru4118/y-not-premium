import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import QuickLinks from "./Quicklinks";
import { back_url } from "../url";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${back_url}/api/products/getallproduct`);

        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load products");
        setLoading(false);
      }
    };

    fetchProducts();
    loadUserAndCart();
  }, []);

  const loadUserAndCart = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);

    if (storedUser) {
      const userCart = JSON.parse(localStorage.getItem(`cart_${storedUser.email}`)) || [];
      setCart(userCart);
    } else {
      setCart([]);
    }
  };

  const addToCart = (product) => {
    if (!user) {
      alert("Please log in to add items to your cart.");
      return;
    }

    const existingItem = cart.find((item) => item._id === product._id);
    
    let updatedCart;
    if (existingItem) {
      updatedCart = cart.map((item) =>
        item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      updatedCart = [...cart, { ...product, quantity: 1 }];
    }

    setCart(updatedCart);
    localStorage.setItem(`cart_${user.email}`, JSON.stringify(updatedCart));
  };

  if (loading) return <p className="text-center text-xl">Loading products...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="bg-gray-900 min-h-screen">
      <Navbar />
      
      <div className="container mx-auto pt-6 px-4 lg:px-12">
        <br />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div 
              key={product._id} 
              className="p-4 bg-white shadow-xl rounded-lg transition-transform duration-500 ease-in-out transform hover:scale-105 hover:shadow-2xl"
            >
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-64 object-cover rounded-lg"
              />
              <h2 className="text-xl font-semibold mt-4">{product.name}</h2>
              <p className="text-gray-600 mt-1">{product.description}</p>
              <p className="text-lg font-bold mt-2 text-gray-900">₹{product.price}</p>
              <button
                onClick={() => addToCart(product)}
                className="mt-3 w-full text-white py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-all"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* QuickLinks Full Width Section */}
      <div className="w-full mt-8">
        <QuickLinks />
      </div>
    </div>
  );
}
