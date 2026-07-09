import { createApi } from "@reduxjs/toolkit/query/react";
import type { GeocodeLocation } from "../../types/geocode";
import type { ForecastChartProps, WeatherArgs, WeatherCurrentArgs, WeatherWidgetProps } from "../../types/weather";
import { baseQueryWithReauth } from "../baseQueryWithReauth";

export const weather = createApi({
	reducerPath: "weather",
	baseQuery: baseQueryWithReauth,
	endpoints: (builder) => ({
		getCurrentWeather: builder.query<WeatherWidgetProps, WeatherCurrentArgs>({
			query: ({ lat, lon }) => ({
				url: "/OpenWeather/current",
				method: "GET",
				params: {
					lat: lat,
					lon: lon,
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
