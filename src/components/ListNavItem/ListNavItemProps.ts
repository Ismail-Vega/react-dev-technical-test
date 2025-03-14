import { ReactNode } from "react";

export interface ListNavItemProps {
  /**
   * The location path.
   */
  path: string;
  /**
   * The value of the navigation item.
   */
  value: string;
  /**
   * The icon of the navigation item.
   */
  icon: ReactNode;
  /**
   * Callback function to handle navigation item click events.
   * @param id - The id of the clicked navigation item.
   */
  onClick?: () => void;
  /**
   * Callback function to handle the navigation between List pages.
   */
  navigate: (path: string) => void;
}
