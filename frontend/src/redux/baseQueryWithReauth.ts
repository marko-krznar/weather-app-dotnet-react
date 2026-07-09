import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { resetLocation } from "./ui/uiSlice";

const rawBaseQuery = fetchBaseQuery({
	baseUrl: import.meta.env.VITE_API_BASE_URL,
	prepareHeaders: (headers) => {
		const token = localStorage.getItem("accessToken");
		if (token) {
			headers.set("Authorization", `Bearer ${token}`);
		}
		return headers;
	},
});

export const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
	args,
	api,
	extraOptions
) => {
	const result = await rawBaseQuery(args, api, extraOptions);

	const url = typeof args === "string" ? args : args.url;
	const isAuthRequest = url?.includes("/Auth");

	if (result.error && result.error.status === 401 && !isAuthRequest) {
		localStorage.removeItem("accessToken");
		localStorage.removeItem("refreshToken");

		api.dispatch(resetLocation());

		window.location.href = "/login";
	}

	return result;
};
