import { Todo } from "../components/TodoItem/TodoItemProps";
import { TodoList } from "../components/TodoList/TodoListProps";

export const transformTodosToTodoLists = (
  todos: Todo[]
): Record<number, TodoList> => {
  return todos.reduce((acc, todo) => {
    const { userId } = todo;

    if (!acc[userId]) {
      acc[userId] = {
        id: userId,
        name: `list${userId}`,
        todoList: [],
      };
    }

    acc[userId].todoList.push(todo);
    return acc;
  }, {} as Record<number, TodoList>);
};
