import { createContext, Dispatch, useEffect, useReducer } from "react";
import { StateAction, StateActionTypes, StoreState } from "./types";
import { TodoProviderProps } from "./TodoProviderProps";
import { useFetchTodos } from "../hooks/useFetchTodos";
import { todoReducer } from "./todoReducer";
import { transformTodosToTodoLists } from "../utils";

const initialState = {
  lists: {},
  loading: false,
  error: null,
};

export const TodoContext = createContext<{
  state: StoreState;
  dispatch: Dispatch<StateAction>;
}>({ state: initialState, dispatch: () => null });

export const TodoProvider = ({ children }: TodoProviderProps) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const { todos, loading, error } = useFetchTodos();

  useEffect(() => {
    dispatch({ type: StateActionTypes.SET_LOADING, payload: { loading } });

    if (error) {
      dispatch({ type: StateActionTypes.SET_ERROR, payload: { error } });
    }

    if (todos.length > 0) {
      const todoLists = transformTodosToTodoLists(todos);
      dispatch({
        type: StateActionTypes.ADD_TODO_LISTS,
        payload: { lists: todoLists },
      });
    }
  }, [todos, loading, error]);

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};
