import todoListsReducer, {
  setLoading,
  setError,
  updateTodoList,
  addTodoList,
  deleteTodoList,
} from "../slices/todoListsSlice";
import { AppState } from "../types";
import { TodoList } from "../../components/TodoList/TodoListProps";

describe("todoListsSlice", () => {
  const initialState: AppState = {
    lists: {},
    loading: false,
    error: null,
  };

  it("should handle initial state", () => {
    expect(todoListsReducer(undefined, { type: "unknown" })).toEqual(
      initialState
    );
  });

  it("should handle setLoading", () => {
    const action = setLoading(true);
    const newState = todoListsReducer(initialState, action);
    expect(newState.loading).toBe(true);
  });

  it("should handle setError", () => {
    const action = setError("Some error");
    const newState = todoListsReducer(initialState, action);
    expect(newState.error).toBe("Some error");
  });

  it("should handle addTodoList", () => {
    const newTodoList: TodoList = {
      id: 1,
      name: "list1",
      todoList: [],
    };
    const action = addTodoList({ id: 1, list: newTodoList });
    const newState = todoListsReducer(initialState, action);
    expect(newState.lists[1]).toEqual(newTodoList);
  });

  it("should handle updateTodoList", () => {
    const initialStateWithList: AppState = {
      ...initialState,
      lists: {
        1: {
          id: 1,
          name: "list1",
          todoList: [],
        },
      },
    };
    const action = updateTodoList({
      id: 1,
      list: { name: "updatedList1" },
    });
    const newState = todoListsReducer(initialStateWithList, action);
    expect(newState.lists[1].name).toBe("updatedList1");
  });

  it("should handle deleteTodoList", () => {
    const initialStateWithList: AppState = {
      ...initialState,
      lists: {
        1: {
          id: 1,
          name: "list1",
          todoList: [],
        },
      },
    };
    const action = deleteTodoList({ listId: 1 });
    const newState = todoListsReducer(initialStateWithList, action);
    expect(newState.lists[1]).toBeUndefined();
  });

  it("should not change state for unknown action", () => {
    const action = { type: "UNKNOWN_ACTION" };
    const newState = todoListsReducer(initialState, action);
    expect(newState).toEqual(initialState);
  });

  it("should handle updateTodoList with non-existent list", () => {
    const action = updateTodoList({
      id: 2,
      list: { name: "nonExistentList" },
    });

    const newState = todoListsReducer(initialState, action);
    expect(newState.lists[2]).toBeUndefined();
  });

  it("should clear loading and error state when setting lists", () => {
    const stateWithLoadingError: AppState = {
      lists: {},
      loading: true,
      error: "Some error",
    };
    const newTodoList: TodoList = {
      id: 1,
      name: "new list",
      todoList: [],
    };
    const action = addTodoList({ id: 1, list: newTodoList });
    const newState = todoListsReducer(stateWithLoadingError, action);
    expect(newState.loading).toBe(false);
    expect(newState.error).toBe(null);
  });
});
