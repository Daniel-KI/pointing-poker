import Color from '../../types/Color';

export interface IssueCardProps {
  name?: string;
  priority?: string;
  editAction?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  deleteAction?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  color?: Color;
  className?: string;
  id?: string;
}
