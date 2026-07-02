import { Routes, Route } from "react-router";
import Register from "../pages/Register";
import Login from "../pages/Login";

export default function AppRoutes() {
	return (
		<Routes>
			<Route path="/" element={<Login />} />
			<Route path="/register" element={<Register />} />
		</Routes>
	);
}
