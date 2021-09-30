import cors from 'cors';
import express from 'express';
import http from 'http';
import dotenv from 'dotenv';
import { Server, Socket } from 'socket.io';
import storage from 'node-persist';

import { IRoom, ISettings, IUser } from './models';

dotenv.config();
const PORT = process.env.PORT || 4000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = http.createServer(app);
const io = new Server(server);

app.use(cors());

storage.init();

app.get('/auth/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await storage.getItem(id);
    res.json(result.id);
  } catch (err) {
    res.status(404).send('No room matches this ID');
  }
});

app.get('/rooms/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await storage.getItem(id);
    res.json(result);
  } catch (err) {
    res.status(404).send('No room matches this ID');
  }
});

io.on('connection', (socket: Socket) => {
  console.log(socket.id);

  socket.on('joinRoom', async (data: IUser) => {
    if (data.role === 'admin') {
      const newUsers: IUser[] = [];
      const newRoom = {
        id: socket.id,
        name: data.roomName,
        admin: {
          firstName: data.firstName,
          lastName: data.lastName,
          position: data.position,
          avatar: data.avatar,
          isObserver: data.isObserver,
        },
        users: newUsers,
      };
      await storage.setItem(socket.id, newRoom);
      socket.join(socket.id);
    }
    if (data.role === 'user') {
      const newUser = { ...data, id: socket.id };
      const storageLength = await storage.length();
      if (storageLength === 0) {
        throw new Error('There is no rooms');
      }
      const currentRoom: IRoom = await storage.getItem(data.roomId);
      currentRoom.users.push(newUser);
      await storage.updateItem(data.roomId, currentRoom);
      socket.join(data.roomId);
      io.in(data.roomId).emit('newUser');
    }
  });

  socket.on('settingsData', (data: ISettings) => {
    io.in(socket.id).emit('sendSettingsData', data);
  });

  // on 'addUser'
  // on 'removeUser'
});

// прописать действия при дисконнект (удаление комнаты/пользователя)

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
