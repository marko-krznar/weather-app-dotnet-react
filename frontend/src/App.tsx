import Container from "@mui/material/Container";
import Routes from "./routes/Routes";
import GlobalError from "./components/GlobalError";
import GlobalLoading from "./components/GlobalLoading";

function App() {
	return (
		<Container
			sx={{
				minHeight: "100vh",
				display: "flex",
				flexDirection: "column",
			}}
		>
			<GlobalError />
			<GlobalLoading />
			<Routes />
		</Container>
	);
}

export default App;
