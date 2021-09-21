import UserType from '../types/UserType';

interface IUserData {
  firstName: string;
  lastName: string;
  position: string;
  isPlayer?: 'isPlayer';
  avatar: 'string';
  role: UserType;
  roomName?: string;
  roomId?: string;
}

export default IUserData;
