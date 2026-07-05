import { Card, CardContent, Typography, Stack, Button, Slider, Box } from "@mui/material";
import type { ForecastFiltersProps } from "../../types/weather";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";

export default function ForecastFilters({
	tempBounds,
	setTempBounds,
	startDateInput,
	setStartDateInput,
	endDateInput,
	setEndDateInput,
	onApply,
	hasChanges,
}: ForecastFiltersProps) {
	const handleSliderChange = (_event: Event, newValue: number | number[]) => {
		setTempBounds(newValue as [number, number]);
	};

	const startValue = startDateInput ? dayjs(startDateInput) : null;
	const endValue = endDateInput ? dayjs(endDateInput) : null;

	return (
		<Card>
			<CardContent>
				<Typography variant="h6" sx={{ mb: 2 }}>
					Filteri prognoze
				</Typography>

				<Stack spacing={3}>
					<Box sx={{ px: 1 }}>
						<Typography id="range-slider" gutterBottom variant="body2" color="text.secondary">
							Temperatura ({tempBounds[0]} °C - {tempBounds[1]} °C)
						</Typography>
						<Slider
							value={tempBounds}
							onChange={handleSliderChange}
							valueLabelDisplay="auto"
							min={-30}
							max={45}
							valueLabelFormat={(value) => `${value} °C`}
						/>
					</Box>
					<DatePicker
						label="Od datuma"
						value={startValue}
						format="DD/MM/YYYY"
						disablePast
						onChange={(newValue: Dayjs | null) => {
							setStartDateInput(newValue ? newValue.format("YYYY-MM-DD") : "");
						}}
					/>
					<DatePicker
						label="Do datuma"
						format="DD/MM/YYYY"
						value={endValue}
						onChange={(newValue: Dayjs | null) => {
							setEndDateInput(newValue ? newValue.format("YYYY-MM-DD") : "");
						}}
					/>
				</Stack>
				<Stack spacing={2} sx={{ mt: 3 }}>
					<Button variant="contained" color="primary" onClick={onApply} disabled={!hasChanges}>
						Filtriraj
					</Button>
				</Stack>
			</CardContent>
		</Card>
	);
}
