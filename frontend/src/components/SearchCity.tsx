import Button from "@mui/material/Button";
import { useState } from "react";
import { useLazyGetCoordsByCityNameQuery } from "../redux/weather/weatherSlice";
import { setLocation } from "../redux/ui/uiSlice";
import { useDispatch } from "react-redux";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import CloseIcon from "@mui/icons-material/Close";

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
			const geoResult = await triggerGetCoordsByCityName(cityName.trim(), false).unwrap();

			if (geoResult && geoResult.length > 0) {
				const { lat, lon, name } = geoResult[0];
				dispatch(setLocation({ lat, lon, cityName: name }));
			}
		} catch (error) {
			console.error("Greška pri pretraživanju grada:", error);
		}
	};

	return (
		<Paper component="form" sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400 }}>
			<InputBase
				sx={{ ml: 1, flex: 1 }}
				placeholder="Unesi ime grada"
				inputProps={{ "aria-label": "unesi ime grada" }}
				value={cityName}
				onChange={handleChange}
			/>
			<IconButton
				type="button"
				sx={{ p: "10px" }}
				aria-label="search"
				disabled={!cityName.trim()}
				onClick={() => setCityName("")}
			>
				<CloseIcon />
			</IconButton>
			<Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
			<Button variant="text" onClick={handleSearch} disabled={!cityName.trim()}>
				Traži
			</Button>
		</Paper>
	);
}
