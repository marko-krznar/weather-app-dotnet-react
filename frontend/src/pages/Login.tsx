import React, { useState } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router";
import { useLoginMutation } from "../redux/auth/authSlice";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

function Login() {
	const navigate = useNavigate();

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const [login, { isLoading, isError, error }] = useLoginMutation();

	const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			await login({ username, password }).unwrap();
			navigate("/");
		} catch (err) {
			console.error("Greška pri prijavi:", err);
		}
	};

	return (
		<Stack
			component="form"
			onSubmit={handleSubmit}
			spacing={2}
			noValidate
			autoComplete="off"
		>
			<Typography variant="h2">Dobrodošli u WeatherApp</Typography>
			<Typography variant="body1">
				Unesite željeni grad, provjerite vremenske prilike i detaljnu
				petodnevnu prognozu.
			</Typography>

			{isError && (
				<Typography color="error" variant="body2">
					{error && "data" in error
						? String((error as FetchBaseQueryError).data)
						: "Greška pri prijavi."}
				</Typography>
			)}

			<TextField
				id="username-input"
				label="Username / Email"
				variant="outlined"
				value={username}
				onChange={(e) => setUsername(e.target.value)}
				required
			/>
			<TextField
				id="password-input"
				label="Password"
				type="password"
				variant="outlined"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				required
			/>

			<Button type="submit" variant="contained" disabled={isLoading}>
				{isLoading ? "Prijava u tijeku..." : "Prijavi se"}
			</Button>

			<Button variant="text" onClick={() => navigate("/register")}>
				Register
			</Button>
		</Stack>
	);
}

export default Login;
