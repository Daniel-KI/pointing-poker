import { ADD_VOTE, UPDATE_VOTES, VotesActionsType } from '../actions/votesActions';
import { IVote } from '../models';

const initialState: IVote[] = [];

const votesReducer = (state = initialState, action: VotesActionsType): IVote[] => {
  switch (action.type) {
    case ADD_VOTE: {
      let newVotes;
      if (state.find(({ member }) => member.id === action.vote.member.id)) {
        const updatedIndex = state.findIndex(({ member }) => member.id === action.vote.member.id);
        newVotes = [...state];
        newVotes[updatedIndex] = action.vote;
      } else {
        newVotes = [...state];
        newVotes.push(action.vote);
      }
      return newVotes;
    }
    case UPDATE_VOTES:
      return [...action.votes];
    default:
      return state;
  }
};

export default votesReducer;
