"use client";

import { useState, useEffect } from "react";
import { Thermometer, Droplets, Wind, Sun, CloudRain, Waves } from "lucide-react";

interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  solarRadiation: number;
  precipitation: number;
  evapotranspiration: number;
}

interface DataParameterProps {
  icon: React.ReactNode;
  label: string;
  value?: number;
  unit?: string;
}

export function DataParameter({ icon, label, value, unit }: DataParameterProps) {
  return (
    <div className="flex flex-col items-center p-6 bg-gray-50 rounded-lg hover:shadow-md transition-shadow">
      {icon}
      <h3 className="mt-4 text-sm font-medium text-gray-900">{label}</h3>
      {value !== undefined ? (
        <p className="mt-2 text-lg font-semibold">
          {value.toFixed(1)}{unit}
        </p>
      ) : (
        <p className="mt-2 text-lg font-semibold text-gray-400">
          Carregando...
        </p>
      )}
    </div>
  );
}

export function MonitoredParameters() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://prod-api.plugfield.com.br/data/hourly?device=3424&begin=10%2F01%2F2025%2000&end=07%2F02%2F2025%2000', {
          headers: {
            'Accept': 'application/json',
            'x-api-key': 'LFtc9EgwlJ5hErrluKss68gWrHjyBWiE6oWI8pqb',
            'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjI0OTgsImFjY291bnRJZCI6NjU4OTAsInVzZXJuYW1lIjoiam9hby5maXNjaGVyQHVlbWcuYnIiLCJpYXQiOjE3MzQzNjIzMzF9.nKzch3EVu-7vIFwGo-I6cBKrOnOsbhwcsJ1hWMTsGeU'
          }
        });
        const data = await response.json();
        
        // Assuming the API returns the latest values in the data
        // Adjust according to actual API response structure
        setWeatherData({
          temperature: data.temperature,
          humidity: data.humidity,
          windSpeed: data.windSpeed,
          solarRadiation: data.solarRadiation,
          precipitation: data.precipitation,
          evapotranspiration: data.evapotranspiration
        });
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchData();
  }, []);

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
            value={weatherData?.temperature}
            unit="°C"
          />
          <DataParameter
            icon={<Droplets className="w-8 h-8" />}
            label="Umidade"
            value={weatherData?.humidity}
            unit="%"
          />
          <DataParameter
            icon={<Wind className="w-8 h-8" />}
            label="Velocidade do Vento"
            value={weatherData?.windSpeed}
            unit="km/h"
          />
          <DataParameter
            icon={<Sun className="w-8 h-8" />}
            label="Radiação Solar"
            value={weatherData?.solarRadiation}
            unit="W/m²"
          />
          <DataParameter
            icon={<CloudRain className="w-8 h-8" />}
            label="Precipitação"
            value={weatherData?.precipitation}
            unit="mm"
          />
          <DataParameter
            icon={<Waves className="w-8 h-8" />}
            label="Evapotranspiração"
            value={weatherData?.evapotranspiration}
            unit="mm"
          />
        </div>
      </div>
    </section>
  );
}