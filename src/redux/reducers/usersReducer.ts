import { IUser } from '../models';
import { UPDATE_USERS, UsersActionsType } from '../actions/usersActions';

const initialState: IUser[] = [
  // {
  //   id: 'FoI4w4XyQS9Znf8PAAAJ',
  //   firstName: 'aaa',
  //   lastName: 'aaa',
  //   position: 'aaaa',
  //   avatar: '',
  //   isObserver: false,
  // },
  // {
  //   id: '0tmLjtZPwz3W1nB9AAAL',
  //   firstName: 'xxx',
  //   lastName: 'xxx',
  //   position: 'xxx',
  //   avatar: '',
  //   isObserver: true,
  // },
  // {
  //   id: 'Yvo3iyLmp_JTYpeeAAAH',
  //   firstName: 'sss',
  //   lastName: 'sss',
  //   position: 'sss',
  //   avatar: '',
  //   isObserver: false,
  // },
];

const usersReducer = (state = initialState, action: UsersActionsType): IUser[] => {
  switch (action.type) {
    case UPDATE_USERS:
      return [...action.users];
    default:
      return state;
  }
};

export default usersReducer;
