import { type ReactNode } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

interface WeatherStatCardProps {
	icon: ReactNode;
	title: string;
	value: string | number;
	unit: string;
}

export default function WeatherStatCard({ icon, title, value, unit }: WeatherStatCardProps) {
	return (
		<Card sx={{ backgroundColor: "divider", flex: 1 }}>
			<CardContent sx={{ display: "flex", flexDirection: "column", gap: 3, p: 3 }}>
				<Stack direction="row" spacing={1}>
					{icon}
					<Typography variant="body1">{title}</Typography>
				</Stack>
				<Stack direction="row" spacing={1}>
					<Typography variant="h2" component="p">
						{value}
					</Typography>
					<Typography variant="body1">{unit}</Typography>
				</Stack>
			</CardContent>
		</Card>
	);
}
