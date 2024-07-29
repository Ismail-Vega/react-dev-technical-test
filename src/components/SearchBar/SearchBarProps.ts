import { ChangeEvent } from "react";

export interface SearchBarProps {
  /**
   * Current search term.
   */
  searchTerm: string;
  /**
   * Callback function to handle search term changes.
   * @param e - The event source of the callback. You can pull out the new value by accessing event.target.value (string).
   */
  onSearchChange: (e: ChangeEvent<HTMLInputElement>) => void;
  /**
   * Callback function to clear search input's value.
   */
  onClearSearch: () => void;
}
