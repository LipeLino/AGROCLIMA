"use client";

import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const slides = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1560493676-04071c5f467b?auto=format&fit=crop&q=80",
    alt: "Agricultural field with modern irrigation system"
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&q=80",
    alt: "Weather monitoring station in field"
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80",
    alt: "Agricultural technology and data monitoring"
  }
];

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, [currentSlide]);

  const nextSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      setTimeout(() => setIsTransitioning(false), 3000);
    }
  };

  const prevSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
      setTimeout(() => setIsTransitioning(false), 3000);
    }
  };

  return (
    <div className="relative min-h-[600px] bg-gradient-to-r from-[#003366] to-[#004080] text-white">
      <div className="absolute inset-0 bg-black/40 z-10" />
      
      <div className="container mx-auto min-h-[600px] flex flex-col lg:flex-row items-center relative z-20 px-4 py-12 lg:py-0">
        {/* Content Section */}
        <div className="w-full lg:w-[70%] lg:pr-8 mb-8 lg:mb-0">
          <h1 className="hero-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 lg:mb-8 leading-[1.2] py-2 shine-text">
            Informações Agrometeorológicas do Triângulo Mineiro Sul
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-100 max-w-2xl">
            Monitoramento em tempo real das condições climáticas para otimização da produção agrícola
          </p>
        </div>

        {/* Slideshow Section */}
        <div className="w-full lg:w-[40%] flex justify-center items-center">
          <div className="w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] lg:w-[550px] lg:h-[450px] relative overflow-hidden rounded-lg shadow-xl">
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={cn(
                  "absolute inset-0 transition-opacity duration-3000",
                  index === currentSlide ? "opacity-100" : "opacity-0"
                )}
              >
                <Image
                  src={slide.url}
                  alt={slide.alt}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
              </div>
            ))}

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/20 hover:bg-black/40 transition-colors z-30"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/20 hover:bg-black/40 transition-colors z-30"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </button>

            {/* Navigation Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-30">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (!isTransitioning) {
                      setIsTransitioning(true);
                      setCurrentSlide(index);
                      setTimeout(() => setIsTransitioning(false), 3000);
                    }
                  }}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all duration-300",
                    index === currentSlide
                      ? "bg-white w-4"
                      : "bg-white/50 hover:bg-white/75"
                  )}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 flex justify-center z-20">
        <ChevronDown className="w-12 h-12 animate-bounce text-white" />
      </div>
    </div>
  );
}