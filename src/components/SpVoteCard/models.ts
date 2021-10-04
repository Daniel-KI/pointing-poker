import Size from '../../types/Size';
import SpCardBackType from '../../types/SpCardBackType';

export interface SpVoteCardProps {
  type?: SpCardBackType;
  units?: string;
  score?: string;
  isFlipped?: boolean;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  isSelected?: boolean;
  size?: Size;
  className?: string;
  id?: string;
}
