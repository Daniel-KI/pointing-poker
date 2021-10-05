import { IUser } from '../models';

export const UPDATE_USERS = 'UPDATE_USERS';

interface IUpdateUsersAction {
  type: typeof UPDATE_USERS;
  users: IUser[];
}

export type UsersActionsType = IUpdateUsersAction;

export const updateUsers = (users: IUser[]): IUpdateUsersAction => {
  return {
    type: UPDATE_USERS,
    users,
  };
};
