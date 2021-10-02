import { IIssue } from '../models';

export const ADD_ISSUE = 'ADD_ISSUE';
export const UPDATE_ISSUE = 'UPDATE_ISSUE';
export const REMOVE_ISSUE = 'REMOVE_ISSUE';

interface IAddIssueAction {
  type: typeof ADD_ISSUE;
  issue: IIssue;
}

interface IUpdateIssueAction {
  type: typeof UPDATE_ISSUE;
  issue: IIssue;
}

interface IRemoveIssueAction {
  type: typeof REMOVE_ISSUE;
  id: number;
}

export type IssuesActionsType = IAddIssueAction | IUpdateIssueAction | IRemoveIssueAction;

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

export const removeIssue = (id: number): IRemoveIssueAction => {
  return {
    type: REMOVE_ISSUE,
    id,
  };
};
