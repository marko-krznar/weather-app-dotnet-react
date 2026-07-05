import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const darkTheme = createTheme({
	palette: {
		mode: "dark",
	},
});

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<BrowserRouter>
			<Provider store={store}>
				<ThemeProvider theme={darkTheme}>
					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<CssBaseline />
						<App />
					</LocalizationProvider>
				</ThemeProvider>
			</Provider>
		</BrowserRouter>
	</StrictMode>
);
