import {
	Card,
	CardContent,
	Typography,
	List,
	ListItem,
	ListItemText,
	Chip,
} from "@mui/material";

interface TopCity {
	city: string;
	count: number;
}

interface TopCitiesProps {
	data: TopCity[];
}

export default function TopCities({ data }: TopCitiesProps) {
	return (
		<Card sx={{ minWidth: 275, boxShadow: 3 }}>
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
					Top 3 Grada
				</Typography>
				<List>
					{data.map((item, index) => (
						<ListItem
							key={index}
							secondaryAction={
								<Chip
									label={`${item.count} pretraga`}
									color="primary"
									variant="outlined"
									size="small"
								/>
							}
							divider={index < data.length - 1}
						>
							<ListItemText
								primary={
									item.city.charAt(0).toUpperCase() +
									item.city.slice(1)
								}
								// primaryTypographyProps={{
								// 	style: { textTransform: "capitalize" },
								// }}
							/>
						</ListItem>
					))}
				</List>
			</CardContent>
		</Card>
	);
}
