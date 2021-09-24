import UserType from '../types/UserType';

interface IConnectionData {
  firstName: string;
  lastName: string;
  position: string;
  isObserver?: boolean;
  avatar: string;
  role: UserType;
  roomName?: string;
  roomId?: string | null;
}

export default IConnectionData;
