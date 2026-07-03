import { isRejectedWithValue } from "@reduxjs/toolkit";
import type { Middleware } from "@reduxjs/toolkit";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import type { SerializedError } from "@reduxjs/toolkit/react";
import { setError } from "./ui/uiSlice";

export const rtkQueryErrorLogger: Middleware = (api) => (next) => (action) => {
	if (isRejectedWithValue(action)) {
		const error = action.payload as FetchBaseQueryError | SerializedError;
		let message = "Dogodila se greška pri komunikaciji sa serverom.";

		if (error && "status" in error) {
			const errorData = error.data;
			if (typeof errorData === "string") {
				message = errorData;
			} else if (
				errorData &&
				typeof errorData === "object" &&
				"message" in errorData
			) {
				message = String((errorData as { message: unknown }).message);
			} else {
				message = `Greška na serveru (Status: ${error.status})`;
			}
		} else if (error && "message" in error && error.message) {
			message = error.message;
		}

		api.dispatch(setError(message));
	}

	return next(action);
};
