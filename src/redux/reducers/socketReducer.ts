import { ISocketState } from '../models';
import { ISocketAction, SET_SOCKET } from '../actions/socketActions';

const initialState: ISocketState = {
  socket: null,
};

const socketReducer = (state = initialState, action: ISocketAction): ISocketState => {
  switch (action.type) {
    case SET_SOCKET:
      return { ...state, socket: action.socket };
    default:
      return state;
  }
};

export default socketReducer;
