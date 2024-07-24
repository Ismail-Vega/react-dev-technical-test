import ReactDOM from "react-dom";
import { AppModalProps } from "./AppModalProps";
import { Box } from "@mui/material/";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import ClickAwayListener from "@mui/material/ClickAwayListener";

const AppModal = ({ isOpen, onClose, title, children }: AppModalProps) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <Container
      maxWidth={false}
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
        >
          <Typography variant="h6">{title}</Typography>
          <Box sx={{ mt: 2 }}>{children}</Box>
          <Box sx={{ display: "flex", justifyContent: "end" }}>
            <Button onClick={onClose} sx={{ mt: 2, ml: "auto" }}>
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
