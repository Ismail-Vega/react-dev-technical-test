import { MouseEvent } from "react";

export type TodoStatusHandler = (id: number, listId: number) => void;

export interface Todo {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
}

export interface TodoItemProps {
  todo: Todo;
  isPopupOpen: boolean;
  onPopupClose: () => void;
  onDelete: TodoStatusHandler;
  onStatusChange: TodoStatusHandler;
  onPopupOpen: (id: number, event: MouseEvent) => void;
}
