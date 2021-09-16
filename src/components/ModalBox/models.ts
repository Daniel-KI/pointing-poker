import { ReactNode } from 'react';

export interface ModalBoxProps {
  children: ReactNode | undefined;
  active: boolean;
  setActive: (value: boolean) => void;
}
