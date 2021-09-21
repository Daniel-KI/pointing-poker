import { Socket } from 'socket.io-client';

import IUserData from './models';

const joinRoom = (socket: Socket | null, data: IUserData): void => {
  if (!socket) {
    throw new Error('There is no socket in store');
  }
  socket.emit('joinRoom', data);
};

export default joinRoom;
