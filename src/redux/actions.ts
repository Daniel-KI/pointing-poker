import { Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io-client/build/typed-events';

export const SET_SOCKET = 'SET_SOCKET';

export interface IStore {
  socket: null | Socket<DefaultEventsMap, DefaultEventsMap>;
}

export interface ISocketAction {
  type: typeof SET_SOCKET;
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
}

export const updateSocket = (socket: Socket<DefaultEventsMap, DefaultEventsMap>): ISocketAction => {
  return {
    type: SET_SOCKET,
    socket,
  };
};
