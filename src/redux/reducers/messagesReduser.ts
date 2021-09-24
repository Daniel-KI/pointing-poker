import { ADD_MESSAGE, IAddMessageAction } from '../actions/messagesActions';
import { IMessage } from '../models';

const initialState: IMessage[] = [];

const messagesReducer = (state = initialState, action: IAddMessageAction): IMessage[] => {
  switch (action.type) {
    case ADD_MESSAGE: {
      const newMessages = [...state];
      newMessages.push(action.message);
      return newMessages;
    }
    default:
      return state;
  }
};

export default messagesReducer;
