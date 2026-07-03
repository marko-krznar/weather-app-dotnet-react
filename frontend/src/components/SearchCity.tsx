import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import {
	useLazyGetCoordsByCityNameQuery,
	// useLazyGetCurrentWeatherQuery,
	// useLazyGetWeatherForFiveDaysQuery,
} from "../redux/weather/weatherSlice";
import { setLocation } from "../redux/ui/uiSlice";
import { useDispatch } from "react-redux";

export default function SearchCity() {
	const [cityName, setCityName] = useState("");
	const [triggerGetCoordsByCityName] = useLazyGetCoordsByCityNameQuery();
	const dispatch = useDispatch();
	// const [triggerFetchWeather] = useLazyGetCurrentWeatherQuery();
	// const [triggerFetchWeatherForFiveDays] =
	// 	useLazyGetWeatherForFiveDaysQuery();

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setCityName(event.target.value);
	};

	const handleSearch = async () => {
		try {
			const geoResult = await triggerGetCoordsByCityName(
				cityName
			).unwrap();

			if (geoResult && geoResult.length > 0) {
				const { lat, lon } = geoResult[0];
				dispatch(setLocation({ lat, lon, cityName: cityName }));
				// await Promise.all([
				// 	triggerFetchWeather({ lat, lon }).unwrap(),
				// 	triggerFetchWeatherForFiveDays({ lat, lon }).unwrap(),
				// ]);
			}
		} catch {
			// Empty! The GlobalError component will handle displaying the message on the screen.
			// This catch here only serves to prevent an "Uncaught error" in the console.
		}
	};

	return (
		<>
			<TextField
				value={cityName}
				onChange={handleChange}
				placeholder="Pretraži..."
				variant="outlined"
			/>

			<Button
				variant="contained"
				onClick={handleSearch}
				disabled={!cityName.trim()}
			>
				Traži
			</Button>
		</>
	);
}
