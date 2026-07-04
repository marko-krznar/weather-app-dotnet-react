import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useLazyGetCoordsByCityNameQuery } from "../redux/weather/weatherSlice";
import { setLocation } from "../redux/ui/uiSlice";
import { useDispatch } from "react-redux";

export default function SearchCity() {
	const [cityName, setCityName] = useState("");
	const [triggerGetCoordsByCityName] = useLazyGetCoordsByCityNameQuery();
	const dispatch = useDispatch();

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setCityName(event.target.value);
	};

	const handleSearch = async () => {
		if (!cityName.trim()) return;

		try {
			// Prisiljavamo mrežni zahtjev i zaobilazimo cache
			const geoResult = await triggerGetCoordsByCityName(
				cityName.trim(),
				false
			).unwrap();

			if (geoResult && geoResult.length > 0) {
				const { lat, lon, name } = geoResult[0];
				// Spremamo pravo ime grada koje je vratio OpenWeather
				dispatch(setLocation({ lat, lon, cityName: name }));
			}
		} catch (error) {
			console.error("Greška pri pretraživanju grada:", error);
		}
	};

	return (
		<div style={{ display: "flex", gap: "10px", margin: "20px 0" }}>
			<TextField
				value={cityName}
				onChange={handleChange}
				placeholder="Pretraži..."
				variant="outlined"
				size="small"
			/>
			<Button
				variant="contained"
				onClick={handleSearch}
				disabled={!cityName.trim()}
			>
				Traži
			</Button>
		</div>
	);
}
