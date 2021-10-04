import { IGameResult } from '../models';

export const ADD_GAME_RESULT = 'ADD_GAME_RESULT';
export const UPDATE_GAME_RESULT = 'UPDATE_GAME_RESULT';

export interface IAddGameResultAction {
  type: typeof ADD_GAME_RESULT;
  result: IGameResult;
}

export interface IUpdateGameResultAction {
  type: typeof UPDATE_GAME_RESULT;
  result: IGameResult;
}

export type GameResultsActionsType = IAddGameResultAction | IUpdateGameResultAction;

export const addGameResult = (result: IGameResult): IAddGameResultAction => {
  return {
    type: ADD_GAME_RESULT,
    result,
  };
};

export const updateGameResult = (result: IGameResult): IUpdateGameResultAction => {
  return {
    type: UPDATE_GAME_RESULT,
    result,
  };
};
