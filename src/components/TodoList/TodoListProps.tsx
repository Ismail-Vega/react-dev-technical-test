import { Todo, TodoStatusHandler } from "../TodoItem/TodoItemProps";

export interface TodoListProps {
  todoList: Todo[];
  onTodoStatusChange: TodoStatusHandler;
}
