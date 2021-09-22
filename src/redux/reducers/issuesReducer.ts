import { IIssuesState } from '../models';
import { ADD_ISSUE, IssuesActionsType, REMOVE_ISSUE, UPDATE_ISSUE } from '../actions/issuesActions';

const initialState: IIssuesState = {
  issues: [],
};

const issuesReducer = (state = initialState, action: IssuesActionsType): IIssuesState => {
  switch (action.type) {
    case ADD_ISSUE: {
      const newIssues = [...state.issues];
      newIssues.push(action.issue);
      return { ...state, issues: newIssues };
    }
    case UPDATE_ISSUE: {
      const updatedIndex = state.issues.findIndex(({ id }) => id === action.issue.id);
      const newIssues = [...state.issues];
      newIssues[updatedIndex] = action.issue;
      return { ...state, issues: newIssues };
    }
    case REMOVE_ISSUE: {
      const removedIndex = state.issues.findIndex(({ id }) => id === action.issue.id);
      const newIssues = [...state.issues];
      newIssues.splice(removedIndex, 1);
      return { ...state, issues: newIssues };
    }
    default:
      return state;
  }
};

export default issuesReducer;
