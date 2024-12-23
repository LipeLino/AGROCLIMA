"use client";

import { ChevronDown } from "lucide-react";
import Image from "next/image";

export function HeroSection() {
  return (
    <div className="relative h-[600px] bg-gradient-to-r from-[#003366] to-[#004080] text-white">
      <div className="absolute inset-0 bg-black/40" />
      <Image
        src="https://images.unsplash.com/photo-1560493676-04071c5f467b?auto=format&fit=crop&q=80"
        alt="Agricultural field"
        fill
        className="object-cover z-[-1]"
      />
      <div className="container mx-auto px-4 h-full flex flex-col justify-center relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 max-w-4xl shine-text">
          Informações Agrometeorológicas do Triângulo Mineiro Sul
        </h1>
        <p className="text-xl md:text-2xl max-w-2xl text-gray-100">
          Monitoramento em tempo real das condições climáticas para otimização da produção agrícola
        </p>
      </div>
      <div className="absolute bottom-0 left-0 right-0 flex justify-center">
        <ChevronDown className="w-12 h-12 animate-bounce text-white" />
      </div>
    </div>
  );
}