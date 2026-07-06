import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	lat: null,
	lng: null,
	loading: false,
	error: null,
};

const locationSlice = createSlice({
	name: "location",
	initialState,
	reducers: {
		startLoading: (state) => {
			state.loading = true;
			state.error = null;
		},
		setLocation: (state, action) => {
			state.loading = false;
			state.lat = action.payload.lat;
			state.lng = action.payload.lng;
		},
		setError: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		resetLocation: () => initialState,
	},
});

export const { startLoading, setLocation, setError, resetLocation } = locationSlice.actions;
export default locationSlice.reducer;
