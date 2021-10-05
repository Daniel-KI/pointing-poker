import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { updateIssues } from '../redux/actions/issuesActions';
import { addMessage } from '../redux/actions/messagesActions';
import { addVote } from '../redux/actions/votesActions';
import { IIssue, IMessage, IState, IUser } from '../redux/models';
import useLeaveRoom from './useLeaveRoom';

const useGame = (): void => {
  const dispatch = useDispatch();

  const socket = useSelector((state: IState) => state.socket);

  useLeaveRoom();

  useEffect(() => {
    socket.on('newMessage', (message: IMessage) => {
      dispatch(addMessage(message));
    });

    socket.on('issues', (newIssues: IIssue[]) => {
      dispatch(updateIssues(newIssues));
    });

    socket.on('newVote', (newVote: { member: IUser; score: string }) => {
      dispatch(addVote(newVote));
    });

    return () => {
      socket.offAny();
    };
  }, []);
};

export default useGame;
