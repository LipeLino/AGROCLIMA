import { LatLngTuple } from 'leaflet';

export interface WeatherStation {
  id: string;
  name: string;
  city: string;
  state: string;
  deviceId: string;
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

export interface MonitoringState {
  lastUpdate: Date;
  selectedStation: string;
  connectionType: string;
  isLoading: boolean;
  error: string | null;
}