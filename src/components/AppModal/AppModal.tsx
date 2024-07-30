import ReactDOM from "react-dom";
import { Box } from "@mui/material/";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import ClickAwayListener from "@mui/material/ClickAwayListener";

import { AppModalProps } from "./AppModalProps";

const AppModal = ({ isOpen, onClose, title, children }: AppModalProps) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <Container
      maxWidth={false}
      data-testid="modal-container"
      sx={{
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        position: "fixed",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
    >
      <ClickAwayListener onClickAway={onClose}>
        <Box
          sx={{
            padding: 4,
            boxShadow: 24,
            width: "400px",
            borderRadius: 1,
            backgroundColor: "#F0F0F0",
          }}
          data-testid="modal-box"
        >
          <Typography variant="h6" data-testid="modal-title">
            {title}
          </Typography>
          <Box sx={{ mt: 2 }} data-testid="modal-content">
            {children}
          </Box>
          <Box sx={{ display: "flex", justifyContent: "end" }}>
            <Button
              onClick={onClose}
              sx={{ mt: 2, ml: "auto" }}
              data-testid="modal-close-button"
            >
              Close
            </Button>
          </Box>
        </Box>
      </ClickAwayListener>
    </Container>,
    document.body
  );
};

export default AppModal;
