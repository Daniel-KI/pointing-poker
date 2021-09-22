import { ICurrentUserState } from '../models';
import { ICurrentUserAction, SET_CURRENT_USER } from '../actions/currentUserActions';

const initialState: ICurrentUserState = {
  currentUser: null,
};

const currentUserReducer = (state = initialState, action: ICurrentUserAction): ICurrentUserState => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return { ...state, currentUser: action.currentUser };
    default:
      return state;
  }
};

export default currentUserReducer;
