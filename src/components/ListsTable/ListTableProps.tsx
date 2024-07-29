export type RowMenuAction = (id: number) => void;

export interface ListTableProps {
  /**
   * Array containing two Callbacks functions to handle opening the delete modal and the delete action.
   * @param id - The id of the list to be deleted.
   */
  rowMenuActions: RowMenuAction[];
}
