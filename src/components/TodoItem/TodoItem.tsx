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

const TodoItem = memo(
  ({
    todo,
    onDelete,
    onStatusChange,
    isPopupOpen,
    onPopupOpen,
    onPopupClose,
  }: TodoItemProps) => {
    const { id, name, completed, description } = todo;
    const anchorEl = useRef<HTMLElement>(null);

    const handleStatusChange = () => {
      onStatusChange(id);
    };

    const handleTodoDelete = () => {
      onDelete(id);
    };

    const handlePopupOpen = (event: MouseEvent) => {
      event.stopPropagation();
      onPopupOpen(id, event);
    };

    return (
      <>
        <Box ref={anchorEl}>
          <Item
            onClick={handleStatusChange}
            style={{
              display: "flex",
              textAlign: "start",
              alignItems: "center",
              justifyContent: "space-between",
              textDecoration: completed ? "line-through" : "none",
            }}
          >
            <Typography variant="h6">{name} </Typography>
            <Typography variant="h6">{description} </Typography>
            <Tooltip title="Delete">
              <IconButton aria-label="delete" onClick={handlePopupOpen}>
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
        />
      </>
    );
  }
);

export default TodoItem;
