import { useSelector, useDispatch } from "react-redux";
import { Snackbar, Alert } from "@mui/material";
import { clearError } from "../redux/ui/uiSlice";
import type { RootStore } from "../redux/store";

export default function GlobalError() {
	const dispatch = useDispatch();

	const currentMessage = useSelector(
		(state: RootStore) => state.ui.errorMessage
	);

	const isOpen = Boolean(currentMessage);

	const handleClose = () => {
		dispatch(clearError());
	};

	return (
		<Snackbar
			open={isOpen}
			onClose={handleClose}
			anchorOrigin={{ vertical: "top", horizontal: "right" }}
		>
			<Alert severity="error" variant="filled" onClose={handleClose}>
				{currentMessage}
			</Alert>
		</Snackbar>
	);
}
