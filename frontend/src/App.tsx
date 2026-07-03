import Container from "@mui/material/Container";
import Routes from "./routes/Routes";

function App() {
	return (
		<Container
			sx={{
				minHeight: "100vh",
				display: "flex",
				flexDirection: "column",
			}}
		>
			<Routes />
		</Container>
	);
}

export default App;
