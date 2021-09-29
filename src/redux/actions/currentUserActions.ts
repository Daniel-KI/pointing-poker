import { ICurrentUser } from '../models';

export const SET_CURRENT_USER = 'SET_CURRENT_USER';

export interface ICurrentUserAction {
  type: typeof SET_CURRENT_USER;
  currentUser: ICurrentUser;
}

export const updateCurrentUser = (currentUser: ICurrentUser): ICurrentUserAction => {
  return {
    type: SET_CURRENT_USER,
    currentUser,
  };
};
