import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import Navbar from "./Navbar";
import QuickLinks from "./Quicklinks";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); // React Router navigation hook

  useEffect(() => {
    // Retrieve the logged-in user
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);

    if (storedUser) {
      // Load the cart specific to this user
      const userCart = JSON.parse(localStorage.getItem(`cart_${storedUser.email}`)) || [];
      setCart(userCart);
    } else {
      setCart([]); // If no user is logged in, show an empty cart
    }
  }, []);

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((product) => product._id !== productId);
    setCart(updatedCart);

    if (user) {
      localStorage.setItem(`cart_${user.email}`, JSON.stringify(updatedCart)); // Store user-specific cart
    }
  };

  // Calculate total price
  const totalPrice = cart.reduce((total, product) => total + product.price * product.quantity, 0);

  // Handle payment navigation
  const handlePayment = () => {
    navigate("/payment"); // Redirect to the payment page
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-900"> {/* Use min-h-screen and flex-col */}
      <div className="container mx-auto pt-6 px-4 lg:px-12">
        <Navbar />
        <h1 className="text-3xl text-white font-bold text-center mb-8">Shopping Cart</h1>
        
        {cart.length === 0 ? (
          <p className="text-center text-gray-600">Your cart is empty.</p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {cart.map((product) => (
                <div key={product._id} className="p-4 bg-white shadow-xl rounded-lg transition-transform transform hover:scale-105 hover:shadow-2xl">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <h2 className="text-xl font-semibold mt-4">{product.name}</h2>
                  <p className="text-gray-600 mt-1">Quantity: {product.quantity}</p>
                  <p className="text-lg font-bold mt-2 text-gray-900">₹{product.price}</p>
                  <button
                    onClick={() => removeFromCart(product._id)}
                    className="mt-3 w-full text-white py-2 bg-red-500 hover:bg-red-600 rounded-lg font-semibold transition-all"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            {/* Total Price and Payment Button */}
            <div className="mt-6 text-center">
              <h2 className="text-2xl text-white font-bold">Total: ₹{totalPrice}</h2>
              <button
                onClick={handlePayment}
                className="mt-4 px-6 py-3 bg-green-500 text-white rounded-lg text-lg hover:bg-green-600"
              >
                Proceed to Payment
              </button>
            </div>
          </>
        )}
      </div>
      <br />

      <div className="mt-auto w-full"> {/* Make QuickLinks full width and push to bottom */}
        <QuickLinks />
      </div>
    </div>
  );
}