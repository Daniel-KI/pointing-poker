import UserType from '../../types/UserType';

export interface ConnectModalProps {
  isActive: boolean;
  setActive: (value: boolean) => void;
  userType: UserType;
}
