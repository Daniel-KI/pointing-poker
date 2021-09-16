import { ReactNode } from 'react';

export interface ConfirmModalProps {
  className?: string;
  children: ReactNode | undefined;
  setActive: (value: boolean) => void;
}
