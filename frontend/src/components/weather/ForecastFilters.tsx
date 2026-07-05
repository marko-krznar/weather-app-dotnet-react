import { Card, CardContent, Typography, Stack, TextField, Button, Slider, Box } from "@mui/material";

interface ForecastFiltersProps {
	tempBounds: [number, number];
	setTempBounds: React.Dispatch<React.SetStateAction<[number, number]>>;
	startDateInput: string;
	setStartDateInput: (value: string) => void;
	endDateInput: string;
	setEndDateInput: (value: string) => void;
	onApply: () => void;
	onClear: () => void;
}

export default function ForecastFilters({
	tempBounds,
	setTempBounds,
	startDateInput,
	setStartDateInput,
	endDateInput,
	setEndDateInput,
	onApply,
	onClear,
}: ForecastFiltersProps) {
	const handleSliderChange = (_event: Event, newValue: number | number[]) => {
		setTempBounds(newValue as [number, number]);
	};

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
					<TextField
						label="Od datuma"
						type="date"
						fullWidth
						value={startDateInput}
						onChange={(e) => setStartDateInput(e.target.value)}
					/>

					<TextField
						label="Do datuma"
						type="date"
						fullWidth
						value={endDateInput}
						onChange={(e) => setEndDateInput(e.target.value)}
					/>
				</Stack>
				<Stack sx={{ mt: 3 }}>
					<Button variant="outlined" color="secondary" onClick={onClear}>
						Očisti filtere
					</Button>
					<Button variant="contained" color="primary" onClick={onApply}>
						Filtriraj
					</Button>
				</Stack>
			</CardContent>
		</Card>
	);
}
