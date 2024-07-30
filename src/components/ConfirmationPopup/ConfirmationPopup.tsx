import { useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ClickAwayListener from "@mui/material/ClickAwayListener";

import { ConfirmationPopupProps } from "./ConfirmationPopupProps";

const ConfirmationPopup = ({
  open,
  onClose,
  onConfirm,
  title,
  description,
  anchorEl,
  sx,
}: ConfirmationPopupProps) => {
  const [popperOpen, setPopperOpen] = useState(open);
  const popperAnchorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setPopperOpen(open);
  }, [open]);

  return (
    <ClickAwayListener onClickAway={onClose}>
      <Popper
        open={popperOpen}
        anchorEl={anchorEl}
        placement="bottom-end"
        modifiers={[{ name: "offset", options: { offset: [0, 8] } }]}
      >
        <Box
          ref={popperAnchorRef}
          sx={{
            width: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            ...sx,
          }}
        >
          <Paper
            elevation={3}
            sx={{
              padding: 3,
              borderRadius: 2,
              width: "300px",
              backgroundColor: "background.paper",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              data-testid="confirmation-popup-title"
              variant="h6"
              gutterBottom
            >
              {title}
            </Typography>
            <Typography
              data-testid="confirmation-popup-description"
              variant="body2"
              paragraph
            >
              {description}
            </Typography>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button
                data-testid="cancel-button"
                onClick={onClose}
                variant="outlined"
              >
                Cancel
              </Button>
              <Button
                data-testid="confirm-button"
                onClick={onConfirm}
                variant="contained"
                color="primary"
              >
                Confirm
              </Button>
            </Box>
          </Paper>
        </Box>
      </Popper>
    </ClickAwayListener>
  );
};

export default ConfirmationPopup;
