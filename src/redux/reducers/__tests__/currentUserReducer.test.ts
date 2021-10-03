import { ICurrentUser } from '../../models';
import currentUserReducer from '../currentUserReducer';
import { updateCurrentUser } from '../../actions/currentUserActions';

const testState: ICurrentUser = {
  id: null,
  role: 'user',
};

describe('Test currentUserReducer', () => {
  it('Set currentUser', () => {
    const newCurrentUser: ICurrentUser = {
      id: '123',
      role: 'admin',
    };
    const newState = currentUserReducer(testState, updateCurrentUser(newCurrentUser));
    expect(newState.id).toBeTruthy();
    expect(newState.role).toStrictEqual(expect.stringMatching('admin'));
    expect(newState).toStrictEqual(newCurrentUser);
  });
});
