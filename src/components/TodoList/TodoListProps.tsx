import { Todo, TodoStatusHandler } from "../TodoItem/TodoItemProps";

export interface TodoList {
  /**
   * The id of the Todo List.
   */
  id: number;
  /**
   * The name of the Todo List.
   */
  name: string;
  /**
   * List of todo items, each containing an id, title, userId(List id), and completed status.
   */
  todoList: Todo[];
}

export interface TodoListProps extends Pick<TodoList, "todoList"> {
  /**
   * Callback function to handle deleting a todo item.
   * @param id - The id of the todo item to be deleted.
   * @param listId - The id of the task list to which the todo belongs.
   */
  onTodoDelete: TodoStatusHandler;
  /**
   * Callback function to handle toggling the completion status of a todo item.
   * @param id - The id of the todo item to be toggled.
   * @param listId - The id of the task list to which the todo belongs.
   */
  onTodoStatusChange: TodoStatusHandler;
}
