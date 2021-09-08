import cors from 'cors';
import express from 'express';
import http from 'http';
import path from 'path';
import { Server, Socket } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, '../public')));

const PORT = process.env.PORT || 3000;

app.use(cors());

io.on('connection', (socket: Socket) => {
  console.log('New connection');
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
