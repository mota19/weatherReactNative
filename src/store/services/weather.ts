import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface WeatherCondition {
  text: string;
  icon: string;
  code: number;
}

interface DayForecast {
  maxtemp_c: number;
  maxtemp_f: number;
  mintemp_c: number;
  mintemp_f: number;
  avgtemp_c: number;
  avgtemp_f: number;
  maxwind_mph: number;
  maxwind_kph: number;
  totalprecip_mm: number;
  totalprecip_in: number;
  totalsnow_cm: number;
  avgvis_km: number;
  avgvis_miles: number;
  avghumidity: number;
  daily_will_it_rain: number;
  daily_chance_of_rain: number;
  daily_will_it_snow: number;
  daily_chance_of_snow: number;
  condition: WeatherCondition;
  uv: number;
}

export interface ForecastDay {
  date: string;
  date_epoch: number;
  day: DayForecast;
}

export interface WeatherResponse {
  location: {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    tz_id: string;
    localtime: string;
  };
  current: {
    temp_c: number;
    condition: WeatherCondition;
  };
  forecast: {
    forecastday: ForecastDay[];
  };
}

export const weatherApi = createApi({
  reducerPath: "weatherApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://api.weatherapi.com/v1/",
  }),
  endpoints: (builder) => ({
    getWeather: builder.query<
      WeatherResponse,
      { lat: number; lon: number; days: number }
    >({
      query: ({ lat, lon, days }) =>
        `forecast.json?key=48f59367b1f84c6fa4c72306240909&q=${lat},${lon}&days=${days}`,
    }),
  }),
});

export const { useGetWeatherQuery } = weatherApi;
