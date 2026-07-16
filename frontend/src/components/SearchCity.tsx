import Button from "@mui/material/Button";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setLocation } from "../redux/ui/uiSlice";
import { useLazyGetCoordsByCityNameQuery } from "../redux/weather/weatherSlice";

export default function SearchCity() {
	const [cityName, setCityName] = useState("");
	const [triggerGetCoordsByCityName] = useLazyGetCoordsByCityNameQuery();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setCityName(event.target.value);
	};

	const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (!cityName.trim()) return;

		try {
			const geoResult = await triggerGetCoordsByCityName(cityName.trim(), false).unwrap();

			if (geoResult && geoResult.length > 0) {
				const { lat, lon, name } = geoResult[0];
				const safeCityName = encodeURIComponent(name);
				dispatch(setLocation({ lat: lat, lon: lon, cityName: safeCityName }));
				navigate(`/${lat}/${lon}/${safeCityName}`);
				setCityName("");
			}
		} catch (error) {
			console.error("Greška pri pretraživanju grada:", error);
		}
	};

	return (
		<Box
			component="form"
			onSubmit={handleSubmit}
			sx={{
				display: "flex",
				alignItems: "center",
				width: 400,
				border: "1px solid",
				borderColor: "divider",
				borderRadius: 1,
				paddingInline: 1,
			}}
		>
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
			<Button variant="text" type="submit" disabled={!cityName.trim()}>
				Traži
			</Button>
		</Box>
	);
}
