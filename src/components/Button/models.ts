import { ReactNode } from 'react';
import Color from '../../types/Color';
import Size from '../../types/Size';

export interface ButtonProps {
  children: ReactNode | undefined;
  color?: Color;
  size?: Size;
  id?: string;
  className?: string;
  disabled?: boolean;
  active?: boolean;
  submit?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
