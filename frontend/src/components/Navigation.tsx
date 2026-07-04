import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { auth } from "../redux/auth/authSlice";
import { weather } from "../redux/weather/weatherSlice";
import { useLazyGetSearchHistoryQuery } from "../redux/search-history/searchHistory";
import { Box } from "@mui/material";

export default function Navigation() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [triggerGetSearchHistory] = useLazyGetSearchHistoryQuery();

	const handleLogout = () => {
		localStorage.removeItem("accessToken");
		localStorage.removeItem("refreshToken");
		dispatch(auth.util.resetApiState());
		dispatch(weather.util.resetApiState());

		navigate("/login");
	};

	const handleSearch = async () => {
		try {
			await triggerGetSearchHistory().unwrap();
			navigate("/search-history");
		} catch (error) {
			console.error("Greška pri dohvaćanju povijesti pretraga:", error);
		}
	};

	return (
		<Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, p: 2 }}>
			<Button variant="outlined" color="secondary" onClick={handleSearch}>
				Povijest pretraga
			</Button>
			<Button variant="outlined" color="secondary" onClick={handleLogout}>
				Odjavi se
			</Button>
		</Box>
	);
}
