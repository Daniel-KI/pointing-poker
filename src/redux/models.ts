import { Socket } from 'socket.io-client';

import UserType from '../types/UserType';

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  position: string;
  avatar: string;
  isPlayer?: 'isPlayer';
}

export interface IIssue {
  id: number;
  name: string;
  priority: 'Low' | 'Medium' | 'High';
}

export interface IRoom {
  id: string;
  name: string;
  admin: IUser;
}

export interface ICurrentUser {
  id: string;
  role: UserType;
}

export interface ISocketState {
  socket: null | Socket;
}

export interface IRoomState {
  room: null | IRoom;
}

export interface ICurrentUserState {
  currentUser: null | ICurrentUser;
}

export interface IUsersState {
  users: IUser[];
}

export interface IIssuesState {
  issues: IIssue[];
}

export interface IState {
  socket: ISocketState;
  room: IRoomState;
  currentUser: ICurrentUserState;
  users: IUsersState;
  issues: IIssuesState;
}
