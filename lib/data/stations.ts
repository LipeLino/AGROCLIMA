import { WeatherStation } from "@/lib/types/weather";
import { LatLngTuple } from "leaflet";

export const weatherStations: Omit<WeatherStation, 'data'>[] = [
  {
    id: "sao-francisco-sales",
    name: "São Francisco de Sales",
    city: "São Francisco de Sales",
    state: "MG",
    deviceId: "3424",
    coordinates: [-19.8612, -49.7689] as LatLngTuple,
  },
  {
    id: "prata",
    name: "Prata",
    city: "Prata",
    state: "MG",
    deviceId: "4971",
    coordinates: [-19.3088, -48.9276] as LatLngTuple,
  },
];