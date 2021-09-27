import { IRoom } from '../models';
import { IRoomAction, SET_ROOM } from '../actions/roomActions';

const initialState: IRoom = {
  id: undefined,
  name: undefined,
  admin: undefined,
};

const roomReducer = (state = initialState, action: IRoomAction): IRoom => {
  switch (action.type) {
    case SET_ROOM:
      return { ...action.room };
    default:
      return state;
  }
};

export default roomReducer;
