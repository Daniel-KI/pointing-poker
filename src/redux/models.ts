import { Socket } from 'socket.io-client';
import PriorityLevel from '../types/PriorityLevel';
import SpCardBackType from '../types/SpCardBackType';

import UserType from '../types/UserType';

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  position: string;
  avatar: string;
  isObserver: boolean;
}

export interface IIssue {
  id: number;
  name: string;
  priority: PriorityLevel;
}

export interface IRoom {
  id: string | undefined;
  name: string | undefined;
  admin: IUser | undefined;
  isGameStarted?: boolean;
  settings?: ISettings;
  issues?: IIssue[];
}

export interface ICurrentUser {
  id: string | null;
  role: UserType;
}

export interface ITimer {
  minutes: number;
  seconds: number;
}

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

export interface IState {
  socket: Socket;
  room: IRoom;
  currentUser: ICurrentUser;
  users: IUser[];
  issues: IIssue[];
  messages: IMessage[];
  settings: ISettings;
}
