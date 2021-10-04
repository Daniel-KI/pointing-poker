import { IIssue } from '../models';
import { ADD_ISSUE, IssuesActionsType, REMOVE_ISSUE, UPDATE_ISSUE, UPDATE_ISSUES } from '../actions/issuesActions';

const initialState: IIssue[] = [];

const issuesReducer = (state = initialState, action: IssuesActionsType): IIssue[] => {
  switch (action.type) {
    case ADD_ISSUE: {
      const newIssues = [...state];
      newIssues.push(action.issue);
      return newIssues;
    }
    case UPDATE_ISSUE: {
      const updatedIndex = state.findIndex(({ id }) => id === action.issue.id);
      const newIssues = [...state];
      newIssues[updatedIndex] = action.issue;
      return newIssues;
    }
    case REMOVE_ISSUE: {
      const removedIndex = state.findIndex(({ id }) => id === action.id);
      const newIssues = [...state];
      newIssues.splice(removedIndex, 1);
      return newIssues;
    }
    case UPDATE_ISSUES:
      return [...action.issues];
    default:
      return state;
  }
};

export default issuesReducer;
