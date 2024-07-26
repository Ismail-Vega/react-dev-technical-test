import { Todo } from "../components/TodoItem/TodoItemProps";
import { TodoList } from "../components/TodoList/TodoListProps";

export interface StoreState {
  lists: Record<number, TodoList>;
  loading: boolean;
  error: string | null;
}

export enum StateActionTypes {
  ADD_TODO = "ADD_TODO",
  TOGGLE_TODO = "TOGGLE_TODO",
  ADD_TODO_LIST = "ADD_TODO_LIST",
  DELETE_TODO = "DELETE_TODO",
  ADD_TODO_LISTS = "ADD_TODO_LISTS",
  EDIT_TODO_LIST = "EDIT_TODO_LIST",
  DELETE_TODO_LIST = "DELETE_TODO_LIST",
  SET_LOADING = "SET_LOADING",
  SET_ERROR = "SET_ERROR",
}

export type StateAction =
  | {
      type: StateActionTypes.ADD_TODO;
      payload: { listId: number; todo: Todo };
    }
  | {
      type: StateActionTypes.TOGGLE_TODO;
      payload: { listId: number; todoId: number };
    }
  | {
      type: StateActionTypes.ADD_TODO_LIST;
      payload: { id: number; list: TodoList };
    }
  | {
      type: StateActionTypes.DELETE_TODO;
      payload: { listId: number; todoId: number };
    }
  | {
      type: StateActionTypes.ADD_TODO_LISTS;
      payload: { lists: Record<number, TodoList> };
    }
  | {
      type: StateActionTypes.EDIT_TODO_LIST;
      payload: { id: number; list: Partial<TodoList> };
    }
  | { type: StateActionTypes.DELETE_TODO_LIST; payload: { listId: number } }
  | { type: StateActionTypes.SET_LOADING; payload: { loading: boolean } }
  | { type: StateActionTypes.SET_ERROR; payload: { error: string | null } };
