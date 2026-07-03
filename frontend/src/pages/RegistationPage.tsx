import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useNavigate } from "react-router";
import { useRegisterMutation } from "../redux/auth/authSlice";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import { useState } from "react";

export default function RegistationPage() {
	const navigate = useNavigate();
	const [register, { isLoading, isError, error }] = useRegisterMutation();
	const [formData, setFormData] = useState({
		username: "",
		email: "",
		password: "",
	});

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;

		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			await register(formData).unwrap();
		} catch (err) {
			console.error("Greška pri prijavi:", err);
		}
	};

	return (
		<Stack
			spacing={2}
			sx={{ flexGrow: 1, justifyContent: "center", alignItems: "center" }}
		>
			<Card
				component="form"
				onSubmit={handleSubmit}
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					padding: 4,
					maxWidth: 600,
				}}
			>
				<CardContent
					sx={{
						display: "flex",
						flexDirection: "column",
						gap: 2,
					}}
				>
					<Typography
						variant="h2"
						align="center"
						sx={{ textTransform: "uppercase" }}
					>
						Regitriraj se
					</Typography>
					<Typography variant="body1" align="center" gutterBottom>
						Za korištenje WeatherApp-a potrebno je kreirati
						korisnički profil. Nakon registracije moći ćete
						pretraživati gradove te pregledavati trenutačno vrijeme
						i petodnevnu vremensku prognozu.
					</Typography>
					{isError && (
						<Typography variant="body1">
							{error &&
								String((error as FetchBaseQueryError).data)}
						</Typography>
					)}
					<TextField
						label="Username"
						name="username"
						value={formData.username}
						onChange={handleChange}
						required
					/>
					<TextField
						label="Email"
						name="email"
						value={formData.email}
						onChange={handleChange}
						required
					/>
					<TextField
						label="Password"
						name="password"
						type="password"
						value={formData.password}
						onChange={handleChange}
						required
					/>
				</CardContent>
				<CardActions sx={{ padding: "1rem" }}>
					<Button
						type="submit"
						variant="contained"
						disabled={
							isLoading ||
							!formData.username ||
							!formData.email ||
							!formData.password
						}
					>
						{isLoading ? "Prijava u tijeku..." : "Kreiraj"}
					</Button>
				</CardActions>
			</Card>
			<Button
				variant="text"
				startIcon={<KeyboardBackspaceIcon />}
				onClick={() => navigate("/login")}
			>
				Povratak na prijavu
			</Button>
		</Stack>
	);
}
