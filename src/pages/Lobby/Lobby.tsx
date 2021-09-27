/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import './Lobby.scss';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import UserCard from '../../components/UserCard/UserCard';
import ConfirmModal from '../../components/ConfirmModal/ConfirmModal';
import store from '../../redux/store';
import { IUser } from '../../redux/models';

const Lobby: React.FC = () => {
  const [isActiveVoteModal, setVoteModalActiveStatus] = useState<boolean>(false);
  const [initiatorOfVoting] = useState<IUser>();
  const [userToRemoveByVoting] = useState<IUser>();

  const [isActiveExitModal, setExitModalActiveStatus] = useState<boolean>(false);

  const [isActiveDeleteModal, setDeleteModalActiveStatus] = useState<boolean>(false);
  const [userForDeletion, setUserForDeletion] = useState<IUser>();

  // Get data from state
  const lobbyTitle = store.getState().room.name;
  const master = store.getState().room.admin;
  const members = store.getState().users;
  const { currentUser } = store.getState();
  const currentUserData = members.find(user => user.id === currentUser.id);

  const exitBtnOnClick = () => {
    setExitModalActiveStatus(true);
  };

  const onDeclineExit = () => {
    setExitModalActiveStatus(false);
  };
  const onConfirmExit = () => {
    setExitModalActiveStatus(false);
    // delete currentUser & currentUserData
  };

  const deleteUserBtnOnClick = () => {
    setDeleteModalActiveStatus(true);
  };
  const onDeclineUserDeletion = () => {
    setDeleteModalActiveStatus(false);
  };
  const onConfirmUserDeletion = () => {
    setDeleteModalActiveStatus(false);
    // start voting for the removal of member
  };

  const isOnlyMasterAndOrCurrentUser = (): boolean => {
    const { length } = members;
    const isAdmin = Boolean(members.find(member => member.id === master?.id));
    const isCurrentUser = Boolean(members.find(member => member.id === currentUserData?.id));
    return (length === 2 && isAdmin && isCurrentUser) || length === 1 || !length;
  };

  const checkIsNotAdminOrCurrentUser = (user: IUser) => {
    return user.id !== currentUser.id && user.id !== master?.id;
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
                  surname={master.firstName}
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
              {currentUser && currentUserData ? (
                <UserCard
                  name={currentUserData?.firstName}
                  surname={currentUserData?.firstName}
                  jobPosition={currentUserData?.position}
                  avatar={currentUserData?.avatar}
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
              {isOnlyMasterAndOrCurrentUser() ? (
                <p className='lobby__empty-text'>There is no members</p>
              ) : (
                members?.map(user =>
                  checkIsNotAdminOrCurrentUser(user) ? (
                    <UserCard
                      key={user.firstName}
                      name={user.firstName}
                      surname={user.lastName}
                      jobPosition={user.position}
                      avatar={user.avatar}
                      className='lobby__member_card'
                      deleteAction={() => {
                        setUserForDeletion(user);
                        deleteUserBtnOnClick();
                      }}
                    />
                  ) : null,
                )
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />

      <ConfirmModal
        isActive={isActiveDeleteModal}
        setActive={setDeleteModalActiveStatus}
        onDecline={onDeclineUserDeletion}
        onConfirm={onConfirmUserDeletion}
      >
        <p>
          Are you sure you want to start voting for the removal of member
          <span>{` ${userForDeletion?.firstName} ${userForDeletion?.lastName}`}</span>
        </p>
      </ConfirmModal>

      <ConfirmModal
        isActive={isActiveExitModal}
        setActive={setExitModalActiveStatus}
        onDecline={onDeclineExit}
        onConfirm={onConfirmExit}
      >
        <p>Are you sure you want to leave the room?</p>
      </ConfirmModal>

      <ConfirmModal
        isActive={isActiveVoteModal}
        setActive={setVoteModalActiveStatus}
        onDecline={onDeclineUserDeletion}
        onConfirm={onConfirmUserDeletion}
      >
        <p>
          <span>{`${initiatorOfVoting?.firstName} ${initiatorOfVoting?.lastName}`}</span> want to remove
          <span>{` ${userToRemoveByVoting?.firstName} ${userToRemoveByVoting?.lastName}`}</span>.
        </p>
        <p>Do you agree with it?</p>
      </ConfirmModal>
    </div>
  );
};

export default Lobby;
