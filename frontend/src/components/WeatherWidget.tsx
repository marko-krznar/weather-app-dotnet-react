import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

export interface WeatherWidgetProps {
	name: string;
	weather: Array<{ description: string; icon: string; main: string }>;
	main: {
		temp: number;
		feels_like: number;
		humidity: number;
		pressure: number;
	};
	wind: {
		speed: number;
	};
}

export interface WeatherArgs {
	lat: number;
	lon: number;
}

export default function WeatherWidget({
	name,
	weather,
	main,
	wind,
}: WeatherWidgetProps) {
	const weatherInfo = weather[0];
	const iconUrl = `https://openweathermap.org/img/wn/${weatherInfo.icon}@2x.png`;

	return (
		<Card
			sx={{
				maxWidth: 350,
				borderRadius: 3,
				boxShadow: 3,
				bgcolor: "background.paper",
			}}
		>
			<CardContent>
				<Typography variant="h5" gutterBottom>
					{name}
				</Typography>
				<Stack direction="row" sx={{ my: 2 }}>
					<Box>
						<Typography variant="h3">{main.temp}°C</Typography>
						<Typography variant="body2" color="text.secondary">
							Osjećaj: {main.temp}°C
						</Typography>
					</Box>
					<Box sx={{ textAlign: "center" }}>
						<img
							src={iconUrl}
							alt={weatherInfo.description}
							style={{ width: 80, height: 80 }}
						/>
						<Typography
							variant="body1"
							sx={{ textTransform: "capitalize", mt: -1 }}
						>
							{weatherInfo.description}
						</Typography>
					</Box>
				</Stack>
				<Stack sx={{ mt: 3, pt: 2, borderTop: "1px solid #eee" }}>
					<Box>
						<Typography variant="caption" color="text.secondary">
							Vlaga
						</Typography>
						<Typography variant="body2">
							{main.humidity}%
						</Typography>
					</Box>
					<Box>
						<Typography variant="caption" color="text.secondary">
							Vjetar
						</Typography>
						<Typography variant="body2">
							{wind.speed} m/s
						</Typography>
					</Box>
					<Box>
						<Typography variant="caption" color="text.secondary">
							Tlak
						</Typography>
						<Typography variant="body2">
							{main.pressure} hPa
						</Typography>
					</Box>
				</Stack>
			</CardContent>
		</Card>
	);
}
