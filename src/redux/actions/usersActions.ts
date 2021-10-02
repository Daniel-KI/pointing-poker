import { IUser } from '../models';

export const ADD_USER = 'ADD_USER';
export const REMOVE_USER = 'REMOVE_USER';

interface IAddUserAction {
  type: typeof ADD_USER;
  user: IUser;
}

interface IRemoveUserAction {
  type: typeof REMOVE_USER;
  id: string;
}

export type UsersActionsType = IAddUserAction | IRemoveUserAction;

export const addUser = (user: IUser): IAddUserAction => {
  return {
    type: ADD_USER,
    user,
  };
};

export const removeUser = (id: string): IRemoveUserAction => {
  return {
    type: REMOVE_USER,
    id,
  };
};
