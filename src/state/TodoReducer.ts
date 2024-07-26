import { StateAction, StoreState, StateActionTypes } from "./types";

export const todoReducer = (
  state: StoreState,
  action: StateAction
): StoreState => {
  switch (action.type) {
    case StateActionTypes.ADD_TODO:
      return {
        ...state,
        lists: {
          ...state.lists,
          [action.payload.listId]: {
            ...state.lists[action.payload.listId],
            todoList: [
              ...state.lists[action.payload.listId].todoList,
              action.payload.todo,
            ],
          },
        },
      };
    case StateActionTypes.TOGGLE_TODO:
      return {
        ...state,
        lists: {
          ...state.lists,
          [action.payload.listId]: {
            ...state.lists[action.payload.listId],
            todoList: state.lists[action.payload.listId].todoList.map((todo) =>
              todo.id === action.payload.todoId
                ? { ...todo, completed: !todo.completed }
                : todo
            ),
          },
        },
      };
    case StateActionTypes.ADD_TODO_LIST:
      return {
        ...state,
        lists: {
          ...state.lists,
          [action.payload.id]: action.payload.list,
        },
      };
    case StateActionTypes.DELETE_TODO:
      return {
        ...state,
        lists: {
          ...state.lists,
          [action.payload.listId]: {
            ...state.lists[action.payload.listId],
            todoList: state.lists[action.payload.listId].todoList.filter(
              (todo) => todo.id !== action.payload.todoId
            ),
          },
        },
      };
    case StateActionTypes.DELETE_TODO_LIST: {
      const { [action.payload.listId]: _, ...remainingLists } = state.lists;
      return {
        ...state,
        lists: remainingLists,
      };
    }
    case StateActionTypes.EDIT_TODO_LIST:
      return {
        ...state,
        lists: {
          ...state.lists,
          [action.payload.id]: {
            ...state.lists[action.payload.id],
            ...action.payload.list,
          },
        },
      };

    default:
      return state;
  }
};
