import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { updateIssues } from '../redux/actions/issuesActions';
import { addMessage } from '../redux/actions/messagesActions';
import { IIssue, IMessage, IState, IUser } from '../redux/models';
import useLeaveRoom from './useLeaveRoom';

interface IVote {
  member: IUser;
  score: string;
}

const useGame = (): { votes: IVote[]; currentIssue: IIssue } => {
  const dispatch = useDispatch();

  const socket = useSelector((state: IState) => state.socket);
  const members = useSelector((state: IState) => state.users);
  const issues = useSelector((state: IState) => state.issues);

  const [votes, setVotes] = useState(() => members.map(member => ({ member, score: '' })));
  const [currentIssue, setCurrentIssue] = useState((): IIssue => issues[0]);

  useLeaveRoom();

  useEffect(() => {
    socket.on('newMessage', (message: IMessage) => {
      dispatch(addMessage(message));
    });

    socket.on('issues', (newIssues: IIssue[]) => {
      dispatch(updateIssues(newIssues));
    });

    socket.on('newVote', (newVote: { member: IUser; score: string }) => {
      if (votes.find(({ member }) => member.id === newVote.member.id)) {
        const updatedIndex = votes.findIndex(({ member }) => member.id === newVote.member.id);
        const newVotes = [...votes];
        newVotes[updatedIndex] = newVote;
        setVotes(newVotes);
      }
      setVotes([...votes, newVote]);
    });

    socket.on('currentIssue', (issue: IIssue) => {
      console.log('change issue', issue);
      setCurrentIssue(issue);
    });

    return () => {
      socket.offAny();
    };
  }, []);

  return { votes, currentIssue };
};

export default useGame;
