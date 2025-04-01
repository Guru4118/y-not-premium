import React from 'react';
import Navbar from './Navbar';
import abt from './assets/about.jpg';
import QuickLinks from './Quicklinks';
import ImageSlider from './ImageSlider';

function AboutUs() {
  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <Navbar />

      <div className="flex flex-col items-center p-10">
        <img className="rounded-full w-full md:w-3/4 lg:w-[60%] mx-auto shadow-lg hover:scale-105 transition transform-all duration-500 " src={abt} alt="About Y-NOT" />

        <h1 className="text-4xl font-bold mt-6">About Y-NOT Premium Wears</h1>
        <p className="mt-4 text-lg text-center max-w-2xl">
          At Y-NOT, we redefine fashion with bold elegance, superior craftsmanship, and limitless confidence. Step into a world where trendsetting meets timeless style.
        </p>
      </div>

      <ImageSlider/>

     
      <QuickLinks/>
    </div>
  );
}

export default AboutUs;
