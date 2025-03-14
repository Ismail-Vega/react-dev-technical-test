import { Todo } from "../../components/TodoItem/TodoItemProps";

export type TodosResponse = Todo[];

export interface ApiResponse {
  data: TodosResponse;
  error?: string;
  status: number;
}
