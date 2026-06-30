import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

function Login() {
	return (
		<Stack spacing={2}>
			<Typography variant="h2">Dobrodošli u WeatherApp</Typography>
			<Typography variant="body1">
				Unesite željeni grad, provjerite vremenske prilike i detaljnu
				petodnevnu prognozu.
			</Typography>
			<TextField id="outlined-basic" label="Email" variant="outlined" />
			<TextField
				id="outlined-basic"
				label="Password"
				variant="outlined"
			/>
			<Button variant="contained">Login</Button>
			<Button variant="text">Register</Button>
		</Stack>
	);
}

export default Login;
