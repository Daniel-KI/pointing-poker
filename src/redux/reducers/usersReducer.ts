import { IUser } from '../models';
import { ADD_USER, REMOVE_USER, UsersActionsType } from '../actions/usersActions';

const initialState: IUser[] = [
  {
    id: 'qwe',
    firstName: 'Dan',
    lastName: 'Kor',
    position: 'developer',
    avatar: '',
    isObserver: true,
  },
  {
    id: '123',
    firstName: 'Kate',
    lastName: 'Lor',
    position: 'QA',
    avatar: '',
    isObserver: true,
  },
  {
    id: 'zxc',
    firstName: 'Max',
    lastName: 'Pop',
    position: 'BA',
    avatar: '',
    isObserver: true,
  },
  {
    id: 'kkmf',
    firstName: 'qkwemwqle',
    lastName: 'qwmelwqmeq',
    position: 'qwemlwqe',
    avatar: '',
    isObserver: true,
  },
];

const usersReducer = (state = initialState, action: UsersActionsType): IUser[] => {
  switch (action.type) {
    case ADD_USER: {
      // send new user to server
      const newUsers = [...state];
      newUsers.push(action.user);
      return newUsers;
    }
    case REMOVE_USER: {
      // send removed user to server
      const removedIndex = state.findIndex(({ id }) => id === action.id);
      const newUsers = [...state];
      newUsers.splice(removedIndex, 1);
      return newUsers;
    }
    default:
      return state;
  }
};

export default usersReducer;
