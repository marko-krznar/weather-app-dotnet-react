const API_URL = import.meta.env.VITE_API_BASE_URL;

export const login = async (username, password) => {
	const response = await fetch(`${API_URL}/auth/login`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ username, password }),
	});

	if (!response.ok) {
		throw new Error("Neuspješna prijava. Provjerite podatke.");
	}

	const token = await response.text();

	localStorage.setItem("token", token);

	return token;
};
