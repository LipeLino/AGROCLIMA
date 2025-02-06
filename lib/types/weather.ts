import { LatLngTuple } from 'leaflet';

export interface WeatherStation {
  id: string;
  name: string;
  city: string;
  coordinates: LatLngTuple;
  data: WeatherData[];
}

export interface WeatherData {
  timestamp: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
  solarRadiation: number;
  precipitation: number;
  evapotranspiration: number;
}

export interface TimelineState {
  startDate: Date;
  endDate: Date;
  currentDate: Date;
}