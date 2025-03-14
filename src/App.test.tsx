import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import App from "./App";
import { RootState } from "./store";
import todoListsReducer from "./store/slices/todoListsSlice";

describe("App Component", () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        todos: todoListsReducer,
      },
    });
  });

  test("renders list title and create list button", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(screen.getByTestId("list-title")).toBeInTheDocument();
    expect(screen.getByTestId("create-list-button")).toBeInTheDocument();
  });

  test("opens modal on create list button click", async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    await userEvent.click(screen.getByTestId("create-list-button"));

    expect(screen.getByTestId("modal-container")).toBeInTheDocument();
    expect(screen.getByTestId("app-form")).toBeInTheDocument();
  });

  test("closes modal on modal close", async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    await userEvent.click(screen.getByTestId("create-list-button"));
    expect(screen.getByTestId("modal-container")).toBeInTheDocument();

    await userEvent.click(screen.getByTestId("modal-close-button"));
    expect(screen.queryByTestId("modal-container")).not.toBeInTheDocument();
  });

  test("creates a new list", async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    await userEvent.click(screen.getByTestId("create-list-button"));

    const input = screen.getByRole("textbox");
    await userEvent.type(input, "New List");

    const submitButton = screen.getByRole("button", { name: /Submit/i });
    await userEvent.click(submitButton);

    const state = store.getState() as RootState;
    expect(Object.values(state.todos.lists)).toHaveLength(1);
    expect(Object.values(state.todos.lists)[0].name).toBe("New List");
  });

  test("edits an existing list", async () => {
    store.dispatch({
      type: "lists/addTodoList",
      payload: { id: 1, list: { id: 1, name: "Old List", todoList: [] } },
    });

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const moreIconButton = screen.getByTestId("more-icon-1");
    await userEvent.click(moreIconButton);

    const editButton = screen.getByTestId("edit-button-1");
    await userEvent.click(editButton);

    const input = screen.getByRole("textbox");
    expect(input).toHaveValue("Old List");

    await userEvent.clear(input);
    await userEvent.type(input, "Updated List");

    const submitButton = screen.getByRole("button", { name: /Submit/i });
    await userEvent.click(submitButton);

    const state = store.getState() as RootState;
    expect(Object.values(state.todos.lists)[0].name).toBe("Updated List");
  });

  test("handles empty list name submission", async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    await userEvent.click(screen.getByTestId("create-list-button"));

    const input = screen.getByRole("textbox");
    await userEvent.clear(input);

    const submitButton = screen.getByRole("button", { name: /Submit/i });
    await userEvent.click(submitButton);

    expect(screen.getByTestId("modal-container")).toBeInTheDocument();

    const state = store.getState() as RootState;
    expect(Object.values(state.todos.lists)).toHaveLength(0);
  });

  test("deletes an existing list", async () => {
    store.dispatch({
      type: "lists/addTodoList",
      payload: { id: 1, list: { id: 1, name: "List to Delete", todoList: [] } },
    });

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const moreIconButton = screen.getByTestId("more-icon-1");
    await userEvent.click(moreIconButton);

    await userEvent.click(screen.getByTestId("delete-button-1"));

    const state = store.getState() as RootState;
    expect(Object.values(state.todos.lists)).toHaveLength(0);
  });

  test("shows correct initial title value when editing a list", async () => {
    store.dispatch({
      type: "lists/addTodoList",
      payload: { id: 2, list: { id: 2, name: "Initial Title", todoList: [] } },
    });

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const moreIconButton = screen.getByTestId("more-icon-2");
    await userEvent.click(moreIconButton);

    const editButton = screen.getByTestId("edit-button-2");
    await userEvent.click(editButton);

    const input = screen.getByRole("textbox");
    expect(input).toHaveValue("Initial Title");
  });

  test("modal should close after successful list creation", async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    await userEvent.click(screen.getByTestId("create-list-button"));

    const input = screen.getByRole("textbox");
    await userEvent.type(input, "New List");

    const modalEl = screen.queryByTestId("modal-container");
    const submitButton = screen.getByRole("button", { name: /Submit/i });
    await userEvent.click(submitButton);

    expect(modalEl).not.toBeInTheDocument();
  });
});
