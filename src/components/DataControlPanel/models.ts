export interface DataControlPanelProps {
  addAction?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  editAction?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  deleteAction?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  bordered?: boolean;
}
