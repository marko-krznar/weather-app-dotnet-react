import { Box, Card, CardContent, Typography } from "@mui/material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import type { ForecastGridProps } from "../../types/weather";

const columns: GridColDef[] = [
	{ field: "date", headerName: "Datum i vrijeme", flex: 1.2 },
	{ field: "temperature", headerName: "Temperatura (°C)", flex: 1 },
	{ field: "humidity", headerName: "Vlaga (%)", flex: 1 },
	{ field: "pressure", headerName: "Tlak (hPa)", flex: 1 },
	{ field: "wind", headerName: "Vjetar (m/s)", flex: 1 },
	{ field: "description", headerName: "Opis vremena", flex: 1.5 },
];

export default function ForecastGrid({ rows }: ForecastGridProps) {
	return (
		<Card>
			<CardContent>
				<Typography variant="h6">Tablični prikaz</Typography>
				<Box sx={{ height: 400, mt: 2 }}>
					<DataGrid
						rows={rows}
						columns={columns}
						pageSizeOptions={[5, 10]}
						initialState={{
							pagination: { paginationModel: { pageSize: 5 } },
						}}
					/>
				</Box>
			</CardContent>
		</Card>
	);
}
