import List from "@mui/material/List";
import TodoItem from "../TodoItem";
import { TodoListProps } from "./TodoListProps";

const TodoList = ({ todoList, onTodoStatusChange }: TodoListProps) => {
  return (
    <List>
      {todoList.map((todo) => (
        <TodoItem
          todo={todo}
          key={todo.id}
          onStatusChange={onTodoStatusChange}
        />
      ))}
    </List>
  );
};

export default TodoList;
