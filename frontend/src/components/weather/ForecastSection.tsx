import { useState } from "react";
import Stack from "@mui/material/Stack";
import ForecastFilters from "./ForecastFilters";
import ForecastGrid from "./ForecastGrid";
import ForecastChart from "./ForecastChart";
import type { ChartRow, ForecastSectionProps } from "../../types/weather";
import { DEFAULT_TEMP_BOUNDS } from "../../constants/weatherConstants";
import dayjs from "dayjs";
import { roundTemperature } from "../../utils/weatherHelpers";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import Alert from "@mui/material/Alert";

export default function ForecastSection({ apiList, cityName }: ForecastSectionProps) {
	const [tempBounds, setTempBounds] = useState<[number, number]>(DEFAULT_TEMP_BOUNDS);
	const [startDateInput, setStartDateInput] = useState("");
	const [endDateInput, setEndDateInput] = useState("");
	const [activeTempBounds, setActiveTempBounds] = useState<[number, number]>(DEFAULT_TEMP_BOUNDS);
	const [activeStartDate, setActiveStartDate] = useState("");
	const [activeEndDate, setActiveEndDate] = useState("");
	const [showFilters, setShowFilters] = useState(false);

	const isFiltered =
		activeTempBounds[0] !== DEFAULT_TEMP_BOUNDS[0] ||
		activeTempBounds[1] !== DEFAULT_TEMP_BOUNDS[1] ||
		activeStartDate !== "" ||
		activeEndDate !== "";

	const hasUnappliedChanges =
		tempBounds[0] !== activeTempBounds[0] ||
		tempBounds[1] !== activeTempBounds[1] ||
		startDateInput !== activeStartDate ||
		endDateInput !== activeEndDate;

	const handleApplyFilters = () => {
		setActiveTempBounds(tempBounds);
		setActiveStartDate(startDateInput);
		setActiveEndDate(endDateInput);
	};

	const handleClearFilters = () => {
		setTempBounds(DEFAULT_TEMP_BOUNDS);
		setStartDateInput("");
		setEndDateInput("");

		setActiveTempBounds(DEFAULT_TEMP_BOUNDS);
		setActiveStartDate("");
		setActiveEndDate("");
	};

	const filteredRows: Array<ChartRow> = apiList
		.map(
			(item, index): ChartRow => ({
				id: index,
				date: dayjs(item.dt_txt).format("DD.MM.YYYY. HH:mm[h]"),
				temperature: roundTemperature(item.main.temp),
				humidity: item.main.humidity,
				pressure: item.main.pressure,
				wind: item.wind.speed,
				description: item.weather[0]?.description || "",
				rawDate: dayjs(item.dt_txt),
			})
		)
		.filter((row: ChartRow) => {
			const matchesTemp = row.temperature >= activeTempBounds[0] && row.temperature <= activeTempBounds[1];
			const rowDateStartOfDay = row.rawDate.startOf("day");

			const matchesStartDate = activeStartDate
				? rowDateStartOfDay.isAfter(dayjs(activeStartDate).subtract(1, "day"))
				: true;

			const matchesEndDate = activeEndDate
				? rowDateStartOfDay.isBefore(dayjs(activeEndDate).add(1, "day"))
				: true;

			return matchesTemp && matchesStartDate && matchesEndDate;
		});

	return (
		<Stack spacing={3}>
			<Stack direction="row" spacing={2}>
				<Typography variant="h5" component="h2" sx={{ flexGrow: 1 }}>
					Prognoza za narednih 5 dana za {cityName}
				</Typography>
				{isFiltered && (
					<Button variant="text" color="error" onClick={handleClearFilters}>
						Očisti filtere
					</Button>
				)}
				<Button
					variant="outlined"
					onClick={() => setShowFilters(!showFilters)}
					sx={{ alignSelf: "flex-start" }}
				>
					{showFilters ? "Sakrij filtere" : "Pokaži filtere"}
				</Button>
			</Stack>
			<Collapse in={showFilters} timeout="auto" unmountOnExit>
				<ForecastFilters
					tempBounds={tempBounds}
					setTempBounds={setTempBounds}
					startDateInput={startDateInput}
					setStartDateInput={setStartDateInput}
					endDateInput={endDateInput}
					setEndDateInput={setEndDateInput}
					onApply={handleApplyFilters}
					hasChanges={hasUnappliedChanges}
				/>
			</Collapse>
			{filteredRows.length > 0 ? (
				<>
					<ForecastGrid rows={filteredRows} />
					<ForecastChart rows={filteredRows} />
				</>
			) : (
				<Alert variant="outlined" severity="warning">
					Nema rezultata za odabrane filtere. Pokušajte prilagoditi raspon temperature i datuma ili kliknite
					na "Očisti filtere" za povratak na početni prikaz
				</Alert>
			)}
		</Stack>
	);
}
