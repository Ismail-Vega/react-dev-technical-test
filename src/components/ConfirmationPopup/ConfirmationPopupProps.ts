import { SxProps, Theme } from "@mui/material";

export interface ConfirmationPopupProps {
  open: boolean;
  title: string;
  description: string;
  sx?: SxProps<Theme>;
  onClose: () => void;
  onConfirm: () => void;
  anchorEl: HTMLElement | null;
}
