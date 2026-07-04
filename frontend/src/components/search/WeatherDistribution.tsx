import { Card, CardContent, Typography, Box } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";

interface ConditionData {
	condition: string;
	count: number;
}

interface WeatherDistributionProps {
	data: ConditionData[];
}

// Mapiranje engleskih naziva iz OpenWeather-a na hrvatski i dodjeljivanje boja
const CONDITION_MAPPING: { [key: string]: { label: string; color: string } } = {
	Clear: { label: "Sunčano", color: "#ffb300" },
	Clouds: { label: "Oblačno", color: "#90a4ae" },
	Rain: { label: "Kišovito", color: "#29b6f6" },
	Snow: { label: "Snijeg", color: "#b3e5fc" },
};

const DEFAULT_COLOR = "#ab47bc";

export default function WeatherDistribution({
	data,
}: WeatherDistributionProps) {
	console.log("WeatherDistribution data:", data);

	// Transformacija podataka u format koji MUI PieChart očekuje
	const chartData = data?.map((item, index) => {
		const mapping = CONDITION_MAPPING[item.condition];
		return {
			id: index,
			value: item.count,
			label: mapping ? mapping.label : item.condition,
			color: mapping ? mapping.color : DEFAULT_COLOR,
		};
	});

	return (
		<Card sx={{ minWidth: 275, boxShadow: 3, height: "100%" }}>
			<CardContent>
				<Typography
					variant="h6"
					component="div"
					gutterBottom
					sx={{
						fontWeight: "bold",
						display: "flex",
						alignItems: "center",
						gap: 1,
					}}
				>
					Distribucija Vremenskih Uvjeta
				</Typography>

				{chartData?.length === 0 ? (
					<Typography
						variant="body2"
						color="text.secondary"
						sx={{ mt: 2 }}
					>
						Nema podataka za prikaz.
					</Typography>
				) : (
					<Box
						sx={{
							width: "100%",
							height: 250,
							mt: 2,
							display: "flex",
							justifyContent: "center",
						}}
					>
						{chartData && (
							<PieChart
								series={[
									{
										data: chartData,
										innerRadius: 50, // Donut izgled
										outerRadius: 80,
										paddingAngle: 4,
										cornerRadius: 4,
									},
								]}
								height={220}
								slotProps={{
									legend: {
										// direction: "row",
										position: {
											vertical: "bottom",
											horizontal: "center",
										},
										// padding: 0,
									},
								}}
							/>
						)}
					</Box>
				)}
			</CardContent>
		</Card>
	);
}
