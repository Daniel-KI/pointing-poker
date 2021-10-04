import { Socket } from 'socket.io-client';

const leaveRoom = (socket: Socket, id: string, roomId: string): void => {
  socket.emit('user:leave', id, roomId);
};

export default leaveRoom;
