import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar"; // Import Navbar
import QuickLinks from "./Quicklinks"; // Import QuickLinks
import signupImage from "./assets/sign.jpg"; // Replace with your image

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    try {
      const res = await axios.post("http://localhost:5000/api/users/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      localStorage.setItem("user", JSON.stringify(res.data)); // Save user data
      navigate("/"); // Redirect to homepage or login page
    } catch (error) {
      setError("User already exists or invalid data.");
    }
  };

  return (
    <>
      <Navbar /> {/* Add Navbar here */}
      
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">

          {/* Left Side: Sign Up Form */}
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
            <h1 className="text-3xl font-bold text-center mb-6 text-red-500">
              Y-NOT Premium Wears
            </h1>

            {error && <p className="text-red-400 text-sm text-center">{error}</p>}

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-300 text-sm mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-300 text-sm mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-300 text-sm mb-2">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-300 text-sm mb-2">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Confirm your password"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded font-semibold transition-all duration-300"
              >
                Create Account
              </button>
            </form>

            <p className="mt-4 text-center text-gray-400">
              Already have an account?{" "}
              <Link to="/login" className="text-red-500 hover:underline">
                Sign In
              </Link>
            </p>
          </div>

          {/* Right Side: Image */}
          <div className="flex justify-center items-center">
            <img
              src={signupImage}
              alt="Sign Up Illustration"
              className="w-full h-auto rounded-lg shadow-lg object-cover max-h-full"
            />
          </div>

        </div>
      </div>

      <QuickLinks /> {/* Add QuickLinks here */}
    </>
  );
}
