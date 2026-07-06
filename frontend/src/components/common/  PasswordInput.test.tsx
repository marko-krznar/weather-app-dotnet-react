import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PasswordInput from "./PasswordInput";

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

describe("PasswordInput", () => {
	it('renders "Password" label by default', () => {
		renderPasswordInput();

		expect(screen.getByLabelText("Password")).toBeInTheDocument();
	});

	it("renders custom label when provided", () => {
		renderPasswordInput({ label: "Lozinka" });

		expect(screen.getByLabelText("Lozinka")).toBeInTheDocument();
	});

	it('input type is "password" when showPassword is false', () => {
		renderPasswordInput({ showPassword: false });

		expect(screen.getByLabelText("Password")).toHaveAttribute("type", "password");
	});

	it('input type is "text" when showPassword is true', () => {
		renderPasswordInput({ showPassword: true });

		expect(screen.getByLabelText("Password")).toHaveAttribute("type", "text");
	});

	it("renders the current value of the field", () => {
		renderPasswordInput({ value: "tajna123" });

		expect(screen.getByLabelText("Password")).toHaveValue("tajna123");
	});

	it("calls onChange when the user types", async () => {
		const user = userEvent.setup();
		const props = renderPasswordInput();

		await user.type(screen.getByLabelText("Password"), "a");

		expect(props.onChange).toHaveBeenCalledTimes(1);
	});

	it("calls onToggleShowPassword when the eye icon is clicked", async () => {
		const user = userEvent.setup();
		const props = renderPasswordInput({ showPassword: false });

		await user.click(screen.getByRole("button", { name: "Prikaži lozinku" }));

		expect(props.onToggleShowPassword).toHaveBeenCalledTimes(1);
	});

	it("toggle button has correct aria-label when password is visible", () => {
		renderPasswordInput({ showPassword: true });

		expect(screen.getByRole("button", { name: "Sakrij lozinku" })).toBeInTheDocument();
	});

	it("input is required when required=true", () => {
		renderPasswordInput({ label: "Password", required: true });

		expect(screen.getByLabelText(/password/i)).toBeRequired();
	});
});
