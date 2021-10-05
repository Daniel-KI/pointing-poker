import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { updateIssues } from '../redux/actions/issuesActions';
import { addMessage } from '../redux/actions/messagesActions';
import { updateSettings } from '../redux/actions/settingsActions';
import { updateUsers } from '../redux/actions/usersActions';
import { IIssue, IMessage, ISettings, IState, IUser } from '../redux/models';
import useLeaveRoom from './useLeaveRoom';

const useLobby = (): void => {
  const dispatch = useDispatch();
  const history = useHistory();

  const socket = useSelector((state: IState) => state.socket);
  const roomId = useSelector((state: IState) => state.room.id);

  useLeaveRoom();

  useEffect(() => {
    socket.on('users', (users: IUser[]) => {
      dispatch(updateUsers(users));
    });

    socket.on('newMessage', (message: IMessage) => {
      dispatch(addMessage(message));
    });

    socket.on('settings', (settingsData: ISettings, issues: IIssue[], users: IUser[]) => {
      dispatch(updateSettings(settingsData));
      dispatch(updateIssues(issues));
      dispatch(updateUsers(users));
      history.push(`/game/${roomId}`);
    });

    return () => {
      socket.offAny();
    };
  }, []);
};

export default useLobby;
