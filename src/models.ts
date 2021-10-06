import { Socket } from 'socket.io';

export interface ISocket extends Socket {
  roomId?: string;
}

export interface IUser {
  id: string;
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
  settings: ISettings;
  issues: IIssue[];
  isGameStarted: boolean;
}

interface ITimer {
  minutes: number;
  seconds: number;
}

type SpCardBackType = 'type1' | 'type2' | 'type3' | 'type4' | 'type5';

export interface ISettings {
  isAdminObserver: boolean;
  timer: null | ITimer;
  scoreType: string;
  cardValues: string[];
  cardBack: SpCardBackType;
  addNewPlayersAutomatically: boolean;
  cardsFlipAutomatically: boolean;
}

export interface IMessage {
  user: IUser;
  text: string;
}

export interface IGameResult {
  issue: IIssue;
  votesPercentage: IStatistics[];
}

export interface IStatistics {
  value: string;
  percentage: number;
}
