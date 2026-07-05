import { Outlet } from "react-router";
import Navigation from "./Navigation";

export default function MainLayout() {
	return (
		<>
			<Navigation />
			<main style={{ flexGrow: 1, paddingBottom: "2rem" }}>
				<Outlet />
			</main>
		</>
	);
}
