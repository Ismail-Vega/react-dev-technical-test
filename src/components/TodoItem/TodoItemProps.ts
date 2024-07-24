export type TodoStatusHandler = (id: number) => void;

export interface Todo {
  id: number;
  completed: boolean;
  description: string;
}

export interface TodoItemProps {
  todo: Todo;
  onStatusChange: TodoStatusHandler;
}
