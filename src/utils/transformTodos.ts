import { Todo } from "../components/TodoItem/TodoItemProps";
import { TodoLists } from "../store/types";

export const transformTodosToTodoLists = (todos: Todo[]): TodoLists => {
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
  }, {} as TodoLists);
};
