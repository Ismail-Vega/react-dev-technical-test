export type TodoStatusHandler = (id: number) => void;

export interface Todo {
  id: number;
  name: string;
  completed: boolean;
  description: string;
}

export interface TodoItemProps {
  todo: Todo;
  onDelete: TodoStatusHandler;
  onStatusChange: TodoStatusHandler;
}
