import { ReactNode } from 'react';
import Color from '../../types/Color';

export interface TooltipProps {
  children: ReactNode | undefined;
  message: string;
  visible?: boolean;
  color?: Color;
  className?: string;
  id?: string;
}
