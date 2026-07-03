import { configureStore } from "@reduxjs/toolkit";
import { auth } from "./auth/authSlice";
import { weather } from "./weather/weatherSlice";

export const store = configureStore({
	reducer: {
		[auth.reducerPath]: auth.reducer,
		[weather.reducerPath]: weather.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware()
			.concat(auth.middleware)
			.concat(weather.middleware),
});

export type RootStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
