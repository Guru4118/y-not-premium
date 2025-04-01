import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Retrieve user from localStorage
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("cart"); // Remove user from storage
    setUser(null); // Update state
    window.location.reload(); // Refresh to reflect changes
  };

  return (
    <nav className="bg-gray-900 py-4">
      <div className="container mx-auto flex justify-between items-center px-6">
        
        {/* Logo */}
        <div className="text-white text-3xl font-bold">Y-nOt</div>

        {/* Navigation Links */}
        <ul className="flex space-x-6 text-white text-lg">
          <li>
            <Link to="/" className="hover:text-black hover:bg-white hover:rounded-full hover:p-2 transition-all duration-400">Home</Link>
          </li>
          <li>
            <Link to="/products" className="hover:text-black hover:bg-white hover:rounded-full hover:p-2 transition-all duration-400">Products</Link>
          </li>
          <li>
            <Link to="/cart" className="hover:text-black hover:bg-white hover:rounded-full hover:p-2 transition-all duration-400">Cart</Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-black hover:bg-white hover:rounded-full hover:p-2 transition-all duration-400">About Us</Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-black hover:bg-white hover:rounded-full hover:p-2 transition-all duration-400">Contact Us</Link>
          </li>
        </ul>

        {/* User Authentication */}
        <div>
          {user ? (
            <div className="flex items-center space-x-4">
              <span className="text-white text-lg">Welcome, {user.name}</span>
              <button
                onClick={handleLogout}
                className="text-white text-lg border px-4 py-2 rounded-lg hover:bg-white hover:text-red-500 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="text-white text-lg border px-4 py-2 rounded-lg hover:bg-white hover:text-red-500 transition"
            >
              Login
            </Link>
          )}
        </div>

      </div>
    </nav>
  );
}

export default Navbar;
