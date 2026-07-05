import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
	globalIgnores(["dist"]),
	{
		files: ["**/*.{ts,tsx}"],
		extends: [
			js.configs.recommended,
			tseslint.configs.recommended,
			reactHooks.configs.flat.recommended,
			reactRefresh.configs.vite,
		],

		languageOptions: {
			globals: globals.browser,
		},
		rules: {
			// React Hooks rules
			"react-hooks/rules-of-hooks": "error", // Enforce rules of hooks
			"react-hooks/exhaustive-deps": "warn", // Warn about missing dependencies in useEffect

			// General best practices
			"no-console": [
				"warn", // Treat as warning
				{ allow: ["warn", "error"] }, // Allow console.warn and console.error
			],

			"no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
			eqeqeq: "error", // Enforce strict equality (=== and !==)

			// TypeScript-specific rules
			"@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }], // No unused variables in TypeScript
		},
	},
]);
