import { ReactNode } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";

import { AppState } from "@/store/types";
import TodoListPage from "./TodoListPage";
import todoListsReducer from "../../store/slices/todoListsSlice";

const initialState: AppState = {
  lists: {
    1: {
      id: 1,
      name: "Test List",
      todoList: [
        { id: 1, userId: 1, title: "Test Todo 1", completed: false },
        { id: 2, userId: 1, title: "Test Todo 2", completed: true },
      ],
    },
  },
  loading: false,
  error: null,
};

const renderWithProviders = (ui: ReactNode, state?: AppState) => {
  const store = configureStore({
    reducer: {
      todos: todoListsReducer,
    },
    preloadedState: { todos: state ?? initialState },
  });

  return render(
    <Provider store={store}>
      <Router>{ui}</Router>
    </Provider>
  );
};

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({ id: "1" }),
}));

const mockUpdateTodo = jest.fn();
const mockCreateTodo = jest.fn();
const mockDeleteTodo = jest.fn();

jest.mock("../../store", () => ({
  ...jest.requireActual("../../store"),
  useUpdateTodoMutation: () => [mockUpdateTodo],
  useCreateTodoMutation: () => [mockCreateTodo],
  useDeleteTodoMutation: () => [mockDeleteTodo],
}));

const mockEnqueueSnackbar = jest.fn();

jest.mock("notistack", () => ({
  enqueueSnackbar: (message: string, options: { variant: string }) =>
    mockEnqueueSnackbar(message, options),
}));

describe("TodoListPage", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders loading state correctly", () => {
    renderWithProviders(<TodoListPage />, { ...initialState, loading: true });

    expect(screen.getByTestId("loading-backdrop")).toBeInTheDocument();
  });

  test("displays todos and filter buttons", async () => {
    renderWithProviders(<TodoListPage />);

    expect(screen.getByTestId("todo-list-page")).toBeInTheDocument();
    expect(screen.getByTestId("todo-list-title")).toHaveTextContent(
      "Test List"
    );
    expect(screen.getByTestId("filter-toggle-all")).toBeInTheDocument();
    expect(screen.getByTestId("filter-toggle-completed")).toBeInTheDocument();
    expect(screen.getByTestId("filter-toggle-pending")).toBeInTheDocument();
  });

  test("opens the create/edit list modal on button click", async () => {
    renderWithProviders(<TodoListPage />);

    const addButton = screen.getByTestId("add-task-button");
    await userEvent.click(addButton);

    expect(screen.getByTestId("modal-container")).toBeInTheDocument();
  });

  test("filters todos correctly", async () => {
    renderWithProviders(<TodoListPage />);

    const filterPendingButton = screen.getByTestId("filter-toggle-pending");
    await userEvent.click(filterPendingButton);

    expect(screen.queryByText("Test Todo 1")).toBeInTheDocument();
    expect(screen.queryByText("Test Todo 2")).not.toBeInTheDocument();

    const filterCompletedButton = screen.getByTestId("filter-toggle-completed");
    await userEvent.click(filterCompletedButton);

    expect(screen.queryByText("Test Todo 2")).toBeInTheDocument();
    expect(screen.queryByText("Test Todo 1")).not.toBeInTheDocument();
  });

  test("toggles todo completion status", async () => {
    renderWithProviders(<TodoListPage />);

    const todoTitleEl = screen.getByTestId("todo-item-title-1");
    expect(todoTitleEl).not.toHaveStyle("text-decoration: line-through");

    await userEvent.click(todoTitleEl);

    expect(mockUpdateTodo).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 1,
        userId: 1,
        title: "Test Todo 1",
        completed: true,
      })
    );
  });

  test("handles adding a new todo", async () => {
    renderWithProviders(<TodoListPage />);

    const addButton = screen.getByTestId("add-task-button");
    await userEvent.click(addButton);

    const input = screen.getByLabelText(/Task Name/i);
    await userEvent.type(input, "New Todo");

    const submitButton = screen.getByRole("button", { name: /submit/i });
    await userEvent.click(submitButton);

    expect(mockCreateTodo).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "New Todo",
        userId: 1,
        completed: false,
      })
    );
  });

  test("handles deleting a todo", async () => {
    renderWithProviders(<TodoListPage />);

    const deleteButtonEl = screen.getByTestId("todo-item-delete-button-2");
    await userEvent.click(deleteButtonEl);

    const confirmButtonEl = screen.getByTestId("confirm-button");
    await userEvent.click(confirmButtonEl);

    expect(mockDeleteTodo).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 2,
        userId: 1,
      })
    );
  });

  test("displays state error correctly", async () => {
    const errorState = { ...initialState, error: "Failed to fetch todos" };
    renderWithProviders(<TodoListPage />, errorState);

    expect(mockEnqueueSnackbar).toHaveBeenCalledWith(
      "Failed to fetch todos",
      expect.objectContaining({ variant: "error", autoHideDuration: 3000 })
    );
  });
});
