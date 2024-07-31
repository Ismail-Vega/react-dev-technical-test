import { ReactNode } from "react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { renderHook } from "@testing-library/react-hooks";

import { RootState } from "..";
import { todoListsApi } from "./todoListsApi";
import { useGetTodosQuery } from "./todoListsApi";
import todoListsReducer from "../slices/todoListsSlice";
import { apiResponseHandler } from "../../services/apiResponseHandler";

jest.mock("../../services/apiResponseHandler");

describe("todoListsApi integration", () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        todos: todoListsReducer,
        [todoListsApi.reducerPath]: todoListsApi.reducer,
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(todoListsApi.middleware),
    });
  });

  it("fetches todos and updates state", async () => {
    const mockedTodos = [
      { id: 1, userId: 1, title: "Todo 1", completed: false },
      { id: 2, userId: 1, title: "Todo 2", completed: false },
    ];

    (apiResponseHandler as jest.Mock).mockResolvedValueOnce({
      data: mockedTodos,
      status: 200,
      error: null,
    });

    const { result, waitForNextUpdate } = renderHook(() => useGetTodosQuery(), {
      wrapper: ({ children }: { children: ReactNode }) => (
        <Provider store={store}>{children}</Provider>
      ),
    });

    await waitForNextUpdate();

    const { data, error } = result.current;

    expect(data).toEqual(mockedTodos);
    expect(error).toBeUndefined();

    const state = store.getState() as RootState;
    expect(state.todos.lists[1].todoList).toEqual(mockedTodos);
  });
});
