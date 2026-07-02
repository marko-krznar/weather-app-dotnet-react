import { configureStore } from "@reduxjs/toolkit";
import { auth } from "./auth/authSlice";
import { weather } from "./weather/weatherSlice";

export const store = configureStore({
	reducer: {
		// auth: authReducer,
		[auth.reducerPath]: auth.reducer, // Dodaje RTK Query reducer
		[weather.reducerPath]: weather.reducer, // Dodaje RTK Query reducer
	},
	// RTK Query zahtijeva middleware za keširanje, invalidaciju i ostale mogućnosti
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware()
			.concat(auth.middleware)
			.concat(weather.middleware),
});

export type RootStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
