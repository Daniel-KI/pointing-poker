import { IUser } from '../models';
import { ADD_USER, REMOVE_USER, UsersActionsType } from '../actions/usersActions';

const initialState: IUser[] = [];

const usersReducer = (state = initialState, action: UsersActionsType): IUser[] => {
  switch (action.type) {
    case ADD_USER: {
      const newUsers = [...state];
      newUsers.push(action.user);
      return newUsers;
    }
    case REMOVE_USER: {
      const removedIndex = state.findIndex(({ id }) => id === action.user.id);
      const newUsers = [...state];
      newUsers.splice(removedIndex, 1);
      return newUsers;
    }
    default:
      return state;
  }
};

export default usersReducer;
