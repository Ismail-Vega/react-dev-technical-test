import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";

import SearchBar from "./SearchBar";

const onSearchChange = jest.fn();
const onClearSearch = jest.fn();

const renderSearchBar = (searchTerm = "") =>
  render(
    <SearchBar
      searchTerm={searchTerm}
      onSearchChange={onSearchChange}
      onClearSearch={onClearSearch}
    />
  );

describe("SearchBar", () => {
  it("renders with initial search term", () => {
    renderSearchBar("Initial Term");

    expect(screen.getByRole("textbox", { name: /Search lists/i })).toHaveValue(
      "Initial Term"
    );
  });

  it("calls onSearchChange when input value changes", async () => {
    renderSearchBar();

    const input = screen.getByRole("textbox");
    await userEvent.type(input, "New Term");

    expect(onSearchChange).toHaveBeenCalledTimes(8);
  });

  it("shows clear button when searchTerm is present", () => {
    renderSearchBar("Search Term");

    expect(screen.getByTestId("clear-button")).toBeInTheDocument();
  });

  it("does not show clear button when searchTerm is empty", () => {
    renderSearchBar("");

    expect(screen.queryByTestId("clear-button")).toBeNull();
  });

  it("calls onClearSearch when clear button is clicked", async () => {
    renderSearchBar("Search Term");

    await userEvent.click(screen.getByTestId("clear-button"));

    expect(onClearSearch).toHaveBeenCalled();
  });
});
