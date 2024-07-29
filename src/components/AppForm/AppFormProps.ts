import { ReactNode } from "react";

export interface AppFormProps {
  /**
   * The label of the input.
   */
  label: string;
  /**
   * The icon of the form.
   */
  icon: ReactNode;
  /**
   * The initial title value to be set if the form opens in edit mode.
   */
  initialTitleValue?: string;
  /**
   * Callback function to handle form submission.
   * @param title - The title value.
   */
  onSubmit: (title: string) => void;
}
