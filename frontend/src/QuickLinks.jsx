import React from "react";
import { Link } from "react-router-dom"; // Use Link if using React Router

const QuickLinks = () => {
  return (
    <div className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Company Info */}
        <div>
          <h2 className="text-xl font-bold mb-4">About Y-nOt</h2>
          <p className="text-gray-300">
            Y-nOt Premium Wears offers trendy clothing with high-quality fabrics.
            Explore our latest collection now!
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-bold mb-4">Quick Links</h2>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-red-500 transition">Home</Link></li>
            <li><Link to="/products" className="hover:text-red-500 transition">Products</Link></li>
            <li><Link to="/cart" className="hover:text-red-500 transition">Cart</Link></li>
            <li><Link to="/about" className="hover:text-red-500 transition">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-red-500 transition">Contact Us</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h2 className="text-xl font-bold mb-4">Contact Us</h2>
          <p className="text-gray-300">📍 Location: Vellore, India</p>
          <p className="text-gray-300">📧 Email: support@ynotwears.com</p>
          <p className="text-gray-300">📞 Phone: +91 6988698869</p>
        </div>

      </div>
<br />
      {/* Copyright Section */}
      <div className="bg-gray-900 text-center py-4">
        <p className="text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} Y-nOt Premium Wears. All Rights Reserved @ <span className="text-red-400 text-2xl"><a target="new" href="https://www.linkedin.com/in/guruprasath103/">Guruprasath</a></span>
        </p>
      </div>
    </div>
  );
};

export default QuickLinks;
