import Navigation from "../components/Navigation";
import WeatherForecast from "../components/WeatherForecast";
import WeatherWidget from "../components/WeatherWidget";
import {
	useGetCurrentWeatherQuery,
	useGetWeatherForFiveDaysQuery,
} from "../redux/weather/weatherSlice";

export default function WeatherPage() {
	const {
		data: currentWeather,
		isLoading: currentLoading,
		isError: currentError,
	} = useGetCurrentWeatherQuery({
		lat: 52.2297,
		lon: 21.0122,
	});

	const {
		data: forecast,
		isLoading: forecastLoading,
		isError: forecastError,
	} = useGetWeatherForFiveDaysQuery({
		lat: 52.2297,
		lon: 21.0122,
	});

	console.log(currentLoading, currentError, forecastLoading, forecastError);
	console.log("forecast", forecast);

	return (
		<>
			<Navigation />
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
