import { useCallback, useMemo, useState } from "react";
import { Box } from "@mui/material/";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import NewTodoForm from "./components/NewTodoForm";
import TodoList from "./components/TodoList/TodoList";
import { Todo } from "./components/TodoItem/TodoItemProps";

import "./App.css";
import AppModal from "./components/AppModal";

const App = () => {
  const [list, setList] = useState<Todo[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState<"all" | "completed" | "pending">("all");

  const handleAddTodo = (description: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      description,
      completed: false,
    };

    setList((prevList) => [...prevList, newTodo]);
    setIsModalOpen(false);
  };

  const toggleComplete = useCallback((id: number) => {
    setList((prevList) =>
      prevList.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []);

  const filteredList = useMemo(
    () =>
      list.filter((todo) => {
        if (filter === "completed") return todo.completed;
        if (filter === "pending") return !todo.completed;
        return true;
      }),
    [filter, list]
  );

  return (
    <Container component="main" maxWidth="md">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography component="h1" variant="h4">
            Todo List
          </Typography>
          <Button
            variant="outlined"
            onClick={() => setIsModalOpen(true)}
          >
            Create task
          </Button>
        </Box>

        <Box
          sx={{
            mt: 4,
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <ToggleButtonGroup
            size="small"
            value={filter}
            exclusive
            onChange={(_, newFilter) => {
              if (newFilter !== null) {
                setFilter(newFilter);
              }
            }}
            aria-label="todo filter"
            sx={{ mb: 2 }}
          >
            <ToggleButton value="all" aria-label="all todos">
              All
            </ToggleButton>
            <ToggleButton value="completed" aria-label="completed todos">
              Completed
            </ToggleButton>
            <ToggleButton value="pending" aria-label="pending todos">
              Pending
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>

        <Box
          sx={{
            mt: 4,
            width: "100%",
            display: "flex",
          }}
        >
          <TodoList
            todoList={filteredList}
            onTodoStatusChange={toggleComplete}
          />
        </Box>
        <AppModal
          title="Create new task"
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        >
          <NewTodoForm onAddTodo={handleAddTodo} />
        </AppModal>
      </Box>
    </Container>
  );
};

export default App;
