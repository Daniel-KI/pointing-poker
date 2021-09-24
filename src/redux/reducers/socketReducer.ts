import { Socket } from 'socket.io-client';
import { ISocketAction, SET_SOCKET } from '../actions/socketActions';

const initialState: Socket | null = null;

const socketReducer = (state = initialState, action: ISocketAction): Socket | null => {
  switch (action.type) {
    case SET_SOCKET:
      return action.socket;
    default:
      return state;
  }
};

export default socketReducer;
