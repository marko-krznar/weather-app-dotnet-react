import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface UiState {
	lat: number | null;
	lon: number | null;
	selectedCityName: string | null;
	errorMessage: string | null;
}

const initialState: UiState = {
	lat: null,
	lon: null,
	selectedCityName: null,
	errorMessage: null,
};

const uiSlice = createSlice({
	name: "ui",
	initialState,
	reducers: {
		setLocation: (
			state,
			action: PayloadAction<{
				lat: number;
				lon: number;
				cityName: string;
			}>
		) => {
			state.lat = action.payload.lat;
			state.lon = action.payload.lon;
			if (action.payload.cityName) {
				state.selectedCityName = action.payload.cityName;
			}
		},
		setError: (state, action: PayloadAction<string>) => {
			state.errorMessage = action.payload;
		},
		clearError: (state) => {
			state.errorMessage = null;
		},
	},
});

export const { setLocation, setError, clearError } = uiSlice.actions;
export default uiSlice.reducer;
