import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
	WeatherArgs,
	WeatherWidgetProps,
} from "../../components/WeatherWidget";
import type { ForecastProps } from "../../components/WeatherForecast";
import type { GeocodeLocation } from "../../types/geocode";

export const weather = createApi({
	reducerPath: "weather",
	baseQuery: fetchBaseQuery({
		baseUrl: import.meta.env.VITE_API_BASE_URL,
		prepareHeaders: (headers) => {
			const token = localStorage.getItem("token");
			if (token) {
				headers.set("authorization", `Bearer ${token}`);
			}
			return headers;
		},
	}),
	endpoints: (builder) => ({
		getCurrentWeather: builder.query<WeatherWidgetProps, WeatherArgs>({
			query: ({ lat = 52.2297, lon = 21.0122 }) => ({
				url: "/OpenWeather/current",
				method: "GET",
				params: {
					lat: lat,
					lon: lon,
				},
			}),
		}),
		getWeatherForFiveDays: builder.query<ForecastProps, WeatherArgs>({
			query: ({ lat = 52.2297, lon = 21.0122 }) => ({
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
} = weather;
