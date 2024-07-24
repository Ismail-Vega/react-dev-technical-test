import TodoItem from "../TodoItem";
import { TodoListProps } from "./TodoListProps";

const TodoList = ({ todoList, onTodoStatusChange }: TodoListProps) => {
  return (
    <ul>
      {todoList.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onStatusChange={onTodoStatusChange} />
      ))}
    </ul>
  );
};

export default TodoList;
