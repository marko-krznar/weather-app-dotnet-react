import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type { GeocodeLocation } from "../../types/geocode";
import type { ForecastChartProps, WeatherArgs, WeatherCurrentArgs, WeatherWidgetProps } from "../../types/weather";

export const weather = createApi({
	reducerPath: "weather",
	baseQuery: fetchBaseQuery({
		baseUrl: import.meta.env.VITE_API_BASE_URL,
		prepareHeaders: (headers) => {
			const token = localStorage.getItem("accessToken");
			if (token) {
				headers.set("Authorization", `Bearer ${token}`);
			}
			return headers;
		},
	}),
	endpoints: (builder) => ({
		getCurrentWeather: builder.query<WeatherWidgetProps, WeatherCurrentArgs>({
			query: ({ lat, lon, cityName }) => ({
				url: "/OpenWeather/current",
				method: "GET",
				params: {
					lat: lat,
					lon: lon,
					cityName: cityName,
				},
			}),
		}),
		getWeatherForFiveDays: builder.query<ForecastChartProps, WeatherArgs>({
			query: ({ lat, lon }) => ({
				url: "/OpenWeather/forecast",
				method: "GET",
				params: {
					lat: lat,
					lon: lon,
				},
			}),
		}),
		getCoordsByCityName: builder.query<Array<GeocodeLocation>, string>({
			query: (cityName) => ({
				url: "/OpenWeather/geocode",
				method: "GET",
				params: { q: cityName },
			}),
			keepUnusedDataFor: 0,
		}),
		getCoordsByCityNameOpenStreetMap: builder.query<Array<GeocodeLocation>, string>({
			query: (cityName) => ({
				url: `https://nominatim.openstreetmap.org/search?q=${cityName}&format=json`,
				method: "GET",
			}),
			keepUnusedDataFor: 0,
		}),
	}),
});

export const {
	useGetCurrentWeatherQuery,
	useLazyGetCurrentWeatherQuery,
	useGetWeatherForFiveDaysQuery,
	useLazyGetWeatherForFiveDaysQuery,
	useGetCoordsByCityNameQuery,
	useLazyGetCoordsByCityNameQuery,
	useGetCoordsByCityNameOpenStreetMapQuery,
	useLazyGetCoordsByCityNameOpenStreetMapQuery,
} = weather;
