import { io, Socket } from 'socket.io-client';
import { ENDPOINT } from './constants';

const connectSocket = (): Socket => io(ENDPOINT, { transports: ['websocket', 'polling'] });

export default connectSocket;
