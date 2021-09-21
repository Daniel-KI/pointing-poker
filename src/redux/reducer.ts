import { ISocketAction, IStore, SET_SOCKET } from './actions';

const initialState: IStore = {
  socket: null,
};

const reducer = (state = initialState, action: ISocketAction): IStore => {
  switch (action.type) {
    case SET_SOCKET:
      return { ...state, socket: action.socket };
    default:
      return state;
  }
};

export default reducer;
