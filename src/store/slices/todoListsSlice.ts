import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AppState } from "../types";
import { todoListsApi } from "../apis/todoListsApi";
import { transformTodosToTodoLists } from "../../utils";
import { TodoList } from "../../components/TodoList/TodoListProps";

const initialState: AppState = {
  lists: {},
  loading: false,
  error: null,
};

const todoListsSlice = createSlice({
  name: "lists",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    updateTodoList: (
      state,
      action: PayloadAction<{ id: number; list: Partial<TodoList> }>
    ) => {
      const existingList = state.lists[action.payload.id];
      if (existingList) {
        state.lists = {
          ...state.lists,
          [action.payload.id]: {
            ...existingList,
            ...action.payload.list,
          },
        };
      }
    },
    addTodoList: (
      state,
      action: PayloadAction<{ id: number; list: TodoList }>
    ) => {
      state.lists[action.payload.id] = action.payload.list;
      state.loading = false;
      state.error = null;
    },
    deleteTodoList: (state, action: PayloadAction<{ listId: number }>) => {
      const { [action.payload.listId]: _, ...remainingLists } = state.lists;
      state.lists = remainingLists;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      todoListsApi.endpoints.getTodos.matchFulfilled,
      (state, { payload }) => {
        state.lists = transformTodosToTodoLists(payload);
        state.loading = false;
      }
    );
    builder.addMatcher(
      todoListsApi.endpoints.getTodos.matchRejected,
      (state, { error }) => {
        state.error = error.message || null;
        state.loading = false;
      }
    );
    builder.addMatcher(
      todoListsApi.endpoints.createTodo.matchFulfilled,
      (state, { payload }) => {
        if (!state.lists[payload.userId]) {
          state.lists[payload.userId] = {
            id: payload.userId,
            name: `list${payload.userId}`,
            todoList: [],
          };
        }

        state.lists[payload.userId].todoList.push(payload);
      }
    );
    builder.addMatcher(
      todoListsApi.endpoints.updateTodo.matchFulfilled,
      (state, { payload }) => {
        const index = state.lists[payload.userId].todoList.findIndex(
          (todo) => todo.id === payload.id
        );

        if (index >= 0) {
          const prevTodo = state.lists[payload.userId].todoList[index];
          state.lists[payload.userId].todoList[index] = {
            ...prevTodo,
            ...payload,
          };
        }
      }
    );
    builder.addMatcher(
      todoListsApi.endpoints.deleteTodo.matchFulfilled,
      (state, { payload }) => {
        if (payload.id && payload.userId)
          state.lists[payload.userId].todoList = state.lists[
            payload.userId
          ].todoList.filter((todo) => todo.id !== payload.id);
      }
    );
  },
});

export const {
  setLoading,
  setError,
  updateTodoList,
  addTodoList,
  deleteTodoList,
} = todoListsSlice.actions;
export default todoListsSlice.reducer;
