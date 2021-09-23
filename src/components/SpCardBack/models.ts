import CardBack from '../../types/SpCardBackType';

export interface SpCardBackProps {
  type: CardBack;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  className?: string;
  id?: string;
}
