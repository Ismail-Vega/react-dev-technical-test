import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";

import TodoList from "./TodoList";

const mockTodoList = [
  { id: 1, title: "Todo 1", userId: 1, completed: false },
  { id: 2, title: "Todo 2", userId: 2, completed: true },
];

describe("TodoList", () => {
  it("renders a list of todos", () => {
    render(
      <TodoList
        todoList={mockTodoList}
        onTodoDelete={jest.fn()}
        onTodoStatusChange={jest.fn()}
      />
    );

    const list = screen.getByTestId("todo-list");
    expect(list).toBeInTheDocument();

    mockTodoList.forEach((todo) => {
      expect(screen.getByTestId(`todo-item-${todo.id}`)).toBeInTheDocument();
      expect(
        screen.getByTestId(`todo-item-title-${todo.id}`)
      ).toHaveTextContent(todo.title);
    });
  });

  it("opens and closes the confirmation popup on delete button click", async () => {
    const handleDelete = jest.fn();
    const handleStatusChange = jest.fn();

    render(
      <TodoList
        todoList={mockTodoList}
        onTodoDelete={handleDelete}
        onTodoStatusChange={handleStatusChange}
      />
    );

    const deleteButton = screen.getByTestId("todo-item-delete-button-1");
    await userEvent.click(deleteButton);

    const confirmPopup = screen.getByTestId("todo-item-confirmation-popup");
    expect(confirmPopup).toBeVisible();

    const cancelButton = screen.getByTestId("cancel-button");
    await userEvent.click(cancelButton);

    expect(confirmPopup).not.toBeVisible();
  });

  it("triggers onDelete and onStatusChange when actions are performed", async () => {
    const handleDelete = jest.fn();
    const handleStatusChange = jest.fn();

    render(
      <TodoList
        todoList={mockTodoList}
        onTodoDelete={handleDelete}
        onTodoStatusChange={handleStatusChange}
      />
    );

    const todoItem = screen.getByTestId("todo-item-title-1");
    await userEvent.click(todoItem);

    expect(handleStatusChange).toHaveBeenCalledWith(1, 1);

    const deleteButton = screen.getByTestId("todo-item-delete-button-1");
    await userEvent.click(deleteButton);

    const confirmButton = screen.getByTestId("confirm-button");
    await userEvent.click(confirmButton);

    expect(handleDelete).toHaveBeenCalledWith(1, 1);
  });
});
