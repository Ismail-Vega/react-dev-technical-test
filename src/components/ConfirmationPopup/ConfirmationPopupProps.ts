import { SxProps, Theme } from "@mui/material";

export interface ConfirmationPopupProps {
  /**
   * Boolean indicating whether the popup is open.
   */
  open: boolean;
  /**
   * The title of the popup.
   */
  title: string;
  /**
   * The message to be displayed in the confirmation popup.
   */
  description: string;
  /**
   * A system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
  /**
   * Callback function to handle cancellation action.
   */
  onClose: () => void;
  /**
   * Callback function to handle confirmation action.
   */
  onConfirm: () => void;
  /**
   * The element from which the popup open action is triggered. It's used to set the position of the popper.
   * The return value will passed as the reference object of the Popper instance.
   */
  anchorEl: HTMLElement | null;
}
