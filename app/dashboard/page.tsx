"use client";

import { useEffect, useState } from "react";
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
import { fetchWeatherData } from "@/lib/services/api";
import { WeatherData } from "@/lib/types/weather";

export default function DashboardPage() {
  const [currentData, setCurrentData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCurrentData = async () => {
      try {
        const endDate = new Date();
        const startDate = new Date(endDate.getTime() - 1 * 60 * 60 * 1000); // 1 hour ago
        const data = await fetchWeatherData("3424", startDate, endDate);
        if (data.length > 0) {
          setCurrentData(data[data.length - 1]);
        }
      } catch (error) {
        console.error('Error fetching weather data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCurrentData();
  }, []);

  const parameters = [
    { icon: Thermometer, label: "Temperatura", value: currentData ? `${currentData.temperature.toFixed(1)}°C` : "..." },
    { icon: Droplets, label: "Umidade", value: currentData ? `${currentData.humidity.toFixed(1)}%` : "..." },
    { icon: Wind, label: "Velocidade do Vento", value: currentData ? `${currentData.windSpeed.toFixed(1)} km/h` : "..." },
    { icon: Sun, label: "Radiação Solar", value: currentData ? `${currentData.solarRadiation.toFixed(1)} W/m²` : "..." },
    { icon: CloudRain, label: "Precipitação", value: currentData ? `${currentData.precipitation.toFixed(1)} mm` : "..." },
    { icon: Waves, label: "Evapotranspiração", value: currentData ? `${currentData.evapotranspiration.toFixed(1)} mm` : "..." },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {parameters.map((param) => (
            <Card key={param.label} className={`p-4 ${loading ? 'animate-pulse' : ''}`}>
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