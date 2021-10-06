import { IUser } from '../../models';
import usersReducer from '../usersReducer';
import { addUser, removeUser } from '../../actions/usersActions';

const testState: IUser[] = [];
const testUser: IUser = {
  id: '123',
  firstName: 'Elon',
  lastName: 'Musk',
  position: 'Director',
  avatar: '',
  isObserver: false,
};

describe('Test usersReducer', () => {
  it('Add user', () => {
    const expectedState = [...testState, testUser];
    const newState = usersReducer(testState, addUser(testUser));
    expect(newState).toStrictEqual(expect.arrayContaining(expectedState));
    expect(newState).toStrictEqual(expectedState);
  });
  it(`Remove user`, () => {
    const initialState = [...testState, testUser];
    const expectedState = [...testState];
    const newState = usersReducer(initialState, removeUser(testUser.id));
    expect(newState).toStrictEqual(expect.arrayContaining(expectedState));
    expect(newState).toStrictEqual(expectedState);

  });
});
