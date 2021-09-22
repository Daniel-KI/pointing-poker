import { IUsersState } from '../models';
import { ADD_USER, REMOVE_USER, UsersActionsType } from '../actions/usersActions';

const initialState: IUsersState = {
  users: [],
};

const usersReducer = (state = initialState, action: UsersActionsType): IUsersState => {
  switch (action.type) {
    case ADD_USER: {
      const newUsers = [...state.users];
      newUsers.push(action.user);
      return { ...state, users: newUsers };
    }
    case REMOVE_USER: {
      const removedIndex = state.users.findIndex(({ id }) => id === action.user.id);
      const newUsers = [...state.users];
      newUsers.splice(removedIndex, 1);
      return { ...state, users: newUsers };
    }
    default:
      return state;
  }
};

export default usersReducer;
