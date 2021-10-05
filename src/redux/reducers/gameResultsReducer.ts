import {
  ADD_GAME_RESULT,
  GameResultsActionsType,
  UPDATE_GAME_RESULT,
  UPDATE_GAME_RESULTS,
} from '../actions/gameResultsActions';
import { IGameResult } from '../models';

const initialState: IGameResult[] = [];

const gameResultsReducer = (state = initialState, action: GameResultsActionsType): IGameResult[] => {
  switch (action.type) {
    case ADD_GAME_RESULT: {
      const newResults = [...state];
      newResults.push(action.result);
      return newResults;
    }
    case UPDATE_GAME_RESULT: {
      const updatedIndex = state.findIndex(({ issue }) => issue.id === action.result.issue.id);
      const newResults = [...state];
      newResults[updatedIndex] = action.result;
      return newResults;
    }
    case UPDATE_GAME_RESULTS:
      return [...action.results];
    default:
      return state;
  }
};

export default gameResultsReducer;
