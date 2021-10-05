import './Lobby.scss';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { IState, IUser } from '../../redux/models';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import UserCard from '../../components/UserCard/UserCard';
import ConfirmModal from '../../components/ConfirmModal/ConfirmModal';
import leaveRoom from '../../api/leaveRoom';
import useLobby from '../../hooks/useLobby';

const Lobby: React.FC = () => {
  const [isActiveExitModal, setExitModalActiveStatus] = useState<boolean>(false);

  // Get data from state
  const socket = useSelector((state: IState) => state.socket);
  const lobbyTitle = useSelector((state: IState) => state.room.name);
  const master = useSelector((state: IState) => state.room.admin);
  const members = useSelector((state: IState) => state.users);
  const roomId = useSelector((state: IState) => state.room.id);
  const currentUserData = useSelector((state: IState) => state.currentUser);
  const currentUser = members.find(user => user.id === currentUserData.id);

  useLobby();

  const exitBtnOnClick = () => {
    setExitModalActiveStatus(true);
  };

  const onDeclineExit = () => {
    setExitModalActiveStatus(false);
  };
  const onConfirmExit = () => {
    setExitModalActiveStatus(false);
    if (currentUserData.id && roomId) {
      leaveRoom(socket, currentUserData.id, roomId);
    }
  };

  const isOnlyMasterAndCurrentUser = (): boolean => {
    let commonUsersAmount = members.length;
    const isAdmin = Boolean(members.find(member => member.id === master?.id));
    const isCurrentUser = Boolean(members.find(member => member.id === currentUserData.id));
    if (isAdmin) commonUsersAmount -= 1;
    if (isCurrentUser) commonUsersAmount -= 1;
    return commonUsersAmount === 0;
  };

  const checkIsAdminOrCurrentUser = (user: IUser) => {
    const isAdmin = user.id === master?.id;
    const isCurrentUser = user.id === currentUserData.id;
    return isAdmin || isCurrentUser;
  };

  return (
    <div className='lobby'>
      <Header isAuthorized />
      <div className='lobby__wrapper'>
        <div className='lobby__container'>
          <h2 className='lobby__title'>{lobbyTitle || 'Lobby'}</h2>

          <div className='lobby__main-members'>
            <div className='lobby__scram-master'>
              <h3 className='lobby__section-title'>Scram master:</h3>
              {master ? (
                <UserCard
                  name={master.firstName}
                  surname={master.lastName}
                  jobPosition={master.position}
                  avatar={master.avatar}
                  color='primary'
                  className='lobby__scram-master-card'
                />
              ) : (
                <p className='lobby__empty-text'>There is no game master</p>
              )}
            </div>

            <div className='lobby__current-user'>
              <h3 className='lobby__section-title'>Current user:</h3>
              {currentUserData && currentUser ? (
                <UserCard
                  name={currentUser?.firstName}
                  surname={currentUser?.lastName}
                  jobPosition={currentUser?.position}
                  avatar={currentUser?.avatar}
                  color='success'
                  className='lobby__scram-master-card'
                  deleteAction={exitBtnOnClick}
                />
              ) : (
                <p className='lobby__empty-text'>There is no authorized user</p>
              )}
            </div>
          </div>

          <div className='lobby__members'>
            <h3 className='lobby__section-title'>Other members</h3>
            <div className='lobby__members_container'>
              {isOnlyMasterAndCurrentUser() === true ? (
                <p className='lobby__empty-text'>There is no members</p>
              ) : (
                members?.map(user =>
                  checkIsAdminOrCurrentUser(user) === true ? null : (
                    <UserCard
                      key={user.firstName}
                      name={user.firstName}
                      surname={user.lastName}
                      jobPosition={user.position}
                      avatar={user.avatar}
                      className='lobby__member_card'
                    />
                  ),
                )
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />

      <ConfirmModal
        isActive={isActiveExitModal}
        setActive={setExitModalActiveStatus}
        onDecline={onDeclineExit}
        onConfirm={onConfirmExit}
      >
        <p>Are you sure you want to leave the room?</p>
      </ConfirmModal>
    </div>
  );
};

export default Lobby;
