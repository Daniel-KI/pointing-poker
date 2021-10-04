import { ADD_GAME_RESULT, IGameResultAction } from '../actions/gameResultsActions';
import { IGameResult } from '../models';

const initialState: IGameResult[] = [];

const gameResultsReducer = (state = initialState, action: IGameResultAction): IGameResult[] => {
  switch (action.type) {
    case ADD_GAME_RESULT: {
      const newResults = [...state];
      newResults.push(action.result);
      return newResults;
    }
    default:
      return state;
  }
};

export default gameResultsReducer;
