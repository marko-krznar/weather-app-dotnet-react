import { useMemo } from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { LineChart } from "@mui/x-charts/LineChart";

interface ForecastItem {
	dt: number;
	dt_txt: string;
	main: {
		temp: number;
		humidity: number;
		pressure: number;
	};
	weather: {
		description: string;
	}[];
	wind: {
		speed: number;
	};
}

export interface ForecastProps {
	forecast: ForecastItem[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function WeatherForecast({ forecast }: any) {
	const rows = useMemo(
		() =>
			forecast.list.map((item, index) => ({
				id: index,
				date: item.dt_txt,
				temperature: item.main.temp,
				humidity: item.main.humidity,
				pressure: item.main.pressure,
				wind: item.wind.speed,
				description: item.weather[0].description,
			})),
		[forecast.list]
	);

	const columns: GridColDef[] = [
		{
			field: "date",
			headerName: "Datum",
			flex: 1,
		},
		{
			field: "temperature",
			headerName: "Temperatura (°C)",
			flex: 1,
		},
		{
			field: "humidity",
			headerName: "Vlaga (%)",
			flex: 1,
		},
		{
			field: "pressure",
			headerName: "Tlak (hPa)",
			flex: 1,
		},
		{
			field: "wind",
			headerName: "Vjetar (m/s)",
			flex: 1,
		},
		{
			field: "description",
			headerName: "Opis",
			flex: 1.5,
		},
	];
	console.log("WeatherForecast forecast", forecast);

	return (
		<Box>
			<Card>
				<CardContent>
					<Typography variant="h6">Vremenska prognoza</Typography>

					<Box sx={{ height: 500 }}>
						<DataGrid
							rows={rows}
							columns={columns}
							pageSizeOptions={[10]}
						/>
					</Box>
				</CardContent>
			</Card>

			<Card>
				<CardContent>
					<Typography variant="h6">Graf temperature</Typography>

					<LineChart
						height={350}
						xAxis={[
							{
								scaleType: "point",
								data: rows.map((r) => r.date),
							},
						]}
						series={[
							{
								label: "Temperatura",
								data: rows.map((r) => r.temperature),
							},
						]}
					/>
				</CardContent>
			</Card>
		</Box>
	);
}
