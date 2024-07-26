import { useContext, useState } from "react";
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
  const [editingList, setEditingList] = useState<string | null>(null);

  const handleAddOrEditList = (listName: string, description: string) => {
    if (listName.trim() !== "") {
      if (editingList) {
        dispatch({
          type: StateActionTypes.EDIT_TODO_LIST,
          payload: {
            id: editingList,
            list: { ...state.lists[editingList], name: listName, description },
          },
        });
      } else {
        const listId = `list_${Date.now()}`;
        const newList = {
          id: listId,
          name: listName,
          description: description,
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
  };

  const handleOpenModal = (id: string | null) => {
    setEditingList(id);
    setIsModalOpen(true);
  };

  const confirmDeleteList = (id: string) => {
    dispatch({
      type: StateActionTypes.DELETE_TODO_LIST,
      payload: { listId: id },
    });
  };

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

      <ListsTable rowMenuActions={[handleOpenModal, confirmDeleteList]} />

      <AppModal
        title="Create/Edit list"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <AppForm
          label="List Name"
          icon={<TaskIcon />}
          onSubmit={handleAddOrEditList}
          initialNameValue={editingList ? state.lists[editingList]?.name : ""}
          initialDescriptionValue={
            editingList ? state.lists[editingList]?.description : ""
          }
        />
      </AppModal>
    </Container>
  );
};

export default App;
