import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useSelector } from "react-redux";
import type { RootStore } from "../redux/store";

export default function GlobalLoading() {
	const isLoading = useSelector((state: RootStore) => {
		const apiSlices = [state.auth, state.weather, state.search];

		return apiSlices.some((api) => {
			const queryPending = Object.values(api.queries).some((query) => query?.status === "pending");

			const mutationPending = Object.values(api.mutations).some((mutation) => mutation?.status === "pending");

			return queryPending || mutationPending;
		});
	});

	return (
		<Backdrop open={isLoading}>
			<CircularProgress color="inherit" />
		</Backdrop>
	);
}
