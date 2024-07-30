import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import AppForm from "./AppForm";
import type { AppFormProps } from "./AppFormProps";

describe("AppForm", () => {
  const setup = (overrides: Partial<AppFormProps> = {}) => {
    const defaultProps: AppFormProps = {
      label: "Test Label",
      icon: <div />,
      onSubmit: jest.fn(),
      ...overrides,
    };

    render(<AppForm {...defaultProps} />);
    return defaultProps;
  };

  it("renders with default props", () => {
    setup();

    const input = screen.getByRole("textbox", { name: /Test Label/i });
    expect(input).toBeInTheDocument();

    const submitButton = screen.getByRole("button", { name: /Submit/i });
    expect(submitButton).toBeInTheDocument();
  });

  it("shows error message when the title is invalid", async () => {
    setup({ onSubmit: jest.fn() });

    const input = screen.getByRole("textbox", { name: /Test Label/i });
    const submitButton = screen.getByRole("button", { name: /submit/i });

    await userEvent.type(input, "a");
    await userEvent.click(submitButton);

    expect(
      screen.getByText(/Title must be at least 3 characters./i)
    ).toBeInTheDocument();
  });

  it("calls onSubmit with correct title", async () => {
    const onSubmit = jest.fn();
    setup({ onSubmit });
    const input = screen.getByRole("textbox", { name: /Test Label/i });

    await userEvent.type(input, "New Title");
    await userEvent.click(screen.getByRole("button", { name: /submit/i }));

    expect(onSubmit).toHaveBeenCalledWith("New Title");
    expect(input).toHaveValue("");
  });

  it("shows the correct character count", async () => {
    setup();
    const input = screen.getByRole("textbox", { name: /Test Label/i });

    await userEvent.type(input, "New Title");
    expect(screen.getByText("9/50")).toBeInTheDocument();
  });

  it("sets focus on the input when rendered", () => {
    setup();
    expect(screen.getByRole("textbox", { name: /Test Label/i })).toHaveFocus();
  });

  it("handles max title length correctly", async () => {
    setup();
    const input = screen.getByRole("textbox", { name: /Test Label/i });

    await userEvent.type(input, "a".repeat(55));
    expect(input).toHaveValue("a".repeat(50));
  });
});
