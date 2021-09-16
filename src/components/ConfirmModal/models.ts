import { ReactNode } from 'react';

export interface ConfirmModalProps {
  className?: string;
  children: ReactNode | undefined;
  isActive: boolean;
  setActive: (value: boolean) => void;
}
