import { ReactNode } from 'react';

export interface ModalBoxProps {
  children: ReactNode | undefined;
  className?: string;
  setActive: (value: boolean) => void;
}
