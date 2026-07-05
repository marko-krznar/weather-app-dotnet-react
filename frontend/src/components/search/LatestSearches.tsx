import Card from "@mui/material/Card";
import type { LatestSearchesProps } from "../../types/search";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";

export default function LatestSearches({ data }: LatestSearchesProps) {
	return (
		<Card sx={{ minWidth: "100%", flex: 1 }}>
			<CardContent sx={{ padding: 4 }}>
				<Typography variant="h5" component="h3" gutterBottom>
					Najnovije Pretrage
				</Typography>
				{data.map((item) => (
					<Typography key={item.id} variant="body1">
						{dayjs(item.searchedAt).format("HH:mm - DD.MM.YYYY.")}
						{item.searchTerm}
						{item.pressure} hPa, {item.temperature}°C, {item.weatherCondition}, {item.windSpeed} m/s
					</Typography>
				))}
			</CardContent>
		</Card>
	);
}
