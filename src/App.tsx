import { useContext, useCallback, useState, useMemo } from "react";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TaskIcon from "@mui/icons-material/Task";
import Typography from "@mui/material/Typography";

import AppForm from "./components/AppForm";
import AppModal from "./components/AppModal";
import { StateActionTypes } from "./state/types";
import { TodoContext } from "./state/TodoProvider";
import ListsTable from "./components/ListsTable";

const App = () => {
  const { state, dispatch } = useContext(TodoContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingList, setEditingList] = useState<number | null>(null);

  const handleAddOrEditList = useCallback(
    (listName: string) => {
      if (listName.trim() !== "") {
        if (editingList !== null) {
          dispatch({
            type: StateActionTypes.EDIT_TODO_LIST,
            payload: {
              id: editingList,
              list: { ...state.lists[editingList], name: listName },
            },
          });
        } else {
          const listId = Date.now();
          const newList = {
            id: listId,
            name: listName,
            todoList: [],
          };

          dispatch({
            type: StateActionTypes.ADD_TODO_LIST,
            payload: { id: listId, list: newList },
          });
        }
        setIsModalOpen(false);
        setEditingList(null);
      }
    },
    [dispatch, editingList, state.lists]
  );

  const handleOpenModal = useCallback((id: number | null) => {
    setEditingList(id);
    setIsModalOpen(true);
  }, []);

  const confirmDeleteList = useCallback(
    (id: number) => {
      dispatch({
        type: StateActionTypes.DELETE_TODO_LIST,
        payload: { listId: id },
      });
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
        >
          Lists
        </Typography>
        <Button variant="contained" onClick={() => handleOpenModal(null)}>
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
          initialTitleValue={editingList ? state.lists[editingList]?.name : ""}
        />
      </AppModal>
    </Container>
  );
};

export default App;
