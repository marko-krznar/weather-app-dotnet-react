import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const auth = createApi({
	reducerPath: "auth",
	baseQuery: fetchBaseQuery({
		baseUrl: import.meta.env.VITE_API_BASE_URL,
	}),
	endpoints: (builder) => ({
		// Koristimo mutation jer šaljemo podatke (POST) koji mijenjaju stanje/autentifikaciju
		login: builder.mutation<string, { username: string; password: string }>(
			{
				query: (credentials) => ({
					url: "/auth/login",
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: credentials,
					// VAŽNO: Budući da tvoj backend vraća token kao običan tekst (response.text()),
					// moramo reći RTK Queryju da ne očekuje JSON.
					responseHandler: (response) => response.text(),
				}),
				// onQueryStarted se pokreće automatski kada mutacija započne.
				// Ovdje možemo sigurno spremiti token nakon što zahtjev uspije.
				async onQueryStarted(_, { queryFulfilled }) {
					try {
						const { data: token } = await queryFulfilled;
						localStorage.setItem("token", token);
						// eslint-disable-next-line @typescript-eslint/no-unused-vars
					} catch (error) {
						// Ovdje možeš obraditi grešku ako je potrebno,
						// ali RTK Query već sam upravlja error stanjem
					}
				},
			}
		),
		// --- DODAJ REGISTRACIJU OVDJE ---
		// Dodajemo registraciju prema specifikaciji sa slike
		register: builder.mutation<
			{ id: number; username: string; passwordHash: string }, // Tip odgovora (JSON objekt)
			{ username: string; password: string } // Tip onoga što šalješ (Body)
		>({
			query: (userCredentials) => ({
				url: "/Auth/register", // Pazi na veliko slovo "A" ako ti baseUrl završava s "/api"
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: userCredentials,
				// Ovdje NE stavljaš responseHandler jer backend vraća standardni JSON objekt {}
			}),
		}),
	}),
});

// RTK Query automatski generira ovaj hook
export const { useLoginMutation, useRegisterMutation } = auth;
