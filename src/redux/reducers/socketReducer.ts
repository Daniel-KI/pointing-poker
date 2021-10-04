import { io, Socket } from 'socket.io-client';
import { ENDPOINT } from '../../api/constants';
import { ISocketAction, SET_SOCKET } from '../actions/socketActions';

const initialState: Socket = io(ENDPOINT, { transports: ['websocket', 'polling'], closeOnBeforeunload: false });

const socketReducer = (state = initialState, action: ISocketAction): Socket => {
  switch (action.type) {
    case SET_SOCKET:
      return action.socket;
    default:
      return state;
  }
};

export default socketReducer;
