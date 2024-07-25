import { createContext, Dispatch, useReducer } from "react";
import { todoReducer } from "./TodoReducer";
import { StateAction, StoreState } from "./types";
import { TodoProviderProps } from "./TodoProviderProps";

const initialState = {
  lists: {},
};

export const TodoContext = createContext<{
  state: StoreState;
  dispatch: Dispatch<StateAction>;
}>({ state: initialState, dispatch: () => null });

export const TodoProvider = ({ children }: TodoProviderProps) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};
