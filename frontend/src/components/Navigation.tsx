import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { auth } from "../redux/auth/authSlice";
import { weather } from "../redux/weather/weatherSlice";
import { Divider, IconButton, Stack } from "@mui/material";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import { search } from "../redux/search/search";
import { resetLocation } from "../redux/ui/uiSlice";

export default function Navigation() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const location = useLocation();

	const handleLogout = () => {
		navigate("/login");

		dispatch(resetLocation());

		dispatch(auth.util.resetApiState());
		dispatch(weather.util.resetApiState());
		dispatch(search.util.resetApiState());

		localStorage.removeItem("accessToken");
		localStorage.removeItem("refreshToken");
	};

	const getVariant = (path) => (location.pathname === path ? "contained" : "text");

	return (
		<>
			<Stack direction="row" spacing={2} sx={{ paddingBlock: 2 }}>
				<IconButton aria-label="sunny" onClick={() => navigate("/")}>
					<WbSunnyIcon />
				</IconButton>
				<Stack direction="row" spacing={2} sx={{ flexGrow: 1, justifyContent: "flex-end" }}>
					<Button variant={getVariant("/")} onClick={() => navigate("/")}>
						Naslovna
					</Button>
					<Button variant={getVariant("/stats")} onClick={() => navigate("/stats")}>
						Statistika
					</Button>
					<Button variant={getVariant("/history")} onClick={() => navigate("/history")}>
						Povijest
					</Button>
					<Button variant="text" onClick={handleLogout}>
						Odjavi se
					</Button>
				</Stack>
			</Stack>
			<Divider sx={{ mb: 4 }} />
		</>
	);
}
