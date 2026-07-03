import { Routes, Route } from "react-router";
import RegistationPage from "../pages/RegistationPage";
import LoginPage from "../pages/LoginPage";
import WeatherPage from "../pages/WeatherPage";
import ProtectedRoute from "../components/ProtectedRoute";

export default function AppRoutes() {
	return (
		<Routes>
			<Route element={<ProtectedRoute />}>
				<Route path="/" element={<WeatherPage />} />
			</Route>
			<Route path="/login" element={<LoginPage />} />
			<Route path="/register" element={<RegistationPage />} />
		</Routes>
	);
}
