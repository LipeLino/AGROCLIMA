"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon, LatLngTuple } from "leaflet";
import { WeatherStation } from "@/lib/types/weather";
import { weatherStations } from "@/lib/data/stations";

interface MapComponentProps {
  selectedDate: Date;
  onStationSelect: (stationId: string) => void;
}

// Move icon initialization outside component to prevent recreation
const customIcon = new Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export default function MapComponent({ selectedDate, onStationSelect }: MapComponentProps) {
  const [isClient, setIsClient] = useState(false);
  const center: LatLngTuple = [-19.8833, -48.5000];

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="w-full h-full bg-gray-100 animate-pulse flex items-center justify-center">
        <p className="text-gray-500">Carregando mapa...</p>
      </div>
    );
  }

  return (
    <MapContainer
      center={center}
      zoom={9}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
        maxZoom={20}
        subdomains={["mt0", "mt1", "mt2", "mt3"]}
        attribution="&copy; Google Maps"
      />
      {weatherStations.map((station) => (
        <Marker
          key={station.id}
          position={station.coordinates}
          icon={customIcon}
          eventHandlers={{
            click: () => onStationSelect(station.id),
          }}
        >
          <Popup>
            <div className="text-center">
              <h3 className="font-semibold">{station.name}</h3>
              <p className="text-sm text-gray-600">{station.city}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}