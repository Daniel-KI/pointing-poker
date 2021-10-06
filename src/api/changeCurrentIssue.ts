import { Socket } from 'socket.io-client';

import { IIssue } from '../redux/models';

const changeCurrentIssue = (socket: Socket, issue: IIssue): void => {
  socket.emit('game:currentIssue', issue);
};

export default changeCurrentIssue;
