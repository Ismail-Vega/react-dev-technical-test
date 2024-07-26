export type RowMenuAction = (id: string) => void;

export interface ListTableProps {
  rowMenuActions: RowMenuAction[];
}
