export interface AppModalProps {
  /**
   * The title of the modal.
   */
  title: string;
  /**
   * Boolean indicating whether the modal is open.
   */
  isOpen: boolean;
  /**
   * Callback function to handle closing the modal.
   */
  onClose: () => void;
  /**
   * Children components to be rendered within the modal.
   */
  children: React.ReactNode;
}
