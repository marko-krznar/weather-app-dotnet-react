import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const searchHistory = createApi({
	reducerPath: "searchHistory",
	baseQuery: fetchBaseQuery({
		baseUrl: import.meta.env.VITE_API_BASE_URL,
		prepareHeaders: (headers) => {
			const token = localStorage.getItem("accessToken");
			if (token) {
				headers.set("Authorization", `Bearer ${token}`);
			}
			return headers;
		},
	}),
	endpoints: (builder) => ({
		getSearchHistory: builder.query<
			Array<{ id: number; searchTerm: string; searchedAt: string }>,
			void
		>({
			query: () => ({
				url: "/Search/history",
				method: "GET",
			}),
			keepUnusedDataFor: 0,
		}),
	}),
});

export const { useGetSearchHistoryQuery } = searchHistory;
