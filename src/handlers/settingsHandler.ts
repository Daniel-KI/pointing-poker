import NodePersist from 'node-persist';
import { Server } from 'socket.io';
import { IIssue, IRoom, ISettings, ISocket } from '../models';

export default (io: Server, socket: ISocket, storage: typeof NodePersist): void => {
  const getSettings = async () => {
    const room: IRoom = await storage.getItem(socket.roomId);
    io.in(socket.roomId).emit('settings', room.settings, room.issues, room.users);
  };

  const addSettings = async (settingsData: ISettings, issues: IIssue[]) => {
    const currentRoom: IRoom = await storage.getItem(socket.roomId);
    currentRoom.settings = settingsData;
    currentRoom.issues = issues;
    currentRoom.isGameStarted = true;
    if (!settingsData.isAdminObserver) {
      currentRoom.users.push(currentRoom.admin);
    }
    await storage.updateItem(socket.roomId, currentRoom);
    await getSettings();
  };

  socket.on('settings:get', getSettings);
  socket.on('settings:add', addSettings);
};
