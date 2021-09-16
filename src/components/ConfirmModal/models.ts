import { ReactNode } from 'react';

export interface ConfirmModalProps {
  className?: string;
  children: ReactNode | undefined;
  isActive: boolean;
  setActive: (value: boolean) => void;
  onConfirm: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onDecline?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
