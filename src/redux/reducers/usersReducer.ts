import { IUser } from '../models';
import { UPDATE_USERS, UsersActionsType } from '../actions/usersActions';

const initialState: IUser[] = [];

const usersReducer = (state = initialState, action: UsersActionsType): IUser[] => {
  switch (action.type) {
    case UPDATE_USERS:
      return [...action.users];
    default:
      return state;
  }
};

export default usersReducer;
