import NodePersist from 'node-persist';
import { Server } from 'socket.io';
import { IIssue, IRoom, ISocket } from '../models';

export default (io: Server, socket: ISocket, storage: typeof NodePersist): void => {
  const getIssues = async () => {
    const room: IRoom = await storage.getItem(socket.roomId);
    io.in(socket.roomId).emit('issues', room.issues);
  };

  const updateIssues = async (newIssues: IIssue[]) => {
    // eslint-disable-next-line no-param-reassign
    // socket.roomId = socket.id;
    const currentRoom: IRoom = await storage.getItem(socket.roomId);
    currentRoom.issues = newIssues;
    await storage.updateItem(socket.roomId, currentRoom);
    await getIssues();
  };

  const addIssue = async (issue: IIssue) => {
    // eslint-disable-next-line no-param-reassign
    // socket.roomId = socket.id;
    const currentRoom: IRoom = await storage.getItem(socket.roomId);
    currentRoom.issues.push(issue);
    await storage.updateItem(socket.roomId, currentRoom);
    await getIssues();
  };

  const updateIssue = async (issue: IIssue) => {
    // eslint-disable-next-line no-param-reassign
    // socket.roomId = socket.id;
    const currentRoom: IRoom = await storage.getItem(socket.roomId);
    const updatedIndex = currentRoom.issues.findIndex(({ id }) => id === issue.id);
    currentRoom.issues[updatedIndex] = issue;
    await storage.updateItem(socket.roomId, currentRoom);
    await getIssues();
  };

  const deleteIssue = async (issue: IIssue) => {
    // eslint-disable-next-line no-param-reassign
    // socket.roomId = socket.id;
    const currentRoom: IRoom = await storage.getItem(socket.roomId);
    const removedIndex = currentRoom.issues.findIndex(({ id }) => id === issue.id);
    const newIssues = [...currentRoom.issues];
    newIssues.splice(removedIndex, 1);
    currentRoom.issues = newIssues;
    await storage.updateItem(socket.roomId, currentRoom);
    await getIssues();
  };

  socket.on('issue:get', getIssues);
  socket.on('issue:add', addIssue);
  socket.on('issue:update', updateIssue);
  socket.on('issue:delete', deleteIssue);
  socket.on('issue:updateAll', updateIssues);
};
