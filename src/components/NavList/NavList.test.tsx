import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";

import NavList from "./NavList";
import { MAX_NAV_ITEMS_SHOWN } from "../../constants";

const mockFilteredLists = (count: number) =>
  Array.from({ length: count }, (_, i) => ({
    id: `${i + 1}`,
    name: `Item ${i + 1}`,
  }));

const navigate = jest.fn();
const handleDrawerToggle = jest.fn();

const renderNavList = (filteredLists = mockFilteredLists(0)) =>
  render(
    <NavList
      filteredLists={filteredLists}
      navigate={navigate}
      handleDrawerToggle={handleDrawerToggle}
    />
  );

describe("NavList", () => {
  it("renders all visible list items", () => {
    const lists = mockFilteredLists(MAX_NAV_ITEMS_SHOWN);
    renderNavList(lists);

    lists.forEach(({ name }) => {
      expect(screen.getByText(name)).toBeInTheDocument();
    });
  });

  it("renders 'more items' text when there are more items than MAX_NAV_ITEMS_SHOWN", () => {
    const lists = mockFilteredLists(MAX_NAV_ITEMS_SHOWN + 5);
    renderNavList(lists);

    expect(screen.getByTestId("more-items")).toHaveTextContent(
      `+ 5 more items`
    );
  });

  it("does not render 'more items' text when there are not more items than MAX_NAV_ITEMS_SHOWN", () => {
    const lists = mockFilteredLists(MAX_NAV_ITEMS_SHOWN);
    renderNavList(lists);

    expect(screen.queryByTestId("more-items")).toBeNull();
  });

  it("calls handleDrawerToggle when a list item is clicked", async () => {
    const lists = mockFilteredLists(1);
    renderNavList(lists);

    await userEvent.click(screen.getAllByTestId(`list-nav-item-button-Item1`)[0]);

    expect(handleDrawerToggle).toHaveBeenCalled();
  });

  it("calls navigate with the correct path when a list item is clicked", async () => {
    const lists = mockFilteredLists(1);
    renderNavList(lists);

    await userEvent.click(screen.getAllByTestId(`list-nav-item-button-Item1`)[0]);

    expect(navigate).toHaveBeenCalledWith(`/list/1`);
  });
});
