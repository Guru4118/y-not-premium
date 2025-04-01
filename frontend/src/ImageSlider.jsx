import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import img1 from "./assets/h.jpg";
import img2 from "./assets/hh.jpg";
import img3 from "./assets/hhh.jpg";
import img4 from "./assets/j.jpg";

function ImageSlider() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
      arrows: true,
    };
  
    const images = [
      { src: img1, title: "Timeless Elegance", desc: "Experience fashion that blends tradition and modernity." },
      { src: img2, title: "Bold & Unique", desc: "Stand out with confidence and redefine your style." },
      { src: img3, title: "Trendsetting Designs", desc: "Elevate your wardrobe with exclusive collections." },
      { src: img4, title: "Luxury & Comfort", desc: "Feel the perfect balance of sophistication and comfort." },
    ];
  
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Slider {...settings}>
          {images.map((image, index) => (
            <div key={index} className="relative group">
              {/* Image */}
              <img src={image.src} alt={image.title} className="w-full h-96 object-cover rounded-lg" />
              
              {/* Overlay Content (Now with better visibility) */}
              <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-gray-900 bg-opacity-70 opacity-0 group-hover:opacity-70 transition-opacity duration-500 flex flex-col items-center justify-center text-white text-center p-6 rounded-lg">
                <h2 className="text-3xl font-extrabold text-white drop-shadow-lg">{image.title}</h2>
                <p className="mt-2 text-lg text-gray-200">{image.desc}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    );
  }
  
  export default ImageSlider;