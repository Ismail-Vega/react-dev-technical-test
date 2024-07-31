import { transformTodosToTodoLists } from "../utils";
import { Todo } from "../components/TodoItem/TodoItemProps";
import { TodoLists } from "../store/types";

describe("transformTodosToTodoLists", () => {
  it("should transform todos into TodoLists grouped by userId", () => {
    const todos: Todo[] = [
      { id: 1, userId: 1, title: "Todo 1", completed: false },
      { id: 2, userId: 1, title: "Todo 2", completed: false },
      { id: 3, userId: 2, title: "Todo 3", completed: true },
    ];

    const expectedTodoLists: TodoLists = {
      1: {
        id: 1,
        name: "list1",
        todoList: [
          { id: 1, userId: 1, title: "Todo 1", completed: false },
          { id: 2, userId: 1, title: "Todo 2", completed: false },
        ],
      },
      2: {
        id: 2,
        name: "list2",
        todoList: [{ id: 3, userId: 2, title: "Todo 3", completed: true }],
      },
    };

    const result = transformTodosToTodoLists(todos);
    expect(result).toEqual(expectedTodoLists);
  });

  it("should return an empty object if no todos are provided", () => {
    const todos: Todo[] = [];
    const result = transformTodosToTodoLists(todos);
    expect(result).toEqual({});
  });
});
