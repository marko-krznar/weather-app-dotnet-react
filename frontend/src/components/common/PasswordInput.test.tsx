import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PasswordInput from "./PasswordInput";
import { translations, Language } from "../../i18n/translations";

function renderPasswordInput(overrides = {}) {
	const props = {
		value: "",
		onChange: vi.fn(),
		showPassword: false,
		onToggleShowPassword: vi.fn(),
		...overrides,
	};

	render(<PasswordInput {...props} />);
	return props;
}

const t = translations[Language.HR];

describe("PasswordInput", () => {
	it('renders "Password" label by default', () => {
		renderPasswordInput();

		expect(screen.getByLabelText(t.auth.password)).toBeInTheDocument();
	});

	it('input type is "password" when showPassword is false', () => {
		renderPasswordInput({ showPassword: false });

		expect(screen.getByLabelText(t.auth.password)).toHaveAttribute("type", "password");
	});

	it('input type is "text" when showPassword is true', () => {
		renderPasswordInput({ showPassword: true });

		expect(screen.getByLabelText(t.auth.password)).toHaveAttribute("type", "text");
	});

	it("renders the current value of the field", () => {
		renderPasswordInput({ value: "tajna123" });

		expect(screen.getByLabelText(t.auth.password)).toHaveValue("tajna123");
	});

	it("calls onChange when the user types", async () => {
		const user = userEvent.setup();
		const props = renderPasswordInput();

		await user.type(screen.getByLabelText(t.auth.password), "a");

		expect(props.onChange).toHaveBeenCalledTimes(1);
	});

	it("calls onToggleShowPassword when the eye icon is clicked", async () => {
		const user = userEvent.setup();
		const props = renderPasswordInput({ showPassword: false });

		await user.click(screen.getByRole("button", { name: t.auth.showPassword }));

		expect(props.onToggleShowPassword).toHaveBeenCalledTimes(1);
	});

	it("toggle button has correct aria-label when password is visible", () => {
		renderPasswordInput({ showPassword: true });

		expect(screen.getByRole("button", { name: t.auth.hidePassword })).toBeInTheDocument();
	});

	it("input is required when required=true", () => {
		renderPasswordInput({ required: true });

		const regex = new RegExp(t.auth.password, "i");
		expect(screen.getByLabelText(regex)).toBeRequired();
	});
});
