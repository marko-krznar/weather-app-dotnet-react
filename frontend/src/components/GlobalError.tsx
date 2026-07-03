/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";
import { Snackbar, Alert } from "@mui/material";
import { useState } from "react";

// TODO
// - fix za any
// - big fix za prikaz jednog errora, kad se zatvori opet se dobije error, ne prikazuje se poruka

export default function GlobalError() {
	const [visible, setVisible] = useState(true);
	const errorMessages = useSelector((state: any) => {
		const errors: string[] = [];

		if (state.auth?.mutations) {
			Object.values(state.auth.mutations).forEach((mutation: any) => {
				if (mutation.error) {
					errors.push(
						mutation.error.data || "Greška u autentifikaciji."
					);
				}
			});
		}

		if (state.weather?.queries) {
			Object.values(state.weather.queries).forEach((query: any) => {
				if (query.error) {
					errors.push(
						query.error.data ||
							"Greška u dohvaćanju podataka o vremenu."
					);
				}
			});
		}

		return errors;
	});

	return (
		<>
			{errorMessages.map((message, index) => (
				<Snackbar
					key={index}
					open={visible}
					anchorOrigin={{ vertical: "top", horizontal: "right" }}
				>
					<Alert
						severity="error"
						variant="filled"
						onClose={() => setVisible(false)}
					>
						{message}
					</Alert>
				</Snackbar>
			))}
		</>
	);
}
