import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // ✅ Import Routes & Route
import Navbar from "./Navbar";
import Home from "./Home";
import LoginPage from "./Login";
import CartPage from "./Cart.jsx";
import SignUp from "./Signup";
import Aboutus from "./About.jsx";
import ProductList from "./Product.jsx";
import ContactPage from "./Contact.jsx";
import Payment from "./Payment.jsx";
export default function App() {
  return (
    <BrowserRouter>
      <div className="bg-gray-900 min-h-screen">
        {/* <Navbar />  ✅ Uncommented Navbar for navigation */}
        <Routes>
          <Route path="/" element={<Home />} />    {/* ✅ Correct JSX syntax */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUp/>}></Route>
          <Route path="/about" element={<Aboutus/>}></Route>
          <Route path="/cart" element={<CartPage />} />
          <Route path="/products" element={<ProductList/>}></Route>
          <Route path="/contact" element={<ContactPage/>}>  </Route>
          <Route path="/payment" element={<Payment />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
