import { IIssue } from '../models';
import { ADD_ISSUE, IssuesActionsType, REMOVE_ISSUE, UPDATE_ISSUE } from '../actions/issuesActions';

const initialState: IIssue[] = [];

const issuesReducer = (state = initialState, action: IssuesActionsType): IIssue[] => {
  switch (action.type) {
    case ADD_ISSUE: {
      // send new issue to server
      const newIssues = [...state];
      newIssues.push(action.issue);
      return newIssues;
    }
    case UPDATE_ISSUE: {
      // send updated issue to server
      const updatedIndex = state.findIndex(({ id }) => id === action.issue.id);
      const newIssues = [...state];
      newIssues[updatedIndex] = action.issue;
      return newIssues;
    }
    case REMOVE_ISSUE: {
      // send deleted issue to server
      const removedIndex = state.findIndex(({ id }) => id === action.issue.id);
      const newIssues = [...state];
      newIssues.splice(removedIndex, 1);
      return newIssues;
    }
    default:
      return state;
  }
};

export default issuesReducer;
