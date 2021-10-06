import { IMessage } from '../models';

export const ADD_MESSAGE = 'ADD_MESSAGE';

export interface IAddMessageAction {
  type: typeof ADD_MESSAGE;
  message: IMessage;
}

export const addMessage = (message: IMessage): IAddMessageAction => {
  return {
    type: ADD_MESSAGE,
    message,
  };
};
