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
import PasswordInput from "../components/common/PasswordInput";
import Alert from "@mui/material/Alert";

export default function RegistationPage() {
	const navigate = useNavigate();
	const [register, { isLoading, isError, error }] = useRegisterMutation();
	const [isSuccess, setIsSuccess] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [formData, setFormData] = useState({
		username: "",
		email: "",
		password: "",
	});

	const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			await register(formData).unwrap();
			setIsSuccess(true);
			setTimeout(() => {
				navigate("/login");
			}, 2000);
		} catch (err) {
			setIsSuccess(false);
			console.error("Greška pri prijavi:", err);
		}
	};

	return (
		<Stack spacing={2} sx={{ flexGrow: 1, justifyContent: "center", alignItems: "center" }}>
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
					<Typography variant="h2" component="p" align="center" sx={{ textTransform: "uppercase" }}>
						Regitriraj se
					</Typography>
					<Typography variant="body1" align="center" gutterBottom>
						Za korištenje WeatherApp-a potrebno je kreirati korisnički profil. Nakon registracije moći ćete
						pretraživati gradove te pregledavati trenutačno vrijeme i petodnevnu vremensku prognozu.
					</Typography>
					{isError && (
						<Typography variant="body1">{error && String((error as FetchBaseQueryError).data)}</Typography>
					)}
					<TextField
						label="Username"
						name="username"
						value={formData.username}
						onChange={(e) => setFormData((prev) => ({ ...prev, username: e.target.value }))}
						required
					/>
					<TextField
						label="Email"
						name="email"
						value={formData.email}
						onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
						required
					/>
					<PasswordInput
						value={formData.password}
						onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
						showPassword={showPassword}
						onToggleShowPassword={() => setShowPassword(!showPassword)}
						required
					/>
				</CardContent>
				<CardActions sx={{ padding: "1rem" }}>
					<Button
						type="submit"
						variant="contained"
						disabled={isLoading || !formData.username || !formData.email || !formData.password}
					>
						{isLoading ? "Registracija u tijeku..." : "Kreiraj"}
					</Button>
				</CardActions>
			</Card>
			<Button variant="text" startIcon={<KeyboardBackspaceIcon />} onClick={() => navigate("/login")}>
				Povratak na prijavu
			</Button>
			{isSuccess && (
				<Alert
					variant="filled"
					severity="success"
					sx={{
						position: "absolute",
						top: 16,
						left: 16,
						right: 16,
						zIndex: 10,
					}}
				>
					Korisnik je uspješno registriran. Za nekoliko sekundi bit ćete automatski preusmjereni na stranicu
					za prijavu.
				</Alert>
			)}
		</Stack>
	);
}
