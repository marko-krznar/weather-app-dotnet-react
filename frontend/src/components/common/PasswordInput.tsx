import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import type { PasswordInputProps } from "../../types/commonComponents";

export default function PasswordInput({
	value,
	onChange,
	showPassword,
	onToggleShowPassword,
	label = "Password",
	id = "password-input",
	required = false,
}: PasswordInputProps) {
	return (
		<FormControl variant="outlined" required={required}>
			<InputLabel htmlFor={id}>{label}</InputLabel>
			<OutlinedInput
				id={id}
				label={label}
				type={showPassword ? "text" : "password"}
				value={value}
				onChange={onChange}
				endAdornment={
					<InputAdornment position="end">
						<IconButton
							aria-label={showPassword ? "Sakrij lozinku" : "Prikaži lozinku"}
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
