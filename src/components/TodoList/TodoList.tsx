import Stack from "@mui/material/Stack";
import TodoItem from "../TodoItem";
import { TodoListProps } from "./TodoListProps";

const TodoList = ({
  todoList,
  onTodoDelete,
  onTodoStatusChange,
}: TodoListProps) => {
  return (
    <Stack spacing={2} width="100%">
      {todoList.map((todo) => (
        <TodoItem
          todo={todo}
          key={todo.id}
          onDelete={onTodoDelete}
          onStatusChange={onTodoStatusChange}
        />
      ))}
    </Stack>
  );
};

export default TodoList;
