import { memo, MouseEvent, useRef } from "react";
import { Box } from "@mui/material";
import Paper from "@mui/material/Paper";
import Tooltip from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";

import { TodoItemProps } from "./TodoItemProps";
import ConfirmationPopup from "../ConfirmationPopup";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const TodoItem = memo(function TodoItem({
  todo,
  onDelete,
  onStatusChange,
  isPopupOpen,
  onPopupOpen,
  onPopupClose,
}: TodoItemProps) {
  const { id, title, userId, completed } = todo;
  const anchorEl = useRef<HTMLElement>(null);

  const handleStatusChange = () => {
    onStatusChange(id, userId);
  };

  const handleTodoDelete = () => {
    onDelete(id, userId);
  };

  const handlePopupOpen = (event: MouseEvent) => {
    event.stopPropagation();
    onPopupOpen(id, event);
  };

  return (
    <>
      <Box ref={anchorEl} data-testid={`todo-item-${id}`}>
        <Item
          onClick={handleStatusChange}
          style={{
            display: "flex",
            textAlign: "start",
            alignItems: "center",
            justifyContent: "space-between",
            textDecoration: completed ? "line-through" : "none",
          }}
          data-testid={`todo-item-title-${id}`}
        >
          <Typography variant="h6">{title}</Typography>
          <Tooltip title="Delete">
            <IconButton
              aria-label="delete"
              onClick={handlePopupOpen}
              data-testid={`todo-item-delete-button-${id}`}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Item>
      </Box>
      <ConfirmationPopup
        title="Delete Task"
        open={isPopupOpen}
        onClose={onPopupClose}
        anchorEl={anchorEl.current}
        onConfirm={handleTodoDelete}
        description="Are you sure you want to proceed?"
        data-testid={`todo-item-confirmation-popup-${id}`}
      />
    </>
  );
});

export default TodoItem;
