import { IRoom } from '../models';

export const SET_ROOM = 'SET_ROOM';
export const UPDATE_ROOM_NAME = 'UPDATE_ROOM_NAME';

export interface IRoomAction {
  type: typeof SET_ROOM;
  room: IRoom;
}

export interface IRoomNameAction {
  type: typeof UPDATE_ROOM_NAME;
  name: string;
}

export type RoomActionsType = IRoomAction | IRoomNameAction;

export const updateRoom = (room: IRoom): IRoomAction => {
  return {
    type: SET_ROOM,
    room,
  };
};

export const updateRoomName = (name: string): IRoomNameAction => {
  return {
    type: UPDATE_ROOM_NAME,
    name,
  };
};
