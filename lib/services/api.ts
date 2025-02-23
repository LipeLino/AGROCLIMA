import { WeatherData } from '@/lib/types/weather';

const API_BASE_URL = 'https://prod-api.plugfield.com.br';
const API_KEY = 'LFtc9EgwlJ5hErrluKss68gWrHjyBWiE6oWI8pqb';
const AUTH_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjI0OTgsImFjY291bnRJZCI6NjU4OTAsInVzZXJuYW1lIjoiam9hby5maXNjaGVyQHVlbWcuYnIiLCJpYXQiOjE3MzQzNjIzMzF9.nKzch3EVu-7vIFwGo-I6cBKrOnOsbhwcsJ1hWMTsGeU';

interface PlugfieldDataPoint {
  timestamp: string;
  value: number;
}

interface PlugfieldResponse {
  temperature: PlugfieldDataPoint[];
  humidity: PlugfieldDataPoint[];
  windSpeed: PlugfieldDataPoint[];
  solarRadiation: PlugfieldDataPoint[];
  rain: PlugfieldDataPoint[];
  etc: PlugfieldDataPoint[];
}

export async function fetchWeatherData(deviceId: string, startDate: Date, endDate: Date): Promise<WeatherData[]> {
  const formatDate = (date: Date) => {
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}`;
  };

  try {
    const url = `${API_BASE_URL}/data/hourly?device=${deviceId}&begin=${encodeURIComponent(formatDate(startDate))}&end=${encodeURIComponent(formatDate(endDate))}`;
    console.log('Fetching data from:', url);

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'x-api-key': API_KEY,
        'Authorization': AUTH_TOKEN,
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`);
    }

    const data: PlugfieldResponse = await response.json();
    
    if (!data || !data.temperature || !Array.isArray(data.temperature)) {
      console.error('Invalid API response format:', data);
      throw new Error('Invalid API response format');
    }

    // Create a map of timestamps to aggregate data points
    const dataMap = new Map<string, WeatherData>();

    // Process each data type and add to the map
    data.temperature?.forEach(item => {
      if (!dataMap.has(item.timestamp)) {
        dataMap.set(item.timestamp, {
          timestamp: item.timestamp,
          temperature: 0,
          humidity: 0,
          windSpeed: 0,
          solarRadiation: 0,
          precipitation: 0,
          evapotranspiration: 0,
        });
      }
      dataMap.get(item.timestamp)!.temperature = item.value;
    });

    data.humidity?.forEach(item => {
      if (dataMap.has(item.timestamp)) {
        dataMap.get(item.timestamp)!.humidity = item.value;
      }
    });

    data.windSpeed?.forEach(item => {
      if (dataMap.has(item.timestamp)) {
        dataMap.get(item.timestamp)!.windSpeed = item.value;
      }
    });

    data.solarRadiation?.forEach(item => {
      if (dataMap.has(item.timestamp)) {
        dataMap.get(item.timestamp)!.solarRadiation = item.value;
      }
    });

    data.rain?.forEach(item => {
      if (dataMap.has(item.timestamp)) {
        dataMap.get(item.timestamp)!.precipitation = item.value;
      }
    });

    data.etc?.forEach(item => {
      if (dataMap.has(item.timestamp)) {
        dataMap.get(item.timestamp)!.evapotranspiration = item.value;
      }
    });

    // Convert map to array and sort by timestamp
    const weatherData = Array.from(dataMap.values()).sort((a, b) => 
      new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );

    if (weatherData.length === 0) {
      throw new Error('No data available for the specified time range');
    }

    return weatherData;
  } catch (error) {
    console.error('API Error:', error instanceof Error ? error.message : 'Unknown error');
    // Return mock data for development
    return Array.from({ length: 24 }, (_, i) => ({
      timestamp: new Date(startDate.getTime() + i * 3600000).toISOString(),
      temperature: 24.5 + Math.random() * 5,
      humidity: 65 + Math.random() * 10,
      windSpeed: 12 + Math.random() * 5,
      solarRadiation: 850 + Math.random() * 100,
      precipitation: Math.random() * 2,
      evapotranspiration: 4.2 + Math.random(),
    }));
  }
}