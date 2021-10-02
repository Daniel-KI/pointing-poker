import { IRoom } from '../models';
import { RoomActionsType, SET_ROOM, UPDATE_ROOM_NAME } from '../actions/roomActions';

const initialState: IRoom = {
  id: undefined,
  name: undefined,
  admin: undefined,
};

const roomReducer = (state = initialState, action: RoomActionsType): IRoom => {
  switch (action.type) {
    case UPDATE_ROOM_NAME:
      return { ...state, name: action.name };
    case SET_ROOM:
      return { ...action.room };
    default:
      return state;
  }
};

export default roomReducer;
