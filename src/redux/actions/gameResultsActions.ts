import { IGameResult } from '../models';

export const ADD_GAME_RESULT = 'ADD_GAME_RESULT';

export interface IGameResultAction {
  type: typeof ADD_GAME_RESULT;
  result: IGameResult;
}

export const addGameResult = (result: IGameResult): IGameResultAction => {
  return {
    type: ADD_GAME_RESULT,
    result,
  };
};
