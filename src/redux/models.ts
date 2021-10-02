import { Socket } from 'socket.io-client';
import PriorityLevel from '../types/PriorityLevel';

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
  cardValues: string[];
  cardBack: string;
  addNewPlayersAutomatically: boolean;
  cardsFlipAutomatically: boolean;
}

export interface IMessage {
  user: IUser;
  text: string;
}

export interface IGameResult {
  issue: IIssue;
  votesPercentage: number[];
}

export interface IState {
  socket: Socket;
  room: IRoom;
  currentUser: ICurrentUser;
  users: IUser[];
  issues: IIssue[];
  messages: IMessage[];
}
