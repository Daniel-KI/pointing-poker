export interface SpCardFrontProps {
  units?: string | undefined;
  score?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  className?: string;
  id?: string;
}
