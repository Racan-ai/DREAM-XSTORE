import React, { useState, useEffect } from "react";
import { Button } from "../../../../components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const TrendingFashionCarousel = (): JSX.Element => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Product data with different background colors
  const products = [
    {
      id: 1,
      brand: "Polo Ralph Lauren",
      title: "CUSTOM FIT LINEN SHIRT - Shirt",
      price: "£180.00",
      priceNote: "VAT include",
      image: "https://i.postimg.cc/SKVGwHVg/Screenshot-2025-07-04-213323-removebg-preview.png",
      backgroundColor: "#f5f5f5",
      colorDot: "#A8A8C4",
      link: "https://dreamxworld.com/Item_display?id=68642852a2c7bdb44ef7b77b"
    },
    {
      id: 2,
      brand: "Polo Ralph Lauren",
      title: "CUSTOM FIT LINEN SHIRT - Shirt",
      price: "£180.00",
      priceNote: "VAT include",
      image: "https://i.postimg.cc/DyNHK0CN/c43d229b4b06d599a5f55dde846bdf8b-removebg-preview.png",
      backgroundColor: "#ffeaea",
      colorDot: "#dc2626",
      link: "https://www.zalando.co.uk/polo-ralph-lauren/"
    },
    {
      id: 3,
      brand: "Polo Ralph Lauren",
      title: "CUSTOM FIT LINEN SHIRT - Shirt",
      price: "£180.00",
      priceNote: "VAT include",
      image: "https://i.postimg.cc/CL0ds16s/beb37d8dbbeccdd5c7b1f2afb47ebae2-removebg-preview.png",
      backgroundColor: "#e0f2fe",
      colorDot: "#0284c7",
      link: "https://www.zalando.co.uk/polo-ralph-lauren/"
    }
  ];

  const currentProduct = products[currentSlide];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % products.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + products.length) % products.length);
  };

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      className="relative w-full h-[500px] sm:h-[550px] md:h-[600px] lg:h-[550px] xl:h-[600px] border border-solid border-[#004d84] transition-colors duration-700 ease-in-out overflow-hidden"
      style={{ backgroundColor: currentProduct.backgroundColor }}
    >
      {/* Navigation Arrows */}
      <Button
        onClick={prevSlide}
        className="absolute w-[40px] h-[40px] sm:w-[45px] sm:h-[45px] md:w-[50px] md:h-[50px] lg:w-[68px] lg:h-[68px] top-1/2 -translate-y-1/2 left-4 sm:left-6 md:left-8 lg:left-[60px] xl:left-[80px] bg-[#dbdbdb33] hover:bg-[#dbdbdb66] rounded-full shadow-[0px_4px_10px_#00000040] flex items-center justify-center p-0 border-0 transition-all duration-300 hover:scale-110 z-10"
      >
        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 md:w-5 md:h-5 lg:w-7 lg:h-7 text-gray-700" />
      </Button>

      <Button
        onClick={nextSlide}
        className="absolute w-[40px] h-[40px] sm:w-[45px] sm:h-[45px] md:w-[50px] md:h-[50px] lg:w-[68px] lg:h-[68px] top-1/2 -translate-y-1/2 right-4 sm:right-6 md:right-8 lg:right-[60px] xl:right-[80px] bg-[#dbdbdb33] hover:bg-[#dbdbdb66] rounded-full shadow-[0px_4px_10px_#00000040] flex items-center justify-center p-0 border-0 transition-all duration-300 hover:scale-110 z-10"
      >
        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-5 md:h-5 lg:w-7 lg:h-7 text-gray-700" />
      </Button>

      {/* Desktop Layout */}
      <div className="hidden lg:flex items-center h-full">
        {/* Product Image - Left Side */}
        <div className="w-1/2 flex justify-center items-center">
          <div className="relative w-[300px] h-[300px] xl:w-[350px] xl:h-[350px] 2xl:w-[400px] 2xl:h-[400px]">
            <img
              src={currentProduct.image}
              alt={currentProduct.title}
              className="w-full h-full object-contain transition-all duration-700 ease-in-out"
            />
          </div>
        </div>

        {/* Product Information - Right Side */}
        <div className="w-1/2 flex flex-col justify-center">
          {/* Brand and Title */}
          <div className="space-y-2 mb-6">
            <a
              href={currentProduct.link}
              rel="noopener noreferrer"
              target="_blank"
              className="block font-['Poppins',Helvetica] font-normal text-black text-2xl xl:text-3xl 2xl:text-[36px] leading-tight hover:underline transition-all duration-300"
            >
              {currentProduct.brand}
            </a>
            <h3 className="font-['Poppins',Helvetica] font-normal text-black text-2xl xl:text-3xl 2xl:text-[36px] leading-tight">
              {currentProduct.title}
            </h3>
          </div>

          {/* Price */}
          <div className="font-['Inter',Helvetica] font-medium text-[#ff4d4d] text-lg xl:text-xl mb-6">
            {currentProduct.price}
            <span className="ml-1">{currentProduct.priceNote}</span>
          </div>

          {/* Shop Now Button */}
          <div className="mb-6">
            <Button className="w-[200px] h-[60px] xl:w-[240px] xl:h-[70px] bg-white rounded-[30px] xl:rounded-[35px] border-2 border-solid border-black hover:bg-gray-50 transition-all duration-300 hover:scale-105">
              <span className="font-['Inter',Helvetica] font-medium text-black text-xl xl:text-2xl [-webkit-text-stroke:1px_#000000]">
                Shop Now
              </span>
            </Button>
          </div>

          {/* Color Selector */}
          <div 
            className="w-[50px] h-[50px] xl:w-[60px] xl:h-[60px] rounded-full border-2 border-gray-300 transition-colors duration-700 ease-in-out"
            style={{ backgroundColor: currentProduct.colorDot }}
          />
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden flex flex-col h-full">
        {/* Product Image - Top */}
        <div className="flex justify-center items-center pt-6 sm:pt-8 pb-4 sm:pb-6">
          <div className="relative w-[200px] h-[200px] sm:w-[240px] sm:h-[240px] md:w-[280px] md:h-[280px]">
            <img
              src={currentProduct.image}
              alt={currentProduct.title}
              className="w-full h-full object-contain transition-all duration-700 ease-in-out"
            />
          </div>
        </div>

        {/* Product Information - Bottom */}
        <div className="flex-1 space-y-4 sm:space-y-6">
          {/* Brand and Title - Centered */}
          <div className="text-center space-y-1 sm:space-y-2">
            <a
              href={currentProduct.link}
              rel="noopener noreferrer"
              target="_blank"
              className="block font-['Poppins',Helvetica] font-normal text-black text-xl sm:text-2xl md:text-3xl leading-tight hover:underline transition-all duration-300"
            >
              {currentProduct.brand}
            </a>
            <h3 className="font-['Poppins',Helvetica] font-normal text-black text-xl sm:text-2xl md:text-3xl leading-tight">
              {currentProduct.title}
            </h3>
          </div>

          {/* Price - Centered */}
          <div className="text-center font-['Inter',Helvetica] font-medium text-[#ff4d4d] text-lg sm:text-xl">
            {currentProduct.price}
            <span className="ml-1">{currentProduct.priceNote}</span>
          </div>

          {/* Button and Color Dot Row - Centered */}
          <div className="flex items-center justify-center gap-4 sm:gap-6 pt-2">
            <Button className="w-[160px] h-[50px] sm:w-[200px] sm:h-[55px] md:w-[220px] md:h-[60px] bg-white rounded-[25px] sm:rounded-[30px] border-2 border-solid border-black hover:bg-gray-50 transition-all duration-300 hover:scale-105">
              <span className="font-['Inter',Helvetica] font-medium text-black text-base sm:text-lg md:text-xl [-webkit-text-stroke:1px_#000000]">
                Shop Now
              </span>
            </Button>

            <div 
              className="w-[40px] h-[40px] sm:w-[45px] sm:h-[45px] md:w-[50px] md:h-[50px] rounded-full border-2 border-gray-300 transition-colors duration-700 ease-in-out flex-shrink-0"
              style={{ backgroundColor: currentProduct.colorDot }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};