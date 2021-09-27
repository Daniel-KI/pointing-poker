export interface IUser {
  firstName: string;
  lastName: string;
  position: string;
  avatar: string;
  isObserver: boolean;
  role?: 'admin' | 'user';
  roomName?: string;
  roomId?: string;
}

type PriorityLevel = 'Low' | 'Medium' | 'High';

export interface IIssue {
  id: number;
  name: string;
  priority: PriorityLevel;
}

export interface IRoom {
  id: string;
  name: string;
  admin: IUser;
  users: IUser[];
}

export interface ISettings {
  isAdminObserver: boolean;
  timer: null | string;
  scoreType: string;
  scoreTypeShort: string;
  cardValues: string[];
  cardBack: string;
  addNewPlayersAutomatically: boolean;
  cardsFlipAutomatically: boolean;
}
