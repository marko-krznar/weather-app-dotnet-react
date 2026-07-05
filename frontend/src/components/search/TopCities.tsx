import { Card, CardContent, Typography } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart"; // Uvoz BarChart komponente

interface TopCity {
	city: string;
	count: number;
}

interface TopCitiesProps {
	data: TopCity[];
}

export default function TopCities({ data }: TopCitiesProps) {
	const xLabels = data.map((item) => item.city.charAt(0).toUpperCase() + item.city.slice(1));
	const chartData = data.map((item) => item.count);

	return (
		<Card sx={{ minWidth: "400px", flex: 1 }}>
			<CardContent sx={{ padding: 4 }}>
				<Typography variant="h5" component="h3" gutterBottom>
					Top 3 Grada
				</Typography>
				<BarChart
					width={400}
					height={250}
					series={[
						{
							data: chartData,
							label: "Broj pretraga",
							id: "pretrageId",
						},
					]}
					xAxis={[{ data: xLabels, scaleType: "band" }]}
				/>
			</CardContent>
		</Card>
	);
}
