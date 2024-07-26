import { Todo, TodoStatusHandler } from "../TodoItem/TodoItemProps";

export interface TodoList {
  id: string;
  name: string;
  description: string;
  todoList: Todo[];
}

export interface TodoListProps extends Pick<TodoList, "todoList"> {
  onTodoDelete: TodoStatusHandler;
  onTodoStatusChange: TodoStatusHandler;
}
