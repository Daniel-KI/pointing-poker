import NodePersist from 'node-persist';
import { Server } from 'socket.io';
import { IRoom, ISocket, IUser } from '../models';

export default (io: Server, socket: ISocket, storage: typeof NodePersist): void => {
  const getUsers = async (roomId: string) => {
    const room: IRoom = await storage.getItem(roomId);
    if (!room) {
      console.log('Room does not exist');
      return;
    }
    io.in(roomId).emit('users', room.users);
  };

  const createRoom = async (userData: IUser) => {
    // eslint-disable-next-line no-param-reassign
    socket.roomId = socket.id;

    const newRoom: IRoom = {
      id: socket.id,
      name: userData.roomName,
      admin: {
        id: socket.id,
        firstName: userData.firstName,
        lastName: userData.lastName,
        position: userData.position,
        avatar: userData.avatar,
        isObserver: userData.isObserver,
      },
      users: [],
      settings: null,
      issues: [],
      isGameStarted: false,
    };

    await storage.setItem(socket.id, newRoom);
    socket.join(socket.roomId);
  };

  const addUser = async (userData: IUser) => {
    // eslint-disable-next-line no-param-reassign
    socket.roomId = userData.roomId;

    const newUser = { ...userData, id: socket.id };
    const currentRoom: IRoom = await storage.getItem(socket.roomId);
    currentRoom.users.push(newUser);
    await storage.updateItem(socket.roomId, currentRoom);
    socket.join(socket.roomId);
    await getUsers(socket.roomId);
  };

  const joinUser = async (userData: IUser) => {
    if (userData.role === 'admin') {
      createRoom(userData);
    } else if (userData.role === 'user') {
      addUser(userData);
    }
  };

  const removeUser = async (userId: string, roomId: string) => {
    console.log('start removing', roomId);
    io.to(userId).emit('userDelete');
    const currentRoom: IRoom = await storage.getItem(roomId);
    if (!currentRoom) {
      console.log('Room does not exist');
      return;
    }
    const removedIndex = currentRoom.users.findIndex(({ id }) => id === userId);
    const newUsers = [...currentRoom.users];
    newUsers.splice(removedIndex, 1);
    const newRoom = { ...currentRoom, users: newUsers };
    await storage.updateItem(roomId, newRoom);
    console.log(`user ${userId} deleted from storage`);
    await getUsers(roomId);
  };

  const leaveRoom = (roomId: string) => {
    socket.leave(roomId);
  };

  socket.on('user:join', joinUser);
  socket.on('user:get', getUsers);
  socket.on('user:leave', removeUser);
  socket.on('user:leaveRoom', leaveRoom);
};
