import React, { useState } from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	TablePagination,
	Typography,
	Box,
	Button,
} from "@mui/material";
import { useGetSearchHistoryQuery } from "../redux/search/search";
import { useNavigate } from "react-router";

export default function SearchHistoryPage() {
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const { data: historyData } = useGetSearchHistoryQuery();
	const navigate = useNavigate();

	const handleChangePage = (
		_event: React.MouseEvent<HTMLButtonElement> | null,
		newPage: number
	) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleString("hr-HR", {
			day: "2-digit",
			month: "2-digit",
			year: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		});
	};

	const visibleRows = historyData?.slice(
		page * rowsPerPage,
		page * rowsPerPage + rowsPerPage
	);

	return (
		<Box sx={{ width: "100%", mt: 3 }}>
			<Button onClick={() => navigate("/")}>Natrag</Button>
			<Typography variant="h5" sx={{ mb: 2 }}>
				Povijest pretraga
			</Typography>
			<TableContainer component={Paper} elevation={3}>
				<Table
					sx={{ minWidth: 450 }}
					aria-label="tablica povijesti pretraga"
				>
					<TableHead>
						<TableRow>
							<TableCell
								sx={{ color: "white", fontWeight: "bold" }}
							>
								Grad / Pojam
							</TableCell>
							<TableCell
								sx={{ color: "white", fontWeight: "bold" }}
							>
								Vrijeme pretrage
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{visibleRows?.map((row) => (
							<TableRow
								key={row.id}
								sx={{
									"&:last-child td, &:last-child th": {
										border: 0,
									},
									"&:hover": {
										backgroundColor: "action.hover",
									},
								}}
							>
								<TableCell
									sx={{
										textTransform: "capitalize",
										fontWeight: 500,
									}}
								>
									{row.searchTerm}
								</TableCell>
								<TableCell>
									{formatDate(row.searchedAt)}
								</TableCell>
							</TableRow>
						))}
						{historyData?.length === 0 && (
							<TableRow>
								<TableCell
									colSpan={3}
									align="center"
									sx={{ py: 3, color: "text.secondary" }}
								>
									Nema pronađenih prethodnih pretraga.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
				<TablePagination
					rowsPerPageOptions={[5, 10, 25]}
					component="div"
					count={historyData?.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
					labelRowsPerPage="Redaka po stranici:"
					labelDisplayedRows={({ from, to, count }) =>
						`${from}–${to} od ${count}`
					}
				/>
			</TableContainer>
		</Box>
	);
}
