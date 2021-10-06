import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { updateIssues } from '../redux/actions/issuesActions';
import { addVote } from '../redux/actions/votesActions';
import { IIssue, IState, IUser } from '../redux/models';
import useLeaveRoom from './useLeaveRoom';

const useGame = (): void => {
  const dispatch = useDispatch();
  const history = useHistory();

  const socket = useSelector((state: IState) => state.socket);
  const roomId = useSelector((state: IState) => state.room.id);

  useLeaveRoom();

  useEffect(() => {
    socket.on('issues', (newIssues: IIssue[]) => {
      dispatch(updateIssues(newIssues));
    });

    socket.on('newVote', (newVote: { member: IUser; score: string }) => {
      dispatch(addVote(newVote));
    });

    socket.on('finishGame', () => {
      history.push(`/gameResults/${roomId}`);
    });

    return () => {
      socket.offAny();
    };
  }, []);
};

export default useGame;
