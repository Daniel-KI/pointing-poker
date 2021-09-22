/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import './Lobby.scss';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import { LobbyProps } from './models';
import UserCard from '../../components/UserCard/UserCard';
import Button from '../../components/Button/Button';
import { UserCardProps } from '../../components/UserCard/models';
import ConfirmModal from '../../components/ConfirmModal/ConfirmModal';

const Lobby: React.FC<LobbyProps> = ({ lobbyTitle, master, members }) => {
  const [isConfirm, setConfirm] = useState(false);

  const onConfirm = () => {
    setConfirm(false);
  };
  const onDecline = () => {
    setConfirm(false);
  };
  const deleteAction = () => {
    setConfirm(!isConfirm);
  };
  const onSubmit = () => {
    setConfirm(false);
  };

  return (
    <div className='lobby'>
      <Header isAuthorized />
      <div className='lobby__wrapper'>
        <h2 className='lobby__title'>{lobbyTitle}</h2>
        <div className='lobby__scram-master'>
          <div className='lobby__scram-master_card-field-wrapper'>
            <div className='lobby__scram-master_card-field'>
              <div>Scram master:</div>
              <UserCard
                name={master?.name}
                surname={master?.surname}
                jobPosition={master?.jobPosition}
                avatar={master?.avatar}
                color={undefined}
                className='lobby__scram-master_card'
              />
            </div>
          </div>
          <div className='lobby__scram-master_button-field'>
            <Button color='danger' size='large'>
              Exit game
            </Button>
          </div>
        </div>

        <div className='lobby__members'>
          <h3 className='lobby__members_title'>Members</h3>

          <div className='lobby__members_members-field'>
            {members?.map((element: UserCardProps, index: number) => (
              <UserCard
                key={index.toString()}
                name={element.name}
                surname={element.surname}
                jobPosition={element.jobPosition}
                avatar={element.avatar}
                deleteAction={deleteAction}
                className='lobby__members_card'
              />
            ))}
          </div>
        </div>
      </div>
      <Footer />

      {isConfirm ? (
        <ConfirmModal isActive={isConfirm} setActive={setConfirm} onDecline={onDecline} onConfirm={onConfirm}>
          <div>
            <p>
              <b>Daniil Korshov</b> want to remove <b>Ekaterina Kotliarenko</b>.
            </p>
            <br />
            <p>Do you agree with it?</p>
          </div>
        </ConfirmModal>
      ) : null}
    </div>
  );
};

export default Lobby;
