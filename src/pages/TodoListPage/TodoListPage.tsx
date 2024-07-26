import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useMemo, useState } from "react";

import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TaskIcon from "@mui/icons-material/Task";
import Typography from "@mui/material/Typography";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import AppForm from "../../components/AppForm";
import TodoList from "../../components/TodoList";
import AppModal from "../../components/AppModal";
import { StateActionTypes } from "../../state/types";
import { TodoContext } from "../../state/TodoProvider";
import { Todo } from "../../components/TodoItem/TodoItemProps";

const TodoListPage = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(TodoContext);
  const { id } = useParams<{ id: string }>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState<"all" | "completed" | "pending">("all");
  const idParam = Number(id);

  useEffect(() => {
    if (!idParam || !state.lists[idParam]) {
      navigate("/");
    }
  }, [idParam, state.lists, navigate]);

  const filteredList = useMemo(() => {
    if (idParam && state.lists[idParam]) {
      const { todoList } = state.lists[idParam];

      return todoList && todoList.length
        ? todoList.filter((todo) => {
            if (filter === "completed") return todo.completed;
            if (filter === "pending") return !todo.completed;
            return true;
          })
        : [];
    } else return [];
  }, [filter, idParam, state.lists]);

  const toggleComplete = (todoId: number) => {
    if (idParam) {
      dispatch({
        type: StateActionTypes.TOGGLE_TODO,
        payload: { listId: idParam, todoId },
      });
    }
  };

  const handleAddTodo = (title: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      title,
      userId: idParam,
      completed: false,
    };

    if (idParam) {
      dispatch({
        type: StateActionTypes.ADD_TODO,
        payload: { listId: idParam, todo: newTodo },
      });
    }

    setIsModalOpen(false);
  };

  const handleDeleteTodo = (todoId: number) => {
    if (idParam) {
      dispatch({
        type: StateActionTypes.DELETE_TODO,
        payload: { listId: idParam, todoId },
      });
    }

    setIsModalOpen(false);
  };

  if (!idParam || !state.lists[idParam]) return null;

  const { name } = state.lists[idParam];

  return (
    <Container>
      <Box
        sx={{
          marginTop: 12,
          width: "100%",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            mb: 2,
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6">{name} List</Typography>

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

          <Button variant="contained" onClick={() => setIsModalOpen(true)}>
            Create task
          </Button>
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
          }}
        >
          <TodoList
            todoList={filteredList}
            onTodoDelete={handleDeleteTodo}
            onTodoStatusChange={toggleComplete}
          />
        </Box>
        <AppModal
          title="Create new task"
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        >
          <AppForm
            label="Task Name"
            icon={<TaskIcon />}
            onSubmit={handleAddTodo}
          />
        </AppModal>
      </Box>
    </Container>
  );
};

export default TodoListPage;
