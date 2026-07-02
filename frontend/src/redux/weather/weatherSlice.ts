import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const weather = createApi({
	reducerPath: "weather",
	baseQuery: fetchBaseQuery({
		baseUrl: import.meta.env.VITE_WEATHER_API_BASE_URL,
	}),
	endpoints: (builder) => ({
		// Endpoint za dohvat trenutnog vremena prema imenu grada
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		getCurrentWeather: builder.query<any, any>({
			query: ({ lat = 52.2297, lon = 21.0122 }) => ({
				url: "/weather",
				method: "GET",
				params: {
					lat: lat,
					lon: lon,
					units: "metric",
					lang: "en", // Možeš staviti "hr" ako želiš hrvatski opis
					appid: import.meta.env.VITE_WEATHER_API_KEY, // Tvoj API ključ iz .env datoteke
				},
			}),
		}),
	}),
});

// RTK Query automatski generira ovaj hook
export const { useGetCurrentWeatherQuery } = weather;
