import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";

import ListNavItem from "./ListNavItem";

describe("ListNavItem", () => {
  it("renders with correct text and icon", () => {
    const mockNavigate = jest.fn();
    const mockOnClick = jest.fn();

    render(
      <ListNavItem
        path="/test-path"
        value="Test Item"
        icon={<span>Icon</span>}
        onClick={mockOnClick}
        navigate={mockNavigate}
      />
    );

    expect(screen.getByTestId("list-nav-item-text-TestItem")).toHaveTextContent(
      "Test Item"
    );
    expect(screen.getByTestId("list-nav-item-icon")).toBeInTheDocument();
  });

  it("calls navigate and onClick when clicked", async () => {
    const mockNavigate = jest.fn();
    const mockOnClick = jest.fn();

    render(
      <ListNavItem
        path="/test-path"
        value="Test Item"
        icon={<span>Icon</span>}
        onClick={mockOnClick}
        navigate={mockNavigate}
      />
    );

    const listItemButton = screen.getByTestId("list-nav-item-button-TestItem");

    await userEvent.click(listItemButton);

    expect(mockNavigate).toHaveBeenCalledWith("/test-path");
    expect(mockOnClick).toHaveBeenCalled();
  });

  it("does not call onClick if not provided", async () => {
    const mockNavigate = jest.fn();
    const mockOnClick = jest.fn();
    
    render(
      <ListNavItem
        path="/test-path"
        value="Test Item"
        icon={<span>Icon</span>}
        navigate={mockNavigate}
      />
    );

    const listItemButton = screen.getByTestId("list-nav-item-button-TestItem");

    await userEvent.click(listItemButton);

    expect(mockNavigate).toHaveBeenCalledWith("/test-path");
    expect(mockOnClick).not.toHaveBeenCalled();
  });
});
