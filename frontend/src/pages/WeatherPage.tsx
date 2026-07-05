import { useSelector } from "react-redux";
import SearchCity from "../components/SearchCity";
import WeatherWidget from "../components/weather/WeatherWidget";
import type { RootStore } from "../redux/store";
import { useGetCurrentWeatherQuery, useGetWeatherForFiveDaysQuery } from "../redux/weather/weatherSlice";
import { useState } from "react";
import ForecastFilters from "../components/weather/ForecastFilters";
import ForecastGrid from "../components/weather/ForecastGrid";
import ForecastChart from "../components/weather/ForecastChart";
import type { ApiForecastItem, ChartRow } from "../types/weather";
import { DEFAULT_TEMP_BOUNDS } from "../constants/weatherConstants";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

export default function WeatherPage() {
	const [tempBounds, setTempBounds] = useState<[number, number]>(DEFAULT_TEMP_BOUNDS);
	const [startDateInput, setStartDateInput] = useState("");
	const [endDateInput, setEndDateInput] = useState("");
	const [activeTempBounds, setActiveTempBounds] = useState<[number, number]>(DEFAULT_TEMP_BOUNDS);
	const [activeStartDate, setActiveStartDate] = useState("");
	const [activeEndDate, setActiveEndDate] = useState("");

	const { lat, lon } = useSelector((state: RootStore) => state.ui);

	const hasCoords = lat !== null && lon !== null;

	const { data: currentWeather } = useGetCurrentWeatherQuery({ lat: lat!, lon: lon! }, { skip: !hasCoords });
	const { data: forecast } = useGetWeatherForFiveDaysQuery({ lat: lat!, lon: lon! }, { skip: !hasCoords });

	const apiList = forecast && "list" in forecast ? (forecast.list as ApiForecastItem[]) : [];

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

	const filteredRows: ChartRow[] = apiList
		.map(
			(item, index): ChartRow => ({
				id: index,
				date: item.dt_txt,
				temperature: item.main.temp,
				humidity: item.main.humidity,
				pressure: item.main.pressure,
				wind: item.wind.speed,
				description: item.weather[0]?.description || "",
			})
		)
		.filter((row: ChartRow) => {
			const matchesTemp = row.temperature >= activeTempBounds[0] && row.temperature <= activeTempBounds[1];

			const rowDate = row.date.split(" ")[0];
			const matchesStartDate = activeStartDate ? rowDate >= activeStartDate : true;
			const matchesEndDate = activeEndDate ? rowDate <= activeEndDate : true;

			return matchesTemp && matchesStartDate && matchesEndDate;
		});

	return (
		<>
			<Box sx={{ mb: 2 }}>
				<Typography variant="h4" component="h1" gutterBottom>
					Vremenska Prognoza
				</Typography>
				<Typography variant="body1">
					Pretražite trenutne vremenske uvjete za odabrani grad i pregledajte detaljnu petodnevnu prognozu uz
					mogućnost filtriranja temperature i datuma.
				</Typography>
			</Box>
			<SearchCity />
			<Stack spacing={4} sx={{ mt: 4 }}>
				{currentWeather && (
					<WeatherWidget
						name={currentWeather.name}
						weather={currentWeather.weather}
						main={currentWeather.main}
						wind={currentWeather.wind}
					/>
				)}
				{forecast && (
					<>
						<ForecastFilters
							tempBounds={tempBounds}
							setTempBounds={setTempBounds}
							startDateInput={startDateInput}
							setStartDateInput={setStartDateInput}
							endDateInput={endDateInput}
							setEndDateInput={setEndDateInput}
							onApply={handleApplyFilters}
							onClear={handleClearFilters}
						/>
						<ForecastGrid rows={filteredRows} />
						<ForecastChart rows={filteredRows} />
					</>
				)}
			</Stack>
		</>
	);
}
