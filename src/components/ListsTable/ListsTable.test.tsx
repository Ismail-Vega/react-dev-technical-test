import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import ListsTable from "./ListsTable";
import { AppState } from "@/store/types";
import { RowMenuAction } from "./ListTableProps";

const mockStates = {
  loading: {
    loading: true,
    error: null,
    lists: {},
  },
  noLists: {
    loading: false,
    error: null,
    lists: {},
  },
  withLists: {
    loading: false,
    error: null,
    lists: {
      1: { id: 1, name: "Test List", todoList: [] },
    },
  },
};

const mockReducer = (
  state: AppState = { loading: false, error: null, lists: {} }
) => state;

const renderWithStore = (state: AppState, rowMenuActions?: RowMenuAction[]) => {
  const store = configureStore({
    preloadedState: { todos: state },
    reducer: { todos: mockReducer },
  });
  const mockRowMenuActions = [jest.fn(), jest.fn()];

  render(
    <Provider store={store}>
      <ListsTable rowMenuActions={rowMenuActions ?? mockRowMenuActions} />
    </Provider>
  );
};

describe("ListsTable", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("displays loading text when data is being fetched", () => {
    renderWithStore(mockStates.loading);

    expect(screen.getByTestId("loading-text")).toBeInTheDocument();
  });

  it("displays no lists found message when there are no rows", () => {
    renderWithStore(mockStates.noLists);

    expect(screen.getByTestId("no-lists-text")).toBeInTheDocument();
  });

  it("opens and closes the popper on icon click", async () => {
    renderWithStore(mockStates.withLists);

    const moreIconButton = screen.getByTestId("more-icon-1");
    await userEvent.click(moreIconButton);

    const popperEl = screen.getByTestId("popper-1");
    expect(popperEl).toBeVisible();

    await userEvent.click(document.body);
    expect(popperEl).not.toBeVisible();
  });

  it("calls edit and delete actions", async () => {
    const mockRowMenuActions = [jest.fn(), jest.fn()];
    renderWithStore(mockStates.withLists, mockRowMenuActions);

    const moreIconButton = screen.getByTestId("more-icon-1");
    await userEvent.click(moreIconButton);

    const editButton = screen.getByTestId("edit-button-1");

    await userEvent.click(editButton);
    expect(mockRowMenuActions[0]).toHaveBeenCalledWith(1);

    await userEvent.click(moreIconButton);
    const deleteButton = screen.getByTestId("delete-button-1");

    await userEvent.click(deleteButton);
    expect(mockRowMenuActions[1]).toHaveBeenCalledWith(1);
  });
});
