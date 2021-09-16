import UserType from '../../types/UserType';

export interface ConnectModalProps {
  isActive: boolean;
  setActive: (value: boolean) => void;
  onConfirm: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onDecline?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  userType: UserType;
}
