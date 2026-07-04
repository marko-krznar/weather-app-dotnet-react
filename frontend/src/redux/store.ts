import { configureStore } from "@reduxjs/toolkit";
import { auth } from "./auth/authSlice";
import { weather } from "./weather/weatherSlice";
import ui from "./ui/uiSlice";
import { rtkQueryErrorLogger } from "./errorMiddleware";
import { search } from "./search/search";

export const store = configureStore({
	reducer: {
		[auth.reducerPath]: auth.reducer,
		[weather.reducerPath]: weather.reducer,
		[search.reducerPath]: search.reducer,
		ui: ui,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware()
			.concat(auth.middleware)
			.concat(weather.middleware)
			.concat(search.middleware)
			.concat(rtkQueryErrorLogger),
});

export type RootStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
