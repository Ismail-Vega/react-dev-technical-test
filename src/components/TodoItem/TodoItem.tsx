import { memo } from "react";
import { TodoItemProps } from "./TodoItemProps";

const TodoItem = memo(({ todo, onStatusChange }: TodoItemProps) => {
  const { id, completed, description } = todo;

  const handleStatusChange = () => {
    onStatusChange(id);
  };

  return (
    <li
      onClick={handleStatusChange}
      style={{
        textAlign: "start",
        textDecoration: completed ? "line-through" : "none",
      }}
    >
      {description}
    </li>
  );
});

export default TodoItem;
