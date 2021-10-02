import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import leaveRoom from '../api/leaveRoom';
import { updateCurrentUser } from '../redux/actions/currentUserActions';
import { IState } from '../redux/models';

const useLeaveRoom = (): void => {
  const dispatch = useDispatch();
  const history = useHistory();

  const socket = useSelector((state: IState) => state.socket);
  const roomId = useSelector((state: IState) => state.room.id);
  const currentUserData = useSelector((state: IState) => state.currentUser);

  useEffect(() => {
    socket.on('userDelete', () => {
      // reset redux store
      dispatch(updateCurrentUser({ id: null, role: 'user' }));
      history.push(`/`);
    });

    const userBeforeLeaveHandler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '';
      return '';
    };

    const userLeaveHandler = () => {
      if (currentUserData.id && roomId) {
        leaveRoom(socket, currentUserData.id, roomId);
      }
    };

    window.addEventListener('beforeunload', userBeforeLeaveHandler);
    window.addEventListener('unload', userLeaveHandler);

    return () => {
      socket.offAny();
      window.removeEventListener('beforeunload', userBeforeLeaveHandler);
      window.removeEventListener('unload', userLeaveHandler);
    };
  }, []);
};

export default useLeaveRoom;
