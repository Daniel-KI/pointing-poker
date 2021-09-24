import { Socket } from 'socket.io-client';
import PriorityLevels from '../types/priorityLevels';

import UserType from '../types/UserType';

export interface IUser {
  id?: string;
  firstName: string;
  lastName: string;
  position: string;
  avatar: string;
  isPlayer?: 'isPlayer';
}

export interface IIssue {
  id: number;
  name: string;
  priority: PriorityLevels;
}

export interface IRoom {
  id: string | undefined;
  name: string | undefined;
  admin: IUser | undefined;
}

export interface ICurrentUser {
  id: string | null;
  role: UserType;
}

export interface ISettings {
  isAdminObserver: boolean;
  timer: null | string;
  scoreType: string;
  scoreTypeShort: string;
  cardValues: number[];
  cardBack: string;
  addNewPlayersAutomatically: boolean;
  cardsFlipAutomatically: boolean;
}

export interface IMessage {
  user: IUser;
  text: string;
}

export interface IState {
  socket: Socket | null;
  room: IRoom;
  currentUser: ICurrentUser;
  users: IUser[];
  issues: IIssue[];
  messages: IMessage[];
}
