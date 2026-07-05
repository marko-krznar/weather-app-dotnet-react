import { Routes, Route } from "react-router";
import RegistationPage from "../pages/RegistationPage";
import LoginPage from "../pages/LoginPage";
import WeatherPage from "../pages/WeatherPage";
import ProtectedRoute from "./ProtectedRoute";
import SearchHistoryPage from "../pages/SearchHistoryPage";
import MainLayout from "../components/MainLayout";
import StatisticsPage from "../pages/StatisticsPage";

export default function AppRoutes() {
	return (
		<Routes>
			<Route element={<MainLayout />}>
				<Route element={<ProtectedRoute />}>
					<Route path="/" element={<WeatherPage />} />
				</Route>
				<Route path="/history" element={<SearchHistoryPage />} />
				<Route path="/stats" element={<StatisticsPage />} />
			</Route>

			<Route path="/login" element={<LoginPage />} />
			<Route path="/register" element={<RegistationPage />} />
		</Routes>
	);
}
