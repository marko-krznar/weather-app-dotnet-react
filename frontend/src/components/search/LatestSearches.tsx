import Card from "@mui/material/Card";
import type { LatestSearchesProps } from "../../types/search";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import LatestWeatherCardItem from "../common/LatestWeatherCardItem";
import { Stack } from "@mui/material";

export default function LatestSearches({ data }: LatestSearchesProps) {
	return (
		<Card sx={{ minWidth: "100%", flex: 1 }}>
			<CardContent sx={{ padding: 4 }}>
				<Typography variant="h5" component="h3" sx={{ mb: 4 }}>
					Najnovije Pretrage
				</Typography>
				<Stack direction="row" spacing={2}>
					{data.map((item) => (
						<LatestWeatherCardItem
							key={item.id}
							dateTime={item.searchedAt}
							searchTerm={item.searchTerm}
							pressure={item.pressure}
							temperature={item.temperature}
							weatherCondition={item.weatherCondition}
							windSpeed={item.windSpeed}
						/>
					))}
				</Stack>
			</CardContent>
		</Card>
	);
}
