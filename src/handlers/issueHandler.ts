import NodePersist from 'node-persist';
import { Server } from 'socket.io';
import { IIssue, IRoom, ISocket } from '../models';

export default (io: Server, socket: ISocket, storage: typeof NodePersist): void => {
  const getIssues = async () => {
    const room: IRoom = await storage.getItem(socket.roomId);
    socket.to(socket.roomId).emit('issues', room.issues);
  };

  const updateIssues = async (newIssues: IIssue[]) => {
    const currentRoom: IRoom = await storage.getItem(socket.roomId);
    currentRoom.issues = newIssues;
    await storage.updateItem(socket.roomId, currentRoom);
    getIssues();
  };

  socket.on('issue:get', getIssues);
  socket.on('issue:updateAll', updateIssues);
};
