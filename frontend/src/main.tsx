import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

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
					<CssBaseline />
					<App />
				</ThemeProvider>
			</Provider>
		</BrowserRouter>
	</StrictMode>
);
