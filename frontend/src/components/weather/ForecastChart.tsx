import { Box, Card, CardContent, Typography } from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";

interface ChartRow {
	date: string;
	temperature: number;
	wind: number;
	humidity: number;
}

export interface ForecastChartProps {
	rows: ChartRow[];
}

export default function ForecastChart({ rows }: ForecastChartProps) {
	const xData = rows.map((r) => {
		const d = new Date(r.date);
		return isNaN(d.getTime())
			? r.date
			: `${d.getDate().toString().padStart(2, "0")}.${(d.getMonth() + 1)
					.toString()
					.padStart(2, "0")}. ${d
					.getHours()
					.toString()
					.padStart(2, "0")}:00`;
	});

	return (
		<Card>
			<CardContent>
				<Typography variant="h6">
					Grafički prikaz vremenskih parametara
				</Typography>
				<Box sx={{ height: 400, mt: 2 }}>
					{rows.length > 0 ? (
						<LineChart
							height={400}
							xAxis={[{ scaleType: "point", data: xData }]}
							yAxis={[
								{ id: "temp-axis", label: "Temperatura (°C)" },
								{
									id: "wind-axis",
									label: "Vlaga (%)",
									position: "right",
								},
							]}
							series={[
								{
									yAxisId: "temp-axis",
									label: "Temperatura (°C)",
									data: rows.map((r) => r.temperature),
									color: "#ff4d4d",
									valueFormatter: (value) => `${value}°C`,
								},
								{
									yAxisId: "wind-axis",
									label: "Vlaga (%)",
									data: rows.map((r) => r.humidity),
									color: "#9933ff",
									valueFormatter: (value) => `${value}%`,
								},
							]}
							slotProps={{
								legend: {
									position: {
										vertical: "top",
										horizontal: "center",
									},
								},
							}}
						/>
					) : (
						<Typography
							color="textSecondary"
							align="center"
							sx={{ pt: 10 }}
						>
							Nema podataka za odabrane uvjete. Kliknite
							"Filtriraj" ili "Očisti filtere".
						</Typography>
					)}
				</Box>
			</CardContent>
		</Card>
	);
}
