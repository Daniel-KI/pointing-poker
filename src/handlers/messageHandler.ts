import { Server } from 'socket.io';
import { IMessage, ISocket } from '../models';

export default (io: Server, socket: ISocket): void => {
  const addMessage = (message: IMessage) => {
    io.in(socket.roomId).emit('newMessage', message);
  };

  socket.on('message:add', addMessage);
};
