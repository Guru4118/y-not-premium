import React, { useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import QuickLinks from "./Quicklinks";
import contactImage from "./assets/contact.jpg"; // Add your image here

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const response = await axios.post(
        "AKfycbybFBp9PepPMaitkcZNdmz6RwSTFP8UApPQn1aNGjlWrbGY711DcF2jZhWoarZc9Eqr",
        formData,
        {
          headers: { "Content-Type": "application/json" }, // Ensure JSON format
        }
      );

      if (response.data.status === "Success") {
        setStatus("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("Failed to send message.");
      }
    } catch (error) {
      console.error(error);
      setStatus("Error sending message.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="bg-gray-900 min-h-screen py-12 px-4">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Contact Form Section */}
          <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Contact Us</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                  required
                />
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                  required
                />
              </div>

              <div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                  rows="6"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-red-600 text-white p-4 rounded-lg hover:bg-red-700 focus:outline-none transition"
              >
                Send Message
              </button>
            </form>

            {status && (
              <p
                className={`text-center text-sm mt-4 ${
                  status.includes("success") ? "text-green-500" : "text-red-500"
                }`}
              >
                {status}
              </p>
            )}
          </div>

          {/* Image Section */}
          <div className="flex justify-center">
            <img
              src={contactImage} // Replace with your image path
              alt="Contact Us"
              className="w-full h-auto rounded-lg shadow-lg object-cover"
            />
          </div>
        </div>
      </div>

      <QuickLinks />
    </>
  );
}
