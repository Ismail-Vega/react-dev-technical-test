export type RowMenuAction = (id: number) => void;

export interface ListTableProps {
  rowMenuActions: RowMenuAction[];
}
