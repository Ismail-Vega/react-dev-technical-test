import { MouseEvent } from "react";

export type TodoStatusHandler = (id: number) => void;

export interface Todo {
  id: number;
  name: string;
  completed: boolean;
  description: string;
}

export interface TodoItemProps {
  todo: Todo;
  isPopupOpen: boolean;
  onPopupClose: () => void;
  onDelete: TodoStatusHandler;
  onStatusChange: TodoStatusHandler;
  onPopupOpen: (id: number, event: MouseEvent) => void;
}
