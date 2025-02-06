"use client";

import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { WeatherMap } from "@/components/dashboard/WeatherMap";
import { Card } from "@/components/ui/card";
import {
  Thermometer,
  Droplets,
  Wind,
  Sun,
  CloudRain,
  Waves,
} from "lucide-react";

const parameters = [
  { icon: Thermometer, label: "Temperatura", value: "24°C" },
  { icon: Droplets, label: "Umidade", value: "65%" },
  { icon: Wind, label: "Velocidade do Vento", value: "12 km/h" },
  { icon: Sun, label: "Radiação Solar", value: "850 W/m²" },
  { icon: CloudRain, label: "Precipitação", value: "0 mm" },
  { icon: Waves, label: "Evapotranspiração", value: "4.2 mm" },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {parameters.map((param) => (
            <Card key={param.label} className="p-4">
              <div className="flex items-center space-x-4">
                <param.icon className="w-8 h-8 text-[#003366]" />
                <div>
                  <p className="text-sm text-gray-500">{param.label}</p>
                  <p className="text-xl font-semibold">{param.value}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
        <WeatherMap />
      </main>
    </div>
  );
}