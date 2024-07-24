import { TodoItemProps } from "./TodoItemProps";

const TodoItem = ({ todo, onStatusChange }: TodoItemProps) => {
  const { id, completed, description } = todo;

  const handleStatusChange = () => {
    onStatusChange(id);
  };

  return (
    <li
      onClick={handleStatusChange}
      style={{
        textDecoration: completed ? "line-through" : "none",
      }}
    >
      {description}
    </li>
  );
};

export default TodoItem;
