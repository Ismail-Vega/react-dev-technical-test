import { memo } from "react";
import { TodoItemProps } from "./TodoItemProps";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

const TodoItem = memo(({ todo, onStatusChange }: TodoItemProps) => {
  const { id, completed, description } = todo;

  const handleStatusChange = () => {
    onStatusChange(id);
  };

  return (
    <ListItem
      onClick={handleStatusChange}
      style={{
        textAlign: "start",
        textDecoration: completed ? "line-through" : "none",
      }}
    >
      <ListItemText primary={description} />
    </ListItem>
  );
});

export default TodoItem;
