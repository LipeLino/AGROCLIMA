import { WeatherStation } from "@/lib/types/weather";
import { LatLngTuple } from "leaflet";

export const weatherStations: Omit<WeatherStation, 'data'>[] = [
  {
    id: "frutal",
    name: "Estação Central",
    city: "Frutal",
    coordinates: [-20.0333, -48.9356] as LatLngTuple,
  },
  {
    id: "uberaba",
    name: "Estação Norte",
    city: "Uberaba",
    coordinates: [-19.7472, -47.9389] as LatLngTuple,
  },
  {
    id: "uberlandia",
    name: "Estação Leste",
    city: "Uberlândia",
    coordinates: [-18.9186, -48.2772] as LatLngTuple,
  },
  {
    id: "iturama",
    name: "Estação Oeste",
    city: "Iturama",
    coordinates: [-19.7289, -50.1967] as LatLngTuple,
  },
];