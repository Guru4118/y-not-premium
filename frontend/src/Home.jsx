import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // import the styles for AOS
import Navbar from "./Navbar";
import girl from "./assets/boy.jpg";
import two from "./assets/2.jpg";
import QuickLinks from "./Quicklinks";

function Home() {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
      easing: "ease-in-out", // Animation easing
      once: true, // Only animate once
    });
  }, []);

  return (
    <div className="bg-gray-900 min-h-screen">
      <Navbar />

      {/* First Section */}
      <div
        className="container mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-8 p-6"
        data-aos="fade-right"
      >
        <div className="flex justify-center">
          <img className="w-72 md:w-96 lg:w-[400px] h-auto" src={girl} alt="Fashion" />
        </div>
        <div className="text-white">
          <h1 className="text-white text-4xl lg:text-5xl font-bold mb-4 transition-transform duration-300 transform hover:scale-105">
            "Elevate Your Style – Where Timeless Elegance Meets Modern Sophistication."
          </h1>
          <p className="text-white text-lg lg:text-xl opacity-80 hover:opacity-100 transition-opacity duration-300">
            Experience luxury fashion curated for confidence, distinction, and trend-setting excellence.
          </p>
        </div>
      </div>

      {/* Second Section */}
      <div
        className="container mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-8 p-6"
        data-aos="fade-left"
      >
        <div className="text-white">
          <h1 className="text-white text-4xl lg:text-5xl font-bold mb-4 transition-transform duration-300 transform hover:scale-105">
            "Redefining Fashion – Where Innovation, Elegance, and Confidence Converge."
          </h1>
          <p className="text-white text-lg lg:text-xl opacity-80 hover:opacity-100 transition-opacity duration-300">
            Discover trendsetting styles crafted to inspire sophistication and individuality.
          </p>
        </div>
        <div className="flex justify-center">
          <img className="w-72 md:w-96 lg:w-[400px] h-auto" src={two} alt="Fashion Model" />
        </div>
      </div>

      {/* Hero Section */}
      <div
        className="flex items-center justify-center min-h-[80vh] bg-gray-900 text-white py-20 px-6"
        data-aos="zoom-in"
      >
        <h1 className="text-2xl md:text-3xl font-bold text-center max-w-4xl leading-relaxed">
          Y-NOT: Redefining fashion with bold elegance and limitless confidence. Step into a world where trendsetting designs meet superior craftsmanship, creating timeless statements. Elevate your style, embrace uniqueness, and let your fashion speak volumes. Because when it comes to style, innovation, and confidence—why not?
        </h1>
      </div>

      <QuickLinks />
    </div>
  );
}

export default Home;
