export interface NavListProps {
  /**
   * Task lists to be displayed in the drawer, each containing an id and name.
   */
  filteredLists: { id: string; name: string }[];
  /**
   * Callback function to handle the navigation between List pages.
   */
  navigate: (path: string) => void;
  /**
   * Callback function to handle opening the Drawer on mobile screens.
   */
  handleDrawerToggle: () => void;
}
