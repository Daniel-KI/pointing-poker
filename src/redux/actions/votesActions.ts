import { IVote } from '../models';

export const ADD_VOTE = 'ADD_VOTE';
export const UPDATE_VOTE = 'UPDATE_VOTE';
export const UPDATE_VOTES = 'UPDATE_VOTES';

interface IAddVoteAction {
  type: typeof ADD_VOTE;
  vote: IVote;
}

interface IUpdateVoteAction {
  type: typeof UPDATE_VOTE;
  vote: IVote;
}

interface IUpdateVotesAction {
  type: typeof UPDATE_VOTES;
  votes: IVote[];
}

export type VotesActionsType = IAddVoteAction | IUpdateVoteAction | IUpdateVotesAction;

export const addVote = (vote: IVote): IAddVoteAction => {
  return {
    type: ADD_VOTE,
    vote,
  };
};

export const updateVote = (vote: IVote): IUpdateVoteAction => {
  return {
    type: UPDATE_VOTE,
    vote,
  };
};

export const updateVotes = (votes: IVote[]): IUpdateVotesAction => {
  return {
    type: UPDATE_VOTES,
    votes,
  };
};
