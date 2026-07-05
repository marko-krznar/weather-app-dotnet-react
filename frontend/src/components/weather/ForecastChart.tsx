import { LineChart } from "@mui/x-charts/LineChart";
import type { ForecastChartProps } from "../../types/weather";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function ForecastChart({ rows }: ForecastChartProps) {
	const xData = rows.map((r) => {
		const d = new Date(r.date);
		return isNaN(d.getTime())
			? r.date
			: `${d.getDate().toString().padStart(2, "0")}.${(d.getMonth() + 1).toString().padStart(2, "0")}. ${d
					.getHours()
					.toString()
					.padStart(2, "0")}:00`;
	});

	return (
		<Card>
			<CardContent>
				<Typography variant="h6">Grafički prikaz vremenskih parametara</Typography>
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
			</CardContent>
		</Card>
	);
}
