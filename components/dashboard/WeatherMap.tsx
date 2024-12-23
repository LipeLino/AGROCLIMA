"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { TimelineControl } from "./TimelineControl";
import { WeatherStation, TimelineState } from "@/lib/types/weather";

const MapComponent = dynamic(() => import("./MapComponent"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[600px] bg-gray-100 animate-pulse flex items-center justify-center">
      <p className="text-gray-500">Carregando mapa...</p>
    </div>
  ),
});

export function WeatherMap() {
  const [timelineState, setTimelineState] = useState<TimelineState>({
    startDate: new Date(2024, 0, 1),
    endDate: new Date(),
    currentDate: new Date(),
  });

  const handleTimeChange = (date: Date) => {
    // Update map data based on the selected date
    console.log("Time changed:", date);
  };

  const handleStationSelect = (stationId: string) => {
    // Handle station selection
    console.log("Selected station:", stationId);
  };

  const handleExportData = () => {
    // Generate CSV data
    const csvContent = "data:text/csv;charset=utf-8,";
    // Add CSV generation logic here
    
    // Create download link
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "weather_data.csv");
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
          onStationSelect={handleStationSelect}
        />
      </div>
    </div>
  );
}