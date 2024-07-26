import { Todo } from "../components/TodoItem/TodoItemProps";
import { TodoList } from "../components/TodoList/TodoListProps";

export interface StoreState {
  lists: Record<string, TodoList>;
}

export enum StateActionTypes {
  ADD_TODO = "ADD_TODO",
  TOGGLE_TODO = "TOGGLE_TODO",
  ADD_TODO_LIST = "ADD_TODO_LIST",
  DELETE_TODO = "DELETE_TODO",
  EDIT_TODO_LIST = "EDIT_TODO_LIST",
  DELETE_TODO_LIST = "DELETE_TODO_LIST",
}

export type StateAction =
  | {
      type: StateActionTypes.ADD_TODO;
      payload: { listId: string; todo: Todo };
    }
  | {
      type: StateActionTypes.TOGGLE_TODO;
      payload: { listId: string; todoId: number };
    }
  | {
      type: StateActionTypes.ADD_TODO_LIST;
      payload: { id: string; list: TodoList };
    }
  | {
      type: StateActionTypes.DELETE_TODO;
      payload: { listId: string; todoId: number };
    }
  | {
      type: StateActionTypes.EDIT_TODO_LIST;
      payload: { id: string; list: Partial<TodoList> };
    }
  | { type: StateActionTypes.DELETE_TODO_LIST; payload: { listId: string } };
