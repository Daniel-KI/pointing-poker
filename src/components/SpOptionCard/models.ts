import Size from '../../types/Size';

export interface SpOptionCardProps {
  units?: string | undefined;
  score?: string;
  editAction?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  deleteAction?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  size?: Size;
  className?: string;
  id?: string;
}
