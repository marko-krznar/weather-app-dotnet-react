import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router";
import { useLoginMutation } from "../redux/auth/authSlice";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import PasswordInput from "../components/common/PasswordInput";
import { translations, Language } from "../i18n/translations";
import { setError, setLocation, startLoading } from "../redux/location/locationSlice";
import { useDispatch } from "react-redux";

export default function LoginPage() {
	const t = translations[Language.HR];
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [usernameOrEmail, setUsernameOrEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);

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

	useEffect(() => {
		if (!navigator.geolocation) {
			dispatch(setError("Geolocation is not supported by your browser."));
			return;
		}

		dispatch(startLoading());

		navigator.geolocation.getCurrentPosition(
			(position) => {
				dispatch(
					setLocation({
						lat: position.coords.latitude,
						lng: position.coords.longitude,
					})
				);
			},
			(err) => {
				dispatch(setError(err.message));
			}
		);
	}, [dispatch]);

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
					<Typography variant="h2" component="p" align="center" sx={{ textTransform: "uppercase" }}>
						{t.auth.login}
					</Typography>
					<Typography variant="body1" align="center" gutterBottom>
						Prijavite se kako biste pregledali trenutno vrijeme i detaljnu petodnevnu vremensku prognozu za
						grad po vašem izboru.
					</Typography>
					<TextField
						id="username-input"
						label={t.auth.usernameOrEmail}
						variant="outlined"
						value={usernameOrEmail}
						onChange={(e) => setUsernameOrEmail(e.target.value)}
						required
					/>
					<PasswordInput
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						showPassword={showPassword}
						onToggleShowPassword={() => setShowPassword(!showPassword)}
						required
					/>
				</CardContent>
				<CardActions sx={{ padding: "1rem" }}>
					<Button type="submit" variant="contained" disabled={isLoading || !usernameOrEmail || !password}>
						{isLoading ? t.auth.loggingIn : t.auth.login}
					</Button>
				</CardActions>
			</Card>
			<Button variant="text" onClick={() => navigate("/register")}>
				{t.auth.createProfile}
			</Button>
		</Stack>
	);
}
