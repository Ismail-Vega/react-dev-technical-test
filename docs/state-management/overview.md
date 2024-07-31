# API and Redux Documentation

## API Service with RTK Query

The state is managed through an API service using Redux Toolkit's `createApi` to manage Todo-related operations and `todoListsSlice` for managing the state related to todo lists.

### Todo Lists API

The `todoListsApi` provides endpoints for CRUD operations on Todo items.

#### Endpoints

- **`getTodos`**: Retrieves a list of todos.

  ```typescript
  getTodos: builder.query<Todo[], void>({
    query: () => ({ method: "GET", url: "/todos" }),
  });
  ```

- **`getTodoById`**: Retrieves a todo item by its ID.

  ```typescript
  getTodoById: builder.query<Todo, number>({
    query: (id) => ({ method: "GET", url: `/todos/${id}` }),
  }),
  ```

- **`createTodo`**: Creates a new todo item.

  ```typescript
  createTodo: builder.mutation<Todo, Partial<Todo>>({
    query: (newTodo) => ({
      url: "/todos",
      method: "POST",
      body: newTodo,
    }),
  }),
  ```

- **`updateTodo`**: Updates an existing todo item.

  ```typescript
  updateTodo: builder.mutation<Todo, Partial<Todo>>({
    query: (todo) => ({
      url: `/todos/${todo.id}`,
      method: "PATCH",
      body: todo,
    }),
  }),
  ```

- **`deleteTodo`**: Deletes a todo item by its ID.

  ```typescript
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
  ```

#### Hooks

- **`useGetTodosQuery`**: Hook for fetching todos.
- **`useGetTodoByIdQuery`**: Hook for fetching a todo by ID.
- **`useCreateTodoMutation`**: Hook for creating a new todo.
- **`useUpdateTodoMutation`**: Hook for updating a todo.
- **`useDeleteTodoMutation`**: Hook for deleting a todo.

### Todo Lists Slice

The `todoListsSlice` manages the state of todo lists including loading and error states, and updates to the lists based on API interactions.

#### Initial State

- **lists**: An object mapping list IDs to their respective todo lists.
- **loading**: A boolean indicating loading state.
- **error**: A string or null indicating error state.

#### Reducers

- **`setLoading`**: Sets the loading state.

  ```typescript
  setLoading: (state, action: PayloadAction<boolean>) => {
    state.loading = action.payload;
  },
  ```

- **`setError`**: Sets the error state.

  ```typescript
  setError: (state, action: PayloadAction<string | null>) => {
    state.error = action.payload;
  },
  ```

- **`updateTodoList`**: Updates a specific todo list.

  ```typescript
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
  ```

- **`addTodoList`**: Adds a new todo list.

  ```typescript
  addTodoList: (
    state,
    action: PayloadAction<{ id: number; list: TodoList }>
  ) => {
    state.lists[action.payload.id] = action.payload.list;
    state.loading = false;
    state.error = null;
  },
  ```

- **`deleteTodoList`**: Deletes a todo list.

  ```typescript
  deleteTodoList: (state, action: PayloadAction<{ listId: number }>) => {
    const { [action.payload.listId]: _, ...remainingLists } = state.lists;
    state.lists = remainingLists;
  },
  ```

#### Extra Reducers

- **`todoListsApi.endpoints.getTodos.matchFulfilled`**: Updates the state with todos when the `getTodos` request is successful.
- **`todoListsApi.endpoints.getTodos.matchRejected`**: Sets error and loading states when the `getTodos` request fails.
- **`todoListsApi.endpoints.createTodo.matchFulfilled`**: Adds the newly created todo to the appropriate list.
- **`todoListsApi.endpoints.updateTodo.matchFulfilled`**: Updates the specified todo in the list.
- **`todoListsApi.endpoints.deleteTodo.matchFulfilled`**: Removes the specified todo from the list.

#### Actions and Reducer

- **Actions**: `setLoading`, `setError`, `updateTodoList`, `addTodoList`, `deleteTodoList`
- **Reducer**: Default export of the slice reducer.
