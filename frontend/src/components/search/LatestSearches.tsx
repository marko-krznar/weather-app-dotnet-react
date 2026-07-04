import {
	Card,
	CardContent,
	Typography,
	List,
	ListItem,
	ListItemText,
} from "@mui/material";

interface LatestSearch {
	searchTerm: string;
	searchedAt: string;
}

interface LatestSearchesProps {
	data: Array<LatestSearch>;
}

export default function LatestSearches({ data }: LatestSearchesProps) {
	const formatDateTime = (dateString: string) => {
		const date = new Date(dateString);
		return (
			date.toLocaleTimeString("hr-HR", {
				hour: "2-digit",
				minute: "2-digit",
			}) +
			" - " +
			date.toLocaleDateString("hr-HR")
		);
	};

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
					Najnovije Pretrage
				</Typography>
				<List>
					{data.map((item, index) => (
						<ListItem key={index} divider={index < data.length - 1}>
							<ListItemText
								primary={item.searchTerm}
								secondary={formatDateTime(item.searchedAt)}
							/>
						</ListItem>
					))}
				</List>
			</CardContent>
		</Card>
	);
}
