import { Socket } from 'socket.io-client';
import { IIssue } from '../redux/models';

const sendNewIssues = (socket: Socket, issues: IIssue[]): void => {
  socket.emit('issue:updateAll', issues);
};

export default sendNewIssues;
