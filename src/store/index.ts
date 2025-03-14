import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import { todoListsApi } from "./apis/todoListsApi";
import todoListsReducer from "./slices/todoListsSlice";

const store = configureStore({
  reducer: {
    todos: todoListsReducer,
    [todoListsApi.reducerPath]: todoListsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(todoListsApi.middleware),
});

setupListeners(store.dispatch);

export {
  useGetTodosQuery,
  useGetTodoByIdQuery,
  useCreateTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} from "./apis/todoListsApi";

export type RootState = ReturnType<typeof store.getState>;
export default store;
