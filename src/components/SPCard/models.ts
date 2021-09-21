export interface SPCardProps {
  editAction?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  deleteAction?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  scoreType?: string | undefined;
  cardScore?: string;
  className?: string;
  id?: string;
}
