import React, { useState } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router";
import { useLoginMutation } from "../redux/auth/authSlice";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";

export default function LoginPage() {
	const navigate = useNavigate();

	const [usernameOrEmail, setUsernameOrEmail] = useState("");
	const [password, setPassword] = useState("");

	const [login, { isLoading }] = useLoginMutation();

	const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			await login({ usernameOrEmail, password }).unwrap();
			navigate("/");
		} catch (err) {
			console.error(err);
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
					maxWidth: 480,
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
						Prijavi se
					</Typography>
					<Typography variant="body1" align="center" gutterBottom>
						Prijavite se kako biste pregledali trenutno vrijeme i
						detaljnu petodnevnu vremensku prognozu za grad po vašem
						izboru.
					</Typography>
					<TextField
						id="username-input"
						label="Username / Email"
						variant="outlined"
						value={usernameOrEmail}
						onChange={(e) => setUsernameOrEmail(e.target.value)}
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
				</CardContent>
				<CardActions sx={{ padding: "1rem" }}>
					<Button
						type="submit"
						variant="contained"
						disabled={isLoading || !usernameOrEmail || !password}
					>
						{isLoading ? "Prijava u tijeku..." : "Prijavi se"}
					</Button>
				</CardActions>
			</Card>
			<Button variant="text" onClick={() => navigate("/register")}>
				Kreiraj novi profil
			</Button>
		</Stack>
	);
}
