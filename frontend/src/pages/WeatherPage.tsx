import { useSelector } from "react-redux";
import Navigation from "../components/Navigation";
import SearchCity from "../components/SearchCity";
import WeatherForecast from "../components/WeatherForecast";
import WeatherWidget from "../components/WeatherWidget";
import type { RootStore } from "../redux/store";
import {
	useGetCurrentWeatherQuery,
	useGetWeatherForFiveDaysQuery,
} from "../redux/weather/weatherSlice";

export default function WeatherPage() {
	const { lat, lon } = useSelector((state: RootStore) => state.ui);
	const hasCoords = lat !== null && lon !== null;

	const { data: currentWeather } = useGetCurrentWeatherQuery(
		{ lat: lat!, lon: lon! },
		{ skip: !hasCoords }
	);

	const { data: forecast } = useGetWeatherForFiveDaysQuery(
		{ lat: lat!, lon: lon! },
		{ skip: !hasCoords }
	);

	return (
		<>
			<Navigation />
			<SearchCity />
			{currentWeather && (
				<WeatherWidget
					name={currentWeather.name}
					weather={currentWeather.weather}
					main={currentWeather.main}
					wind={currentWeather.wind}
				/>
			)}
			{forecast && <WeatherForecast forecast={forecast} />}
		</>
	);
}
