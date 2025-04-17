import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react"; // Optional: use heroicons or lucide-react for icons

function Navbar() {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
    setUser(null);
    window.location.reload();
  };

  return (
    <nav className="bg-gray-900 py-4">
      <div className="container mx-auto flex justify-between items-center px-6">

        {/* Logo */}
        <div className="text-white text-3xl font-bold">Y-nOt</div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-white">
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Navigation Links - Desktop */}
        <ul className="hidden md:flex space-x-6 text-white text-lg">
          <li><Link to="/" className="hover:text-black hover:bg-white hover:rounded-full hover:p-2 transition-all duration-400">Home</Link></li>
          <li><Link to="/products" className="hover:text-black hover:bg-white hover:rounded-full hover:p-2 transition-all duration-400">Products</Link></li>
          <li><Link to="/cart" className="hover:text-black hover:bg-white hover:rounded-full hover:p-2 transition-all duration-400">Cart</Link></li>
          <li><Link to="/about" className="hover:text-black hover:bg-white hover:rounded-full hover:p-2 transition-all duration-400">About Us</Link></li>
          <li><Link to="/contact" className="hover:text-black hover:bg-white hover:rounded-full hover:p-2 transition-all duration-400">Contact Us</Link></li>
        </ul>

        {/* User Auth - Desktop */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <>
              <span className="text-white text-lg">Welcome, {user.name}</span>
              <button
                onClick={handleLogout}
                className="text-white text-lg border px-4 py-2 rounded-lg hover:bg-white hover:text-red-500 transition"
              >
                Logout
              </button>
            </>
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

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-4 text-white space-y-2 bg-gray-800">
          <Link to="/" onClick={() => setMenuOpen(false)} className="block hover:text-black hover:bg-white hover:rounded-lg px-3 py-2">Home</Link>
          <Link to="/products" onClick={() => setMenuOpen(false)} className="block hover:text-black hover:bg-white hover:rounded-lg px-3 py-2">Products</Link>
          <Link to="/cart" onClick={() => setMenuOpen(false)} className="block hover:text-black hover:bg-white hover:rounded-lg px-3 py-2">Cart</Link>
          <Link to="/about" onClick={() => setMenuOpen(false)} className="block hover:text-black hover:bg-white hover:rounded-lg px-3 py-2">About Us</Link>
          <Link to="/contact" onClick={() => setMenuOpen(false)} className="block hover:text-black hover:bg-white hover:rounded-lg px-3 py-2">Contact Us</Link>
          {user ? (
            <button
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              className="block text-left w-full hover:text-red-500 hover:bg-white rounded-lg px-3 py-2"
            >
              Logout
            </button>
          ) : (
            <Link to="/login" onClick={() => setMenuOpen(false)} className="block hover:text-red-500 hover:bg-white rounded-lg px-3 py-2">
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
