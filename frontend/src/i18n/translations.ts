export const Language = {
	HR: "hr",
} as const;

export type LanguageType = (typeof Language)[keyof typeof Language];

export const translations = {
	[Language.HR]: {
		auth: {
			login: "Prijavi se",
			loggingIn: "Prijava u tijeku...",
			showPassword: "Prikaži lozinku",
			hidePassword: "Sakrij lozinku",
			usernameOrEmail: "Korisničko ime / E-mail",
			password: "Lozinka",
			createProfile: "Kreiraj novi profil",
			username: "Korisničko ime",
		},
	},
} as const;
