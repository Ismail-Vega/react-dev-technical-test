import { MouseEvent } from "react";

export type TodoStatusHandler = (id: number, listId: number) => void;

export interface Todo {
  /**
   * The id of the todo item.
   */
  id: number;
  /**
   * The text title of the todo item.
   */
  title: string;
  /**
   * Id of the task list to which this todo belongs.
   */
  userId: number;
  /**
   * Boolean indicating whether the todo item is completed.
   */
  completed: boolean;
}

export interface TodoItemProps {
  /**
   * The todo item.
   */
  todo: Todo;
  /**
   * Boolean indicating whether te delete confirmation popup is open.
   */
  isPopupOpen: boolean;
  /**
   * Callback function to handle closing the delete confirmation popup.
   */
  onPopupClose: () => void;
  /**
   * Callback function to handle deleting the todo item.
   */
  onDelete: TodoStatusHandler;
  /**
   * Callback function to handle toggling the completion status of the todo item.
   */
  onStatusChange: TodoStatusHandler;
  /**
   * Callback function to handle opening the delete confirmation popup.
   */
  onPopupOpen: (id: number, event: MouseEvent) => void;
}
