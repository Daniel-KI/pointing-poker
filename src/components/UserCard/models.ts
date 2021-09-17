import Color from '../../types/Color';

export interface UserCardProps {
  name?: string;
  surname?: string;
  jobPosition?: string;
  avatar?: string;
  deleteAction?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  color?: Color;
  className?: string;
  id?: string;
}
