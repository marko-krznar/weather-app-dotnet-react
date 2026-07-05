import { Typography, Box, Stack } from "@mui/material";
import LatestSearches from "../components/search/LatestSearches";
import TopCities from "../components/search/TopCities";
import { useGetSearchStatsQuery } from "../redux/search/search";
import WeatherDistribution from "../components/search/WeatherDistribution";

export default function SearchStats() {
	const { data } = useGetSearchStatsQuery();

	return (
		<>
			<Box sx={{ mb: 3 }}>
				<Typography variant="h4" gutterBottom>
					Statistika
				</Typography>
			</Box>
			{data && (
				<Stack sx={{ gap: 3 }}>
					<TopCities data={data.topCities} />
					<LatestSearches data={data.latestSearches} />
					<WeatherDistribution data={data.conditionDistribution} />
				</Stack>
			)}
		</>
	);
}
