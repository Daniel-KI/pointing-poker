import Size from '../../types/Size';
import CardBack from '../../types/SpCardBackType';

export interface SpCardBackProps {
  type: CardBack;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  isSelected?: boolean;
  size?: Size;
  className?: string;
  id?: string;
}
