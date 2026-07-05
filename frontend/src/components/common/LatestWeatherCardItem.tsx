import { Stack } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import AirIcon from "@mui/icons-material/Air";
import CompressIcon from "@mui/icons-material/Compress";
import { roundTemperature } from "../../utils/weatherHelpers";
import type { LatestWeatherCardItemProps } from "../../types/search";
import dayjs from "dayjs";

export default function LatestWeatherCardItem({
	dateTime,
	searchTerm,
	pressure,
	temperature,
	weatherCondition,
	windSpeed,
}: LatestWeatherCardItemProps) {
	return (
		<Card sx={{ backgroundColor: "action.hover", flex: 1 }}>
			<CardContent sx={{ display: "flex", flexDirection: "column", gap: 2, p: 3 }}>
				<Typography variant="subtitle2" component="p" align="center">
					{dayjs(dateTime).format("DD.MM.YYYY. HH:mm[h]")}
				</Typography>
				<Typography variant="h5" component="p" align="center">
					{searchTerm}
				</Typography>
				<Typography variant="h2" component="p" align="center">
					{roundTemperature(temperature)}°C
				</Typography>
				<Typography variant="body1" component="p" align="center">
					{weatherCondition}
				</Typography>
				<Stack direction="row" sx={{ justifyContent: "space-between" }}>
					<Stack direction="row" spacing={1}>
						<AirIcon />
						<Typography variant="body1" component="p">
							Vjetar
						</Typography>
					</Stack>
					<Typography variant="body1" component="p">
						{windSpeed} m/s
					</Typography>
				</Stack>
				<Stack direction="row" sx={{ justifyContent: "space-between" }}>
					<Stack direction="row" spacing={1}>
						<CompressIcon />
						<Typography variant="body1" component="p">
							Tlak
						</Typography>
					</Stack>
					<Typography variant="body1" component="p">
						{pressure} hPa
					</Typography>
				</Stack>
			</CardContent>
		</Card>
	);
}
