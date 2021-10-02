import Size from '../../types/Size';

export interface SpCreationCardProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  size?: Size;
  className?: string;
  id?: string;
}
