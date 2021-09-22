import { IRoomState } from '../models';
import { IRoomAction, SET_ROOM } from '../actions/roomActions';

const initialState: IRoomState = {
  room: null,
};

const roomReducer = (state = initialState, action: IRoomAction): IRoomState => {
  switch (action.type) {
    case SET_ROOM:
      return { ...state, room: action.room };
    default:
      return state;
  }
};

export default roomReducer;
