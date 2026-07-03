import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
	WeatherArgs,
	WeatherWidgetProps,
} from "../../components/WeatherWidget";
import type { ForecastProps } from "../../components/WeatherForecast";

export const weather = createApi({
	reducerPath: "weather",
	baseQuery: fetchBaseQuery({
		baseUrl: import.meta.env.VITE_API_BASE_URL,
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
	}),
});

export const {
	useGetCurrentWeatherQuery,
	useLazyGetCurrentWeatherQuery,
	useGetWeatherForFiveDaysQuery,
	useLazyGetWeatherForFiveDaysQuery,
} = weather;
