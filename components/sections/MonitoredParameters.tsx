"use client";

import { Thermometer, Droplets, Wind, Sun, CloudRain, Waves } from "lucide-react";
import { DataParameter } from "@/components/ui/DataParameter";

export function MonitoredParameters() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-16 text-[#003366]">
          Parâmetros Monitorados
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          <DataParameter
            icon={<Thermometer className="w-8 h-8" />}
            label="Temperatura"
          />
          <DataParameter
            icon={<Droplets className="w-8 h-8" />}
            label="Umidade"
          />
          <DataParameter
            icon={<Wind className="w-8 h-8" />}
            label="Velocidade do Vento"
          />
          <DataParameter
            icon={<Sun className="w-8 h-8" />}
            label="Radiação Solar"
          />
          <DataParameter
            icon={<CloudRain className="w-8 h-8" />}
            label="Precipitação"
          />
          <DataParameter
            icon={<Waves className="w-8 h-8" />}
            label="Evapotranspiração"
          />
        </div>
      </div>
    </section>
  );
}