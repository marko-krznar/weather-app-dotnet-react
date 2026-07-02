import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface LoginResponse {
	accessToken: string;
	refreshToken: string;
}

export const auth = createApi({
	reducerPath: "auth",
	baseQuery: fetchBaseQuery({
		baseUrl: import.meta.env.VITE_API_BASE_URL,
		prepareHeaders: (headers) => {
			const token = localStorage.getItem("accessToken");
			if (token) {
				headers.set("authorization", `Bearer ${token}`);
			}
			return headers;
		},
	}),
	endpoints: (builder) => ({
		login: builder.mutation<
			LoginResponse,
			{ username: string; password: string }
		>({
			query: (credentials) => ({
				url: "/Auth/login",
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: credentials,
			}),
			async onQueryStarted(_, { queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;
					localStorage.setItem("accessToken", data.accessToken);
					localStorage.setItem("refreshToken", data.refreshToken);
				} catch (error) {
					console.error(
						"Greška pri spremanju tokena nakon prijave:",
						error
					);
				}
			},
		}),

		register: builder.mutation<
			{ id: number; username: string; passwordHash: string },
			{ username: string; password: string }
		>({
			query: (userCredentials) => ({
				url: "/Auth/register",
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: userCredentials,
			}),
		}),
	}),
});

export const { useLoginMutation, useRegisterMutation } = auth;
