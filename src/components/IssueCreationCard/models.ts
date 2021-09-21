import Color from '../../types/Color';

export interface IssueCreationCardProps {
  addAction: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  label?: string;
  color?: Color;
  className?: string;
  id?: string;
}
