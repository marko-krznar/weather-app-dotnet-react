import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import type { ForecastGridProps } from "../../types/weather";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

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
						disableColumnMenu
						disableColumnSorting
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
