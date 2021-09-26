/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import './Lobby.scss';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import UserCard from '../../components/UserCard/UserCard';
import ConfirmModal from '../../components/ConfirmModal/ConfirmModal';
import store from '../../redux/store';

const Lobby: React.FC = () => {
  const [isConfirm, setConfirm] = useState(false);

  const [isActiveExitModal, setExitModalActiveStatus] = useState(false);

  const lobbyTitle = store.getState().room.name;
  const master = store.getState().room.admin;
  const members = store.getState().users;
  const { currentUser } = store.getState();
  const currentUserData = members.find(user => user.id === currentUser.id);

  const onConfirmUserDeletion = () => {
    setConfirm(false);
  };
  const onDeclineUserDeletion = () => {
    setConfirm(false);
  };

  const exitBtnOnClick = () => {
    setExitModalActiveStatus(true);
  };
  const onConfirmExit = () => {
    setExitModalActiveStatus(false);
  };
  const onDeclineExit = () => {
    setExitModalActiveStatus(false);
  };

  const deleteAction = () => {
    setConfirm(!isConfirm);
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
                <p className='lobby__empty-text'>You are not authorized</p>
              )}
            </div>
          </div>

          <div className='lobby__members'>
            <h3 className='lobby__section-title'>Members</h3>
            <div className='lobby__members_container'>
              {members.length === 0 || (members.length === 1 && members[0].id === currentUser.id) ? (
                <p className='lobby__empty-text'>No members</p>
              ) : (
                members?.map(user =>
                  user.id !== currentUser.id ? (
                    <UserCard
                      key={user.firstName}
                      name={user.firstName}
                      surname={user.lastName}
                      jobPosition={user.position}
                      avatar={user.avatar}
                      deleteAction={deleteAction}
                      className='lobby__member_card'
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
        isActive={isConfirm}
        setActive={setConfirm}
        onDecline={onDeclineUserDeletion}
        onConfirm={onConfirmUserDeletion}
      >
        <p>
          <b>Daniil Korshov</b> want to remove <b>Ekaterina Kotliarenko</b>.
        </p>
        <p>Do you agree with it?</p>
      </ConfirmModal>

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
