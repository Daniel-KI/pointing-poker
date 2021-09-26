import Size from "../../types/Size";

export interface SpCardFrontProps {
  units?: string | undefined;
  score?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  isSelected?: boolean;
  size?: Size;
  className?: string;
  id?: string;
}
