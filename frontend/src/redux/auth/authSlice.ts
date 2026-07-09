import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../baseQueryWithReauth";

interface LoginResponse {
	accessToken: string;
	refreshToken: string;
}

export const auth = createApi({
	reducerPath: "auth",
	baseQuery: baseQueryWithReauth,
	endpoints: (builder) => ({
		login: builder.mutation<LoginResponse, { usernameOrEmail: string; password: string }>({
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
					console.error("Greška pri spremanju tokena nakon prijave:", error);
				}
			},
		}),
		register: builder.mutation<
			{ id: number; username: string; email: string },
			{ username: string; email: string; password: string }
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
