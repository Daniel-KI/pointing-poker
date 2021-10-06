import { ICurrentUser } from '../models';
import { ICurrentUserAction, SET_CURRENT_USER } from '../actions/currentUserActions';

const initialState: ICurrentUser = {
  id: null,
  role: 'user',
  isNewUser: false,
};

const currentUserReducer = (state = initialState, action: ICurrentUserAction): ICurrentUser => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return { ...action.currentUser };
    default:
      return state;
  }
};

export default currentUserReducer;
