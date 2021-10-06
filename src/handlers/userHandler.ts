import NodePersist from 'node-persist';
import { Server } from 'socket.io';
import { IRoom, ISocket, IUser } from '../models';

export default (io: Server, socket: ISocket, storage: typeof NodePersist): void => {
  const getUsers = async (roomId: string, newUser: IUser = null) => {
    const room: IRoom = await storage.getItem(roomId);
    if (!room) {
      console.log('Room does not exist');
      return;
    }
    io.in(roomId).emit('users', room.users, newUser);
  };

  const createRoom = async (adminData: IUser) => {
    // eslint-disable-next-line no-param-reassign
    socket.roomId = socket.id;

    const newRoom: IRoom = {
      id: socket.id,
      name: adminData.roomName,
      admin: {
        id: socket.id,
        firstName: adminData.firstName,
        lastName: adminData.lastName,
        position: adminData.position,
        avatar: adminData.avatar,
        isObserver: adminData.isObserver,
      },
      users: [],
      settings: null,
      issues: [],
      isGameStarted: false,
    };

    await storage.setItem(socket.id, newRoom);
    socket.join(socket.roomId);
  };

  const addAdmittedUser = async (newUser: IUser) => {
    const currentRoom: IRoom = await storage.getItem(socket.roomId);
    if (!currentRoom) {
      console.log('Room does not exist');
      return;
    }
    console.log('admit user');
    currentRoom.users.push(newUser);
    await storage.updateItem(socket.roomId, currentRoom);
    socket.join(socket.roomId);
    io.to(newUser.id).emit('admitted');
    io.in(socket.roomId).emit('users', currentRoom.users, newUser);
  };

  const rejectUser = (newUser: IUser) => {
    console.log('reject user');
    io.to(newUser.id).emit('rejected');
  };

  const addUser = async (userData: IUser) => {
    // eslint-disable-next-line no-param-reassign
    socket.roomId = userData.roomId;

    const newUser = { ...userData, id: socket.id };
    const currentRoom: IRoom = await storage.getItem(socket.roomId);
    if (currentRoom.isGameStarted && !currentRoom.settings?.addNewPlayersAutomatically) {
      console.log('send for admit/reject', currentRoom.admin.id);
      io.to(currentRoom.admin.id).emit('admitUser', newUser);
    } else {
      console.log('add automatically');
      currentRoom.users.push(newUser);
      await storage.updateItem(socket.roomId, currentRoom);
      socket.join(socket.roomId);
      await getUsers(socket.roomId, newUser);
      io.to(newUser.id).emit('admitted');
    }
  };

  const joinUser = async (userData: IUser) => {
    if (userData.role === 'admin') {
      await createRoom(userData);
    } else if (userData.role === 'user') {
      await addUser(userData);
    }
  };

  const removeUser = async (userId: string, roomId: string) => {
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
  socket.on('user:admit', addAdmittedUser);
  socket.on('user:reject', rejectUser);
  socket.on('user:get', getUsers);
  socket.on('user:leave', removeUser);
  socket.on('user:leaveRoom', leaveRoom);
};
