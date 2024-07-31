import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";

import DrawerContent from "./DrawerContent";
import { DrawerContentProps } from "./DrawerContentProps";

describe("DrawerContent", () => {
  const defaultProps: DrawerContentProps = {
    searchTerm: "",
    onSearchChange: jest.fn(),
    onClearSearch: jest.fn(),
    filteredLists: [
      { id: "1", name: "List 1" },
      { id: "2", name: "List 2" },
    ],
    navigate: jest.fn(),
    handleDrawerToggle: jest.fn(),
    loading: false,
  };

  const setup = (props = {}) =>
    render(<DrawerContent {...defaultProps} {...props} />);

  it("renders home nav item", () => {
    setup();
    expect(screen.getByTestId("list-nav-item-button-Home")).toBeInTheDocument();
  });

  it("renders search bar with correct searchTerm", () => {
    setup({ searchTerm: "List 2" });

    expect(screen.getByTestId("search-bar")).toBeInTheDocument();
    expect(screen.getByTestId("list-nav-item-text-List2")).toHaveTextContent(
      "List 2"
    );
  });

  it("calls onSearchChange when search term changes", async () => {
    setup();
    const input = screen.getByRole("textbox");
    await userEvent.type(input, "Search Term");

    expect(defaultProps.onSearchChange).toHaveBeenCalledTimes(11);
  });

  it("calls onClearSearch when clear button is clicked", async () => {
    setup({ searchTerm: "Term" });
    await userEvent.click(screen.getByTestId("clear-button"));
    expect(defaultProps.onClearSearch).toHaveBeenCalled();
  });

  it("renders loading skeleton when loading and no lists are present", () => {
    setup({ loading: true, filteredLists: [] });
    expect(screen.getByTestId("loading-skeleton")).toBeInTheDocument();
  });

  it("does not render loading skeleton when not loading", () => {
    setup({ loading: false });
    expect(screen.queryByTestId("loading-skeleton")).not.toBeInTheDocument();
  });

  it("renders nav list with filtered lists", () => {
    setup();
    expect(screen.getByTestId("nav-list")).toBeInTheDocument();
    expect(screen.getByText("List 1")).toBeInTheDocument();
    expect(screen.getByText("List 2")).toBeInTheDocument();
  });

  it("handles navigation when nav item is clicked", async () => {
    setup();
    await userEvent.click(screen.getByTestId("list-nav-item-button-Home"));
    expect(defaultProps.navigate).toHaveBeenCalledWith("/");
    expect(defaultProps.handleDrawerToggle).toHaveBeenCalled();
  });

  it("does not call onClearSearch if search term is empty", async () => {
    setup({ searchTerm: "" });
    expect(
      screen.queryByRole("button", { name: /clear/i })
    ).not.toBeInTheDocument();
  });
});
