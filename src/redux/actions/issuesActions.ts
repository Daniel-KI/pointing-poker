import { IIssue } from '../models';

export const ADD_ISSUE = 'ADD_ISSUE';
export const UPDATE_ISSUE = 'ADD_ISSUE';
export const REMOVE_ISSUE = 'REMOVE_ISSUE';

interface IAddIssueAction {
  type: typeof ADD_ISSUE;
  issue: IIssue;
}

interface IUpdateIssueAction {
  type: typeof ADD_ISSUE;
  issue: IIssue;
}

interface IRemoveIssueAction {
  type: typeof REMOVE_ISSUE;
  issue: IIssue;
}

export type IssuesActionsType = IAddIssueAction | IRemoveIssueAction;

export const addIssue = (issue: IIssue): IAddIssueAction => {
  return {
    type: ADD_ISSUE,
    issue,
  };
};

export const updateIssue = (issue: IIssue): IUpdateIssueAction => {
  return {
    type: UPDATE_ISSUE,
    issue,
  };
};

export const removeIssue = (issue: IIssue): IRemoveIssueAction => {
  return {
    type: REMOVE_ISSUE,
    issue,
  };
};
