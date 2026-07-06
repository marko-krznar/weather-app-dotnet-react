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
} from "@mui/material";
import { useGetSearchHistoryQuery } from "../redux/search/search";
import dayjs from "dayjs";

export default function SearchHistoryPage() {
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);

	const token = localStorage.getItem("accessToken");
	const { data: historyData } = useGetSearchHistoryQuery({ page, limit: rowsPerPage }, { skip: !token });

	const visibleRows = historyData?.items;
	const totalCount = historyData?.totalCount || 0;

	const handleChangePage = (_event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	return (
		<Box>
			<Typography variant="h4" sx={{ mb: 3 }}>
				Povijest pretraga
			</Typography>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 450 }} aria-label="tablica povijesti pretraga">
					<TableHead>
						<TableRow>
							<TableCell sx={{ fontWeight: "bold" }}>Grad / Pojam</TableCell>
							<TableCell sx={{ fontWeight: "bold" }}>Vrijeme pretrage</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{visibleRows?.map((row) => (
							<TableRow key={row.id}>
								<TableCell>{row.searchTerm}</TableCell>
								<TableCell>{dayjs(row.searchedAt).format("DD.MM.YYYY. HH:mm")}h</TableCell>
							</TableRow>
						))}
						{totalCount === 0 && (
							<TableRow>
								<TableCell colSpan={3} align="center">
									Nema pronađenih prethodnih pretraga.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
				<TablePagination
					rowsPerPageOptions={[10, 20, 40]}
					component="div"
					count={totalCount}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
					labelRowsPerPage="Redaka po stranici:"
					labelDisplayedRows={({ from, to, count }) => `${from}–${to} od ${count}`}
				/>
			</TableContainer>
		</Box>
	);
}
