import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import type { PasswordInputProps } from "../../types/commonComponents";
import { translations, Language } from "../../i18n/translations";

export default function PasswordInput({
	value,
	onChange,
	showPassword,
	onToggleShowPassword,
	id = "password-input",
	required = false,
}: PasswordInputProps) {
	const t = translations[Language.HR];

	return (
		<FormControl variant="outlined" required={required}>
			<InputLabel htmlFor={id}>{t.auth.password}</InputLabel>
			<OutlinedInput
				id={id}
				label={t.auth.password}
				type={showPassword ? "text" : "password"}
				value={value}
				required={required}
				onChange={onChange}
				endAdornment={
					<InputAdornment position="end">
						<IconButton
							aria-label={showPassword ? t.auth.showPassword : t.auth.hidePassword}
							onClick={onToggleShowPassword}
							edge="end"
						>
							{showPassword ? <VisibilityOff /> : <Visibility />}
						</IconButton>
					</InputAdornment>
				}
			/>
		</FormControl>
	);
}
