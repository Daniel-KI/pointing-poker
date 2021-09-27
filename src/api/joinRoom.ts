import { Socket } from 'socket.io-client';

import IConnectionData from './models';

const joinRoom = (socket: Socket | null, data: IConnectionData): void => {
  if (!socket) {
    throw new Error('There is no socket in store');
  }
  socket.emit('joinRoom', data);
};

export default joinRoom;
