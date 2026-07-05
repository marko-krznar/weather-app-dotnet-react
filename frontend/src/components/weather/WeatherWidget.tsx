import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { roundTemperature } from "../../utils/weatherHelpers";
import AirIcon from "@mui/icons-material/Air";
import CompressIcon from "@mui/icons-material/Compress";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import Divider from "@mui/material/Divider";
import WeatherStatCard from "../common/WeatherStatCard";
import type { WeatherWidgetProps } from "../../types/weather";

export default function WeatherWidget({ name, weather, main, wind }: WeatherWidgetProps) {
	const weatherInfo = weather[0];
	const iconUrl = `https://openweathermap.org/img/wn/${weatherInfo.icon}@2x.png`;

	return (
		<Card sx={{ p: 2 }}>
			<CardContent>
				<Stack direction="row" sx={{ flexGrow: 1 }} spacing={4}>
					<Stack sx={{ p: 4, justifyContent: "center", alignItems: "center" }} spacing={1}>
						<Typography variant="h5" gutterBottom>
							{name}
						</Typography>
						<Typography variant="h3">{roundTemperature(main.temp)}°C</Typography>
						<img src={iconUrl} alt={weatherInfo.description} style={{ width: 80, height: 80 }} />
						<Typography variant="body1">{weatherInfo.description}</Typography>
					</Stack>
					<Divider orientation="vertical" flexItem />
					<Stack direction="row" sx={{ flexGrow: 1, alignItems: "center" }} spacing={2}>
						<WeatherStatCard icon={<WaterDropIcon />} title="Vlaga" value={main.humidity} unit="%" />
						<WeatherStatCard icon={<AirIcon />} title="Vjetar" value={wind.speed} unit="m/s" />
						<WeatherStatCard icon={<CompressIcon />} title="Tlak" value={main.pressure} unit="hPa" />
					</Stack>
				</Stack>
			</CardContent>
		</Card>
	);
}
