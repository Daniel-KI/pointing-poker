import { Socket } from 'socket.io-client';
import { IUser } from '../redux/models';

const sendMessage = (socket: Socket, userData: IUser, messageText: string): void => {
  socket.emit('message:add', {
    userData,
    messageText,
  });
};

export default sendMessage;
