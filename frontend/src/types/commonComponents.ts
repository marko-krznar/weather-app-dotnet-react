import type { ReactNode } from "react";

export interface PasswordInputProps {
	value: string;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	showPassword: boolean;
	onToggleShowPassword: () => void;
	label?: string;
	id?: string;
	required?: boolean;
}

export interface WeatherStatCardProps {
	icon: ReactNode;
	title: string;
	value: string | number;
	unit: string;
}
