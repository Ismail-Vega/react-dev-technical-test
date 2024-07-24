import { useCallback, useState } from "react";
import { Todo } from "./components/TodoItem/TodoItemProps";
import TodoList from "./components/TodoList/TodoList";
import "./App.css";

const App = () => {
  const [newTodo, setNewTodo] = useState("");
  const [list, setList] = useState<Todo[]>([]);

  const handleAddTodo = () => {
    if (newTodo.trim().length >= 3) {
      setList((prevList) => [
        ...prevList,
        { id: Date.now(), description: newTodo, completed: false },
      ]);
      setNewTodo("");
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleAddTodo();
    }
  };

  const toggleComplete = useCallback((id: number) => {
    setList((prevList) =>
      prevList.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []);

  return (
    <div style={{ width: "500px" }}>
      <h1>To-Do List</h1>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <input
          type="text"
          value={newTodo}
          aria-label="New task"
          onKeyDown={handleKeyDown}
          placeholder="Add a new task"
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button onClick={handleAddTodo}>Add Task</button>
      </div>
      <TodoList todoList={list} onTodoStatusChange={toggleComplete} />
    </div>
  );
};

export default App;
