import { Socket } from 'socket.io-client';

export const SET_SOCKET = 'SET_SOCKET';

export interface ISocketAction {
  type: typeof SET_SOCKET;
  socket: Socket;
}

export const updateSocket = (socket: Socket): ISocketAction => {
  return {
    type: SET_SOCKET,
    socket,
  };
};
