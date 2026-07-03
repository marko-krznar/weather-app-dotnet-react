import { Routes, Route } from "react-router";
import Register from "../pages/RegistationPage";
import Login from "../pages/LoginPage";
import WeatherPage from "../pages/WeatherPage";
import ProtectedRoute from "../components/ProtectedRoute";

export default function AppRoutes() {
	return (
		<Routes>
			<Route element={<ProtectedRoute />}>
				<Route path="/" element={<WeatherPage />} />
			</Route>
			<Route path="/login" element={<Login />} />
			<Route path="/register" element={<Register />} />
		</Routes>
	);
}
