import { TodoList } from "../components/TodoList/TodoListProps";

export interface UIState {
  loading: boolean;
  error: string | null;
}

export interface TodoLists {
  [key: number]: TodoList;
}

export interface AppState extends UIState {
  lists: TodoLists;
}
