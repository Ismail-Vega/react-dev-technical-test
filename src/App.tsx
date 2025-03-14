import { useCallback, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TaskIcon from "@mui/icons-material/Task";
import Typography from "@mui/material/Typography";

import { RootState } from "./store";
import AppForm from "./components/AppForm";
import AppModal from "./components/AppModal";
import ListsTable from "./components/ListsTable";
import {
  addTodoList,
  deleteTodoList,
  updateTodoList,
} from "./store/slices/todoListsSlice";

const App = () => {
  const dispatch = useDispatch();
  const lists = useSelector((state: RootState) => state.todos.lists);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingList, setEditingList] = useState<number | null>(null);

  const handleAddOrEditList = useCallback(
    (listName: string) => {
      if (listName.trim() !== "") {
        if (editingList !== null) {
          dispatch(
            updateTodoList({
              id: editingList,
              list: { ...lists[editingList], name: listName },
            })
          );
        } else {
          const listId = Date.now();
          const newList = {
            id: listId,
            name: listName,
            todoList: [],
          };

          dispatch(addTodoList({ id: listId, list: newList }));
        }
        setIsModalOpen(false);
        setEditingList(null);
      }
    },
    [dispatch, editingList, lists]
  );

  const handleOpenModal = useCallback((id: number | null) => {
    setEditingList(id);
    setIsModalOpen(true);
  }, []);

  const confirmDeleteList = useCallback(
    (id: number) => {
      dispatch(deleteTodoList({ listId: id }));
    },
    [dispatch]
  );

  const rowMenuActions = useMemo(
    () => [handleOpenModal, confirmDeleteList],
    [handleOpenModal, confirmDeleteList]
  );

  return (
    <Container>
      <Box
        sx={{
          marginTop: 12,
          marginBottom: 2,
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            marginLeft: "8px",
          }}
          data-testid="list-title"
        >
          Lists
        </Typography>
        <Button
          variant="contained"
          onClick={() => handleOpenModal(null)}
          data-testid="create-list-button"
        >
          Create List
        </Button>
      </Box>

      <ListsTable rowMenuActions={rowMenuActions} />

      <AppModal
        title="Create/Edit list"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <AppForm
          label="List Name"
          icon={<TaskIcon />}
          onSubmit={handleAddOrEditList}
          initialTitleValue={editingList ? lists[editingList]?.name : ""}
        />
      </AppModal>
    </Container>
  );
};

export default App;
