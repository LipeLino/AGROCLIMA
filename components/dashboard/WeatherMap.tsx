"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { TimelineControl } from "./TimelineControl";
import { WeatherStation, TimelineState, WeatherData } from "@/lib/types/weather";
import { fetchWeatherData } from "@/lib/services/api";
import { weatherStations } from "@/lib/data/stations";

const MapComponent = dynamic(() => import("./MapComponent"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[600px] bg-gray-100 animate-pulse flex items-center justify-center">
      <p className="text-gray-500">Carregando mapa...</p>
    </div>
  ),
});

interface WeatherMapProps {
  selectedStation: string;
  onStationChange: (stationId: string) => void;
}

export function WeatherMap({ selectedStation, onStationChange }: WeatherMapProps) {
  const [timelineState, setTimelineState] = useState<TimelineState>({
    startDate: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000),
    endDate: new Date(),
    currentDate: new Date(),
  });
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);

  const loadWeatherData = async (stationId: string) => {
    try {
      const station = weatherStations.find(s => s.id === stationId);
      if (!station) throw new Error("Estação não encontrada");

      const data = await fetchWeatherData(
        station.deviceId,
        timelineState.startDate,
        timelineState.endDate
      );
      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  useEffect(() => {
    loadWeatherData(selectedStation);
  }, [selectedStation, timelineState.startDate, timelineState.endDate]);

  const handleTimeChange = (date: Date) => {
    if (weatherData.length > 0) {
      const selectedTime = date.getTime();
      const closestData = weatherData.reduce((prev, curr) => {
        const prevDiff = Math.abs(new Date(prev.timestamp).getTime() - selectedTime);
        const currDiff = Math.abs(new Date(curr.timestamp).getTime() - selectedTime);
        return prevDiff < currDiff ? prev : curr;
      });
      console.log('Selected data:', closestData);
    }
  };

  const handleExportData = () => {
    if (weatherData.length === 0) return;

    const headers = [
      "Data/Hora",
      "Temperatura (°C)",
      "Umidade (%)",
      "Velocidade do Vento (km/h)",
      "Radiação Solar (W/m²)",
      "Precipitação (mm)",
      "Evapotranspiração (mm)",
    ];

    const csvContent = [
      headers.join(","),
      ...weatherData.map(data => [
        new Date(data.timestamp).toLocaleString(),
        data.temperature.toFixed(1),
        data.humidity.toFixed(1),
        data.windSpeed.toFixed(1),
        data.solarRadiation.toFixed(1),
        data.precipitation.toFixed(1),
        data.evapotranspiration.toFixed(1),
      ].join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `dados_meteorologicos_${timelineState.startDate.toISOString().split('T')[0]}_${timelineState.endDate.toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-4">
      <TimelineControl
        timelineState={timelineState}
        setTimelineState={setTimelineState}
        onTimeChange={handleTimeChange}
        onExportData={handleExportData}
      />
      <div className="w-full h-[600px] rounded-lg overflow-hidden shadow-lg">
        <MapComponent
          selectedDate={timelineState.currentDate}
          onStationSelect={onStationChange}
          selectedStation={selectedStation}
        />
      </div>
    </div>
  );
}