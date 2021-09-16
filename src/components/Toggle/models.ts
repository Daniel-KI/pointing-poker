import { ReactNode } from 'react';

export interface ToggleProps {
  checked: boolean;
  onChange: (value: boolean) => void;
  children?: ReactNode | undefined;
}
