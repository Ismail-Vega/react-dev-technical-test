import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import TodoItem from "./TodoItem";

describe("TodoItem", () => {
  const todo = {
    id: 1,
    title: "Test Todo",
    userId: 1,
    completed: false,
  };

  const onDelete = jest.fn();
  const onStatusChange = jest.fn();
  const onPopupOpen = jest.fn();
  const onPopupClose = jest.fn();

  it("renders the todo item and its elements", () => {
    render(
      <TodoItem
        todo={todo}
        onDelete={onDelete}
        onStatusChange={onStatusChange}
        isPopupOpen={false}
        onPopupOpen={onPopupOpen}
        onPopupClose={onPopupClose}
      />
    );

    expect(screen.getByTestId(`todo-item-title-${todo.id}`)).toHaveTextContent(
      todo.title
    );
    expect(screen.getByTestId(`todo-item-${todo.id}`)).toBeInTheDocument();
    expect(
      screen.getByTestId(`todo-item-delete-button-${todo.id}`)
    ).toBeInTheDocument();
  });

  it("triggers status change on click", async () => {
    render(
      <TodoItem
        todo={todo}
        onDelete={onDelete}
        onStatusChange={onStatusChange}
        isPopupOpen={false}
        onPopupOpen={onPopupOpen}
        onPopupClose={onPopupClose}
      />
    );

    await userEvent.click(screen.getByTestId(`todo-item-title-${todo.id}`));
    expect(onStatusChange).toHaveBeenCalledWith(todo.id, todo.userId);
  });

  it("opens confirmation popup on delete button click", async () => {
    render(
      <TodoItem
        todo={todo}
        onDelete={onDelete}
        onStatusChange={onStatusChange}
        isPopupOpen={true}
        onPopupOpen={onPopupOpen}
        onPopupClose={onPopupClose}
      />
    );

    await userEvent.click(
      screen.getByTestId(`todo-item-delete-button-${todo.id}`)
    );
    expect(onPopupOpen).toHaveBeenCalledWith(todo.id, expect.anything());
    expect(
      screen.getByTestId(`todo-item-confirmation-popup`)
    ).toBeInTheDocument();
  });

  it("triggers delete action on confirmation", async () => {
    render(
      <TodoItem
        todo={todo}
        onDelete={onDelete}
        onStatusChange={onStatusChange}
        isPopupOpen={true}
        onPopupOpen={onPopupOpen}
        onPopupClose={onPopupClose}
      />
    );

    await userEvent.click(screen.getByTestId("confirm-button"));
    expect(onDelete).toHaveBeenCalledWith(todo.id, todo.userId);
  });

  it("closes the popup on cancel", async () => {
    render(
      <TodoItem
        todo={todo}
        onDelete={onDelete}
        onStatusChange={onStatusChange}
        isPopupOpen={true}
        onPopupOpen={onPopupOpen}
        onPopupClose={onPopupClose}
      />
    );

    await userEvent.click(screen.getByTestId("cancel-button"));
    expect(onPopupClose).toHaveBeenCalled();
  });

  it("correctly updates styles based on completion status", () => {
    render(
      <TodoItem
        todo={{ ...todo, completed: true }}
        onDelete={onDelete}
        onStatusChange={onStatusChange}
        isPopupOpen={false}
        onPopupOpen={onPopupOpen}
        onPopupClose={onPopupClose}
      />
    );

    const itemElement = screen.getByTestId(`todo-item-title-${todo.id}`);
    expect(itemElement).toHaveStyle("textDecoration: line-through");
  });
});
