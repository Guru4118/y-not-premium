import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "./Navbar"; // Import Navbar
import QuickLinks from "./Quicklinks"; // Import QuickLinks
import loginImage from "./assets/login.jpg"; // Import image (replace with your image)

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/users/login`, { email, password });
      localStorage.setItem("user", JSON.stringify(res.data)); // Save user data
      navigate("/"); // Redirect to homepage or cart page
    } catch (error) {
      setError("Invalid email or password");
    }
  };

  return (
    <>
      <Navbar /> {/* Add Navbar here */}
      
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
          
          {/* Left Side: Login Form */}
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
            <h1 className="text-4xl font-bold text-center mb-6 text-red-500">Y-NOT</h1>

            {error && <p className="text-red-400 text-sm text-center">{error}</p>}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300">Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 mt-1 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300">Password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 mt-1 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <button type="submit" className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 rounded transition">
                Login
              </button>
            </form>
            
            <Link to="/signup">
              <p className="text-sm text-gray-400 mt-4 text-center">
                Don't have an account? <span className="text-red-400 cursor-pointer hover:underline">Sign Up</span>
              </p>
            </Link>
          </div>

          {/* Right Side: Image */}
          <div className="flex justify-center items-center">
            <img 
              src={loginImage} 
              alt="Login Illustration" 
              className="w-full h-auto rounded-lg shadow-lg object-cover max-h-full" 
            />
          </div>
          
        </div>
      </div>

      <QuickLinks /> {/* Add QuickLinks here */}
    </>
  );
}
