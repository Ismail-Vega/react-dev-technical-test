import { createApi } from "@reduxjs/toolkit/query/react";

import { fetchFromApi } from "../../services";
import { Todo } from "../../components/TodoItem/TodoItemProps";

export const todoListsApi = createApi({
  reducerPath: "api",
  baseQuery: fetchFromApi,
  endpoints: (builder) => ({
    getTodos: builder.query<Todo[], void>({
      query: () => ({ method: "GET", url: "/todos" }),
    }),
    getTodoById: builder.query<Todo, number>({
      query: (id) => ({ method: "GET", url: `/todos/${id}` }),
    }),
    createTodo: builder.mutation<Todo, Partial<Todo>>({
      query: (newTodo) => ({
        url: "/todos",
        method: "POST",
        body: newTodo,
      }),
    }),
    updateTodo: builder.mutation<Todo, Partial<Todo>>({
      query: (todo) => ({
        url: `/todos/${todo.id}`,
        method: "PATCH",
        body: todo,
      }),
    }),
    deleteTodo: builder.mutation<
      { success: boolean; id: number; userId: number },
      { id: number; userId: number }
    >({
      query: ({ id }) => ({
        url: `/todos/${id}`,
        method: "DELETE",
      }),
      transformResponse: (
        response: { success: boolean },
        _,
        { id, userId }
      ) => ({
        ...response,
        id,
        userId,
      }),
    }),
  }),
});

export const {
  useGetTodosQuery,
  useGetTodoByIdQuery,
  useCreateTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = todoListsApi;
