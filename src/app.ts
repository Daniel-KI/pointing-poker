import cors from 'cors';
import express from 'express';
import http from 'http';
import dotenv from 'dotenv';
import { Server } from 'socket.io';
import storage from 'node-persist';

import { ISocket } from './models';
import registerUserHandlers from './handlers/userHandler';
import registerMessageHandlers from './handlers/messageHandler';
import registerSettingsHandlers from './handlers/settingsHandler';
import registerIssueHandlers from './handlers/issueHandler';
import registerGameHandlers from './handlers/gameHandler';

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

const onConnection = (socket: ISocket) => {
  console.log(socket.id);

  registerMessageHandlers(io, socket);
  registerUserHandlers(io, socket, storage);
  registerSettingsHandlers(io, socket, storage);
  registerIssueHandlers(io, socket, storage);
  registerGameHandlers(io, socket);

  socket.on('disconnect', async () => {
    console.log(`User ${socket.id} disconnected from room ${socket.roomId}`);
    if (socket.id === socket.roomId) {
      await storage.removeItem(socket.roomId);
      console.log(`Room ${socket.roomId} deleted`);
    }
  });
};

io.on('connection', onConnection);

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
