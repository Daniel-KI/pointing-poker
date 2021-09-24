/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import './Settings.scss';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import { SettingsProps } from './models';
import UserCard from '../../components/UserCard/UserCard';
import TextInput from '../../components/TextInput/TextInput';
import Button from '../../components/Button/Button';
import IssueCreationCard from '../../components/IssueCreationCard/IssueCreationCard';
import IssueCard from '../../components/IssueCard/IssueCard';
import Toggle from '../../components/Toggle/Toggle';
import Timer from '../../components/Timer/Timer';
import SpOptionCard from '../../components/SpOptionCard/SpOptionCard';
import { SpOptionCardProps } from '../../components/SpOptionCard/models';
import { UserCardProps } from '../../components/UserCard/models';
import { IssueCardProps } from '../../components/IssueCard/models';
import ConfirmModal from '../../components/ConfirmModal/ConfirmModal';
import CreateIssueModal from '../../components/CreateIssueModal/CreateIssueModal';
import { SpCardBackProps } from '../../components/SpCardBack/models';
import SpCardBack from '../../components/SpCardBack/SpCardBack';
import SpCreationCard from '../../components/SpCreationCard/SpCreationCard';
import DataControlPanel from '../../components/DataControlPanel/DataControlPanel';

const Settings: React.FC<SettingsProps> = ({ lobbyTitle, master, members, issues, voteCards, cardsBack }) => {
  const [scramMaster, toggleScramMaster] = useState<boolean>(false);
  const [changingCard, toggleChangingCard] = useState<boolean>(false);
  const [timerNeeded, toggleTimerNeeded] = useState<boolean>(false);
  const [addNewPlayer, toggleAddNewPlayer] = useState<boolean>(false);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  const [isCreateIssue, setCreateIssue] = useState(false);
  const [isConfirm, setConfirm] = useState(false);

  const onConfirm = () => {
    setConfirm(false);
    setCreateIssue(false);
  };
  const onDecline = () => {
    setConfirm(false);
    setCreateIssue(false);
  };
  const deleteAction = () => {
    setConfirm(!isConfirm);
  };
  const addAction = () => {
    setCreateIssue(!isCreateIssue);
  };
  const editAction = () => {
    console.log('edit');
  };

  const onSubmit = () => {
    setConfirm(false);
  };

  const onClick = () => {
    console.log('click');
  };

  return (
    <div className='lobby'>
      <Header isAuthorized />
      <div className='lobby__wrapper'>
        <h2 className='lobby__title'>
          <div className='lobby__title_content'>{lobbyTitle}</div>
          <DataControlPanel editAction={editAction} />
        </h2>
        <div className='lobby__scram-master'>
          <div className='lobby__scram-master_card-field-wrapper'>
            <div className='lobby__scram-master_card-field'>
              <div>Scram master:</div>
              <UserCard
                name={master?.name}
                surname={master?.surname}
                jobPosition={master?.jobPosition}
                avatar={master?.avatar}
                color='primary'
                className='lobby__scram-master_card'
              />
            </div>

            <div className='lobby__scram-master_link-field'>
              <div>Link to lobby:</div>
              <TextInput size='large' className='lobby__scram-master_link-input' />
              <Button color='dark' size='large'>
                Copy
              </Button>
            </div>
          </div>

          <div className='lobby__scram-master_button-field'>
            <Button color='success' size='large'>
              Start game
            </Button>
            <Button color='danger' size='large'>
              Cancel game
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

        <div className='lobby__issues'>
          <h3 className='lobby__issues_title'>Issues</h3>
          <div className='lobby__issues_issues-field'>
            {issues?.map((element: IssueCardProps, index: number) => (
              <IssueCard
                key={index.toString()}
                name={element.name}
                priority={element.priority}
                deleteAction={element.deleteAction}
                editAction={element.editAction}
                className='lobby__issues_issue'
              />
            ))}
            <IssueCreationCard label='Create issue' addAction={addAction} className='lobby__issues_create-issue' />
          </div>
        </div>

        <div className='lobby__settings'>
          <h3 className='lobby__settings_title'>Game settings</h3>
          <div className='lobby__settings_settings-field'>
            <form className='lobby__settings_items'>
              <Toggle
                checked={scramMaster}
                inputId='scramMasterToggle'
                onChange={toggleScramMaster}
                className='lobby__settings_toggle-item'
              >
                Scram master as player:
              </Toggle>
              <Toggle
                checked={changingCard}
                inputId='changingCardToggle'
                onChange={toggleChangingCard}
                className='lobby__settings_toggle-item'
              >
                Changing card in round end:
              </Toggle>
              <Toggle
                checked={timerNeeded}
                inputId='timerNeededToggle'
                onChange={toggleTimerNeeded}
                className='lobby__settings_toggle-item'
              >
                Is timer needed:
              </Toggle>
              <Toggle
                checked={addNewPlayer}
                inputId='addNewPlayerToggle'
                onChange={toggleAddNewPlayer}
                className='lobby__settings_toggle-item'
              >
                Add new players automatically:
              </Toggle>
              <label htmlFor='scoreType' className='lobby__settings_input-item'>
                <div>Score type:</div>
                <TextInput id='scoreType' name='scoreType' placeholder='Story point' />
              </label>
              <label htmlFor='scoreTypeShort' className='lobby__settings_input-item'>
                <div>Score type (Short):</div>
                <TextInput id='scoreTypeShort' name='scoreTypeShort' placeholder='SP' />
              </label>
              <label htmlFor='timer' className='lobby__settings_input-item'>
                <div>Round time:</div>
                <Timer
                  id='timer'
                  minutes={minutes}
                  seconds={seconds}
                  setMinutes={setMinutes}
                  setSeconds={setSeconds}
                  className='lobby__settings_timer'
                />
              </label>
            </form>
            <div className='lobby__settings_items'>
              <div className='lobby__settings_cards-back'>
                <div>Set card back:</div>
                <div className='lobby__settings_cards-back-items'>
                  {cardsBack?.map((element: SpCardBackProps, index: number) => (
                    <SpCardBack
                      key={index.toString()}
                      className='lobby__settings_cards-back-item'
                      type={element.type}
                      size='small'
                      onClick={onClick}
                    />
                  ))}
                </div>
              </div>
              <div className='lobby__settings_cards-front'>
                <div>Add card values:</div>
                <div className='lobby__settings_cards-front-items'>
                  {voteCards?.map((element: SpOptionCardProps, index: number) => (
                    <SpOptionCard
                      key={index.toString()}
                      className='lobby__settings_cards-front-item'
                      deleteAction={element.deleteAction}
                      editAction={element.editAction}
                      score={element.score}
                      units={element.units}
                      size='small'
                    />
                  ))}
                  <SpCreationCard onClick={onClick} size='small' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />

      {isConfirm ? (
        <ConfirmModal isActive={isConfirm} setActive={setConfirm} onDecline={onDecline} onConfirm={onConfirm}>
          Remove Daniil Korshov from lobby?
        </ConfirmModal>
      ) : null}

      {isCreateIssue ? (
        <CreateIssueModal isActive={isCreateIssue} setActive={setCreateIssue} onSubmit={onSubmit} />
      ) : null}
    </div>
  );
};

export default Settings;
