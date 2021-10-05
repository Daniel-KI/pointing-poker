import { Socket } from 'socket.io-client';

import IConnectionData from './models';

const joinRoom = (socket: Socket, data: IConnectionData): void => {
  socket.emit('user:join', data);
};

export default joinRoom;
