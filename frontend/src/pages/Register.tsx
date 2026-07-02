import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useNavigate } from "react-router";
import { useRegisterMutation } from "../redux/auth/authSlice";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

function Register() {
	const navigate = useNavigate();

	// Hook vraća funkciju 'login' i objekt sa stanjima poput isLoading i error
	const [register, { isLoading, isError, error }] = useRegisterMutation();

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleSubmit = async (e: any) => {
		e.preventDefault();
		try {
			// .unwrap() omogućuje da uhvatiš grešku u catch bloku ako backend vrati npr. 401 ili 403
			await register({ username: "test", password: "test" }).unwrap();

			// Ako je uspješno, token je već spremljen u localStorage (zbog onQueryStarted)
			alert("Uspješna prijava!");
			// Ovdje možeš napraviti preusmjeravanje (npr. navigate("/dashboard"))
		} catch (err) {
			// Greška je već uhvaćena i bit će prikazana u UI-ju preko 'error' objekta
			console.error("Greška pri prijavi:", err);
		}
	};

	return (
		<Stack spacing={2}>
			<Button
				variant="text"
				startIcon={<KeyboardBackspaceIcon />}
				onClick={() => navigate("/login")}
			>
				Back
			</Button>

			<Typography variant="h2">Dobrodošli u WeatherApp</Typography>
			<Typography variant="body1">
				Unesite željeni grad, provjerite vremenske prilike i detaljnu
				petodnevnu prognozu.
			</Typography>
			{isError && (
				<Typography variant="body1">
					{error && String((error as FetchBaseQueryError).data)}
				</Typography>
			)}
			<TextField
				id="outlined-basic"
				label="Username"
				variant="outlined"
			/>
			<TextField id="outlined-basic" label="Email" variant="outlined" />
			<TextField
				id="outlined-basic"
				label="Password"
				variant="outlined"
			/>
			<Button variant="contained" onClick={handleSubmit}>
				{isLoading ? "Registering" : "Register"}
			</Button>
		</Stack>
	);
}

export default Register;
