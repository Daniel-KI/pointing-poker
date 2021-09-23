export interface SpOptionCardProps {
  units?: string | undefined;
  score?: string;
  editAction?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  deleteAction?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  className?: string;
  id?: string;
}
