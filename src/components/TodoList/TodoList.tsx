import { MouseEvent, useCallback, useState } from "react";
import Stack from "@mui/material/Stack";

import TodoItem from "../TodoItem";
import { TodoListProps } from "./TodoListProps";

const TodoList = ({
  todoList,
  onTodoDelete,
  onTodoStatusChange,
}: TodoListProps) => {
  const [openPopupId, setOpenPopupId] = useState<number | null>(null);

  const handlePopupOpen = useCallback((id: number, event: MouseEvent) => {
    event.stopPropagation();
    setOpenPopupId(id);
  }, []);

  const handlePopupClose = useCallback(() => {
    setOpenPopupId(null);
  }, []);

  return (
    <Stack spacing={2} width="100%">
      {todoList.map((todo) => (
        <TodoItem
          todo={todo}
          key={todo.id}
          onDelete={onTodoDelete}
          onPopupOpen={handlePopupOpen}
          onPopupClose={handlePopupClose}
          onStatusChange={onTodoStatusChange}
          isPopupOpen={openPopupId === todo.id}
        />
      ))}
    </Stack>
  );
};
export default TodoList;
