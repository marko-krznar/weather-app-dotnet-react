import Button from "@mui/material/Button";
import { useNavigate } from "react-router";

export default function Navigation() {
	const navigate = useNavigate();

	const handleLogout = () => {
		localStorage.removeItem("accessToken");
		localStorage.removeItem("refreshToken");

		navigate("/login");
	};

	return (
		<Button variant="outlined" color="secondary" onClick={handleLogout}>
			Odjavi se
		</Button>
	);
}
