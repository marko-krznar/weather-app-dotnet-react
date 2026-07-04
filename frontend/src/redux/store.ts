import { configureStore } from "@reduxjs/toolkit";
import { auth } from "./auth/authSlice";
import { weather } from "./weather/weatherSlice";
import ui from "./ui/uiSlice";
import { rtkQueryErrorLogger } from "./errorMiddleware";
import { searchHistory } from "./search-history/searchHistory";

export const store = configureStore({
	reducer: {
		[auth.reducerPath]: auth.reducer,
		[weather.reducerPath]: weather.reducer,
		[searchHistory.reducerPath]: searchHistory.reducer,
		ui: ui,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware()
			.concat(auth.middleware)
			.concat(weather.middleware)
			.concat(searchHistory.middleware)
			.concat(rtkQueryErrorLogger),
});

export type RootStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
