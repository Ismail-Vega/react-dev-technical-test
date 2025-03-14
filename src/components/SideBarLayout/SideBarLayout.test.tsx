// SideBarLayout.test.tsx

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { BrowserRouter as Router } from "react-router-dom";

import SideBarLayout from "./SideBarLayout";
import { AppState } from "../../store/types";
import todoReducer from "../../store/slices/todoListsSlice";

const initialState: AppState = {
  lists: {
    1: { id: 1, name: "List 1", todoList: [] },
    2: { id: 2, name: "List 2", todoList: [] },
    3: { id: 3, name: "List 3", todoList: [] },
  },
  loading: false,
  error: null,
};

const renderWithStoreAndRouter = (
  ui: React.ReactElement,
  state = initialState
) => {
  const store = configureStore({
    reducer: { todos: todoReducer },
    preloadedState: { todos: state },
  });
  return render(
    <Provider store={store}>
      <Router>{ui}</Router>
    </Provider>
  );
};

describe("SideBarLayout", () => {
  it("renders the app bar with title", () => {
    renderWithStoreAndRouter(
      <SideBarLayout>
        <div />
      </SideBarLayout>
    );

    expect(screen.getByTestId("app-bar")).toBeInTheDocument();
    expect(screen.getByTestId("app-title")).toHaveTextContent(
      "React Developer Technical Test"
    );
  });

  it("renders the mobile menu button and toggles the drawer", async () => {
    window.matchMedia = jest.fn().mockImplementation((query) => {
      return {
        matches: query.includes("(max-width:600px)"),
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      };
    });

    renderWithStoreAndRouter(
      <SideBarLayout>
        <div />
      </SideBarLayout>
    );

    const menuButton = screen.getByTestId("menu-button");
    const mobileDrawerEl = screen.getByTestId("mobile-drawer");

    expect(mobileDrawerEl).toHaveAttribute("aria-hidden", "true");

    await userEvent.click(menuButton);
    expect(mobileDrawerEl).not.toHaveAttribute("aria-hidden", "true");

    await userEvent.click(menuButton);
    expect(mobileDrawerEl).toHaveAttribute("aria-hidden", "true");
  });

  it("renders the search bar and updates search term", async () => {
    renderWithStoreAndRouter(
      <SideBarLayout>
        <div />
      </SideBarLayout>
    );
    const searchInput = screen.getByRole("textbox");

    await userEvent.type(searchInput, "List 2");
    expect(searchInput).toHaveValue("List 2");
  });

  it("displays filtered lists based on search term", async () => {
    renderWithStoreAndRouter(
      <SideBarLayout>
        <div />
      </SideBarLayout>
    );
    const searchInput = screen.getByRole("textbox");
    const list1El = screen.getAllByTestId("list-nav-item-text-List1")[0];
    const list3El = screen.getAllByTestId("list-nav-item-text-List1")[0];

    await userEvent.type(searchInput, "List 2");
    expect(
      screen.getAllByTestId("list-nav-item-text-List2")[0]
    ).toBeInTheDocument();
    expect(list1El).not.toBeInTheDocument();
    expect(list3El).not.toBeInTheDocument();
  });

  it("clears the search term when clear button is clicked", async () => {
    renderWithStoreAndRouter(
      <SideBarLayout>
        <div />
      </SideBarLayout>
    );
    const searchInput = screen.getByRole("textbox");

    await userEvent.type(searchInput, "List 2");
    expect(searchInput).toHaveValue("List 2");

    const clearButton = screen.getAllByTestId("clear-button")[0];

    await userEvent.click(clearButton);
    expect(searchInput).toHaveValue("");
  });

  it("shows a loading skeleton when loading and lists are empty", async () => {
    const loadingState: AppState = { lists: {}, loading: true, error: null };

    renderWithStoreAndRouter(
      <SideBarLayout>
        <div />
      </SideBarLayout>,
      loadingState
    );

    expect(screen.getAllByTestId("loading-skeleton")[0]).toBeInTheDocument();
  });

  it("displays children content", () => {
    renderWithStoreAndRouter(
      <SideBarLayout>
        <div data-testid="child-content">Child Content</div>
      </SideBarLayout>
    );

    expect(screen.getByTestId("child-content")).toBeInTheDocument();
    expect(screen.getByTestId("child-content")).toHaveTextContent(
      "Child Content"
    );
  });
});
