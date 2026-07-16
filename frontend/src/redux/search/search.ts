import { createApi } from "@reduxjs/toolkit/query/react";
import type { SearchHistoryItem, SearchStatsResponse } from "../../types/search";
import { baseQueryWithReauth } from "../baseQueryWithReauth";

export const search = createApi({
	reducerPath: "search",
	baseQuery: baseQueryWithReauth,
	endpoints: (builder) => ({
		getSearchHistory: builder.query<
			{ items: Array<SearchHistoryItem>; totalCount: number },
			{ page: number; limit: number }
		>({
			query: ({ page, limit }) => ({
				url: `Search/history?page=${page}&limit=${limit}`,
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
