import { useNavigate, useParams } from "react-router-dom";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import { enqueueSnackbar } from "notistack";
import Backdrop from "@mui/material/Backdrop";
import Container from "@mui/material/Container";
import TaskIcon from "@mui/icons-material/Task";
import Typography from "@mui/material/Typography";
import ToggleButton from "@mui/material/ToggleButton";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import AppForm from "../../components/AppForm";
import TodoList from "../../components/TodoList";
import AppModal from "../../components/AppModal";
import { Todo } from "../../components/TodoItem/TodoItemProps";
import {
  RootState,
  useUpdateTodoMutation,
  useCreateTodoMutation,
  useDeleteTodoMutation,
} from "../../store";
import { setError, setLoading } from "../../store/slices/todoListsSlice";

const TodoListPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const lists = useSelector((state: RootState) => state.todos.lists);
  const loading = useSelector((state: RootState) => state.todos.loading);
  const [updateTodo] = useUpdateTodoMutation();
  const [createTodo] = useCreateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  const { id } = useParams<{ id: string }>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState<"all" | "completed" | "pending">("all");
  const idParam = Number(id);

  useEffect(() => {
    if (!idParam || !lists[idParam]) {
      navigate("/");
    }
  }, [idParam, lists, navigate]);

  const filteredList = useMemo(() => {
    if (idParam && lists[idParam]) {
      const { todoList } = lists[idParam];

      return todoList && todoList.length
        ? todoList.filter((todo) => {
            if (filter === "completed") return todo.completed;
            if (filter === "pending") return !todo.completed;
            return true;
          })
        : [];
    } else return [];
  }, [filter, idParam, lists]);

  const toggleComplete = useCallback(
    async (todoId: number) => {
      try {
        dispatch(setLoading(true));

        if (idParam) {
          const index = lists[idParam].todoList.findIndex(
            (todo) => todo.id === todoId
          );

          if (index !== -1) {
            const prevTodo = lists[idParam].todoList[index];

            await updateTodo({
              ...prevTodo,
              completed: !prevTodo.completed,
            });

            enqueueSnackbar("Todo updated successfully.", {
              variant: "success",
              autoHideDuration: 3000,
            });
          }
        }
      } catch {
        dispatch(setError("Failed to update todo"));
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch, idParam, lists, updateTodo]
  );

  const handleAddTodo = useCallback(
    async (title: string) => {
      try {
        setIsModalOpen(false);
        dispatch(setLoading(true));

        if (idParam) {
          const newTodo: Partial<Todo> = {
            title,
            userId: idParam,
            completed: false,
          };

          await createTodo(newTodo).unwrap();

          enqueueSnackbar("Todo created successfully.", {
            variant: "success",
            autoHideDuration: 3000,
          });
        }
      } catch {
        dispatch(setError("Failed to create todo"));
      } finally {
        dispatch(setLoading(false));
      }
    },
    [createTodo, dispatch, idParam]
  );

  const handleDeleteTodo = useCallback(
    async (todoId: number) => {
      try {
        setIsModalOpen(false);
        dispatch(setLoading(true));

        if (idParam) {
          await deleteTodo({
            id: todoId,
            userId: idParam,
          });

          enqueueSnackbar("Todo deleted successfully.", {
            variant: "success",
            autoHideDuration: 3000,
          });
        }
      } catch {
        dispatch(setError("Failed to delete todo"));
      } finally {
        dispatch(setLoading(false));
      }
    },
    [deleteTodo, dispatch, idParam]
  );

  if (!idParam || !lists[idParam]) return null;

  const { name } = lists[idParam];

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
      <Backdrop
        open={loading}
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Container>
  );
};

export default TodoListPage;
