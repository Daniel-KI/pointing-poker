import { IRoom } from '../models';

export const SET_ROOM = 'SET_ROOM';

export interface IRoomAction {
  type: typeof SET_ROOM;
  room: IRoom;
}

export const updateCurrentUser = (room: IRoom): IRoomAction => {
  return {
    type: SET_ROOM,
    room,
  };
};
