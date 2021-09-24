import SpCardBackType from '../../types/SpCardBackType';

export interface SpVoteCardProps {
  type?: SpCardBackType;
  units?: string;
  score?: string;
  isFlipped?: boolean;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  className?: string;
  id?: string;
}
