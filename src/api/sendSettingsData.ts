import { Socket } from 'socket.io-client';
import { IIssue, ISettings } from '../redux/models';

const sendSettingsData = (socket: Socket, settings: ISettings, issues: IIssue[]): void => {
  socket.emit('settings:add', settings, issues);
};

export default sendSettingsData;
