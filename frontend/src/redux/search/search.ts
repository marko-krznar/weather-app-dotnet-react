import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
	SearchHistoryItem,
	SearchStatsResponse,
} from "../../types/search/search";

export const search = createApi({
	reducerPath: "search",
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
		getSearchHistory: builder.query<Array<SearchHistoryItem>, void>({
			query: () => ({
				url: "/Search/history",
				method: "GET",
			}),
			keepUnusedDataFor: 0,
		}),
		getSearchStats: builder.query<SearchStatsResponse, void>({
			query: () => ({
				url: "/Search/stats",
				method: "GET",
			}),
			keepUnusedDataFor: 0,
		}),
	}),
});

export const {
	useGetSearchHistoryQuery,
	useLazyGetSearchHistoryQuery,
	useGetSearchStatsQuery,
	useLazyGetSearchStatsQuery,
} = search;
