import { ReactNode } from 'react';
import Color from '../../types/Color';

export interface TooltipProps {
  children: ReactNode | undefined;
  message: string;
  visibility: boolean;
  setVisibilityStatus: (value: boolean) => void;
  color?: Color;
  className?: string;
  id?: string;
}
