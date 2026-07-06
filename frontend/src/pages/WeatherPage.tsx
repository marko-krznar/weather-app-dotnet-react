import { useSelector } from "react-redux";
import SearchCity from "../components/SearchCity";
import WeatherWidget from "../components/weather/WeatherWidget";
import ForecastSection from "../components/weather/ForecastSection";
import type { RootStore } from "../redux/store";
import { useGetCurrentWeatherQuery, useGetWeatherForFiveDaysQuery } from "../redux/weather/weatherSlice";
import type { ApiForecastItem } from "../types/weather";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

export default function WeatherPage() {
	const { lat, lon } = useSelector((state: RootStore) => state.ui);
	const hasCoords = lat !== null && lon !== null && (lat !== 0 || lon !== 0);
	const token = localStorage.getItem("accessToken");

	const { data: currentWeather } = useGetCurrentWeatherQuery(
		{ lat: lat!, lon: lon! },
		{ skip: !hasCoords || !token }
	);

	const { data: forecast } = useGetWeatherForFiveDaysQuery({ lat: lat!, lon: lon! }, { skip: !hasCoords || !token });

	const apiList = forecast && "list" in forecast ? (forecast.list as ApiForecastItem[]) : [];

	return (
		<>
			<Box sx={{ mb: 2 }}>
				<Typography variant="h4" component="h1" gutterBottom>
					Vremenska Prognoza
				</Typography>
				<Typography variant="body1">
					Pretražite trenutne vremenske uvjete za odabrani grad i pregledajte detaljnu petodnevnu prognozu uz
					mogućnost filtriranja temperature i datuma.
				</Typography>
			</Box>
			<SearchCity />
			<Stack spacing={4} sx={{ mt: 4 }}>
				{currentWeather && (
					<WeatherWidget
						name={currentWeather.name}
						weather={currentWeather.weather}
						main={currentWeather.main}
						wind={currentWeather.wind}
					/>
				)}
				{forecast && currentWeather && <ForecastSection apiList={apiList} cityName={currentWeather.name} />}
			</Stack>
		</>
	);
}
