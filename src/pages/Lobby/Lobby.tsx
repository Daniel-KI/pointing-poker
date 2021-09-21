/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import './Lobby.scss';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import { LobbyProps } from './models';
import UserCard from '../../components/UserCard/UserCard';
import TextInput from '../../components/TextInput/TextInput';
import Button from '../../components/Button/Button';
import IssueCreationCard from '../../components/IssueCreationCard/IssueCreationCard';
import IssueCard from '../../components/IssueCard/IssueCard';
import Toggle from '../../components/Toggle/Toggle';
import Timer from '../../components/Timer/Timer';
import AddCard from '../../components/AddCard/AddCard';
import SPCard from '../../components/SPCard/SPCard';
import { SPCardProps } from '../../components/SPCard/models';
import { UserCardProps } from '../../components/UserCard/models';
import { IssueCardProps } from '../../components/IssueCard/models';
import { CardBackProps } from '../../components/CardBack/models';
import CardBack from '../../components/CardBack/CardBack';

const Lobby: React.FC<LobbyProps> = ({ lobbyTitle, members, issues, voteCards, cardsBack }) => {
  const [scramMaster, toggleScramMaster] = useState<boolean>(false);
  const [changingCard, toggleChangingCard] = useState<boolean>(false);
  const [timerNeeded, toggleTimerNeeded] = useState<boolean>(false);
  const [addNewPlayer, toggleAddNewPlayer] = useState<boolean>(false);
  const [minutes, setMinutes] = useState<string>('00');
  const [seconds, setSeconds] = useState<string>('00');

  const deleteAction = () => {
    console.log('delete');
  };
  const addAction = () => {
    console.log('add');
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
                name='Daniil'
                surname='Korshov'
                jobPosition='Front-end developer'
                avatar=''
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
                deleteAction={element.deleteAction}
                className={element.className}
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
                className={element.className}
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
                <Timer id='timer' minutes={minutes} seconds={seconds} className='lobby__settings_timer' />
              </label>
            </form>
            <div className='lobby__settings_items'>
              <div className='lobby__settings_cards-back'>
                <div>Set card back:</div>
                <div className='lobby__settings_cards-back-items'>
                  {cardsBack?.map((element: CardBackProps, index: number) => (
                    <CardBack key={index.toString()} className={element.className} cardBack={element.cardBack} />
                  ))}
                </div>
              </div>
              <div className='lobby__settings_cards-front'>
                <div>Add card values:</div>
                <div className='lobby__settings_cards-front-items'>
                  {voteCards?.map((element: SPCardProps, index: number) => (
                    <SPCard
                      key={index.toString()}
                      className={element.className}
                      deleteAction={element.deleteAction}
                      editAction={element.editAction}
                      scoreType={element.scoreType}
                      cardScore={element.cardScore}
                      cardType={element.cardType}
                    />
                  ))}
                  <AddCard />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Lobby;

// В родительском компоненте:

// <Lobby
//        lobbyTitle='Spring 23 planning (issues 13, 533, 5623, 3252, 6623)'
//        members={members}
//        issues={issues}
//        voteCards={voteCards}
//        cardsBack={cardsBack}
//      />

//
// const members = [
//   {
//     name: 'Daniil',
//     surname: 'Korshov',
//     jobPosition: 'Front-end developer',
//     avatar: '',
//     deleteAction,
//     className: 'lobby__members_card',
//   },
//   {
//     name: 'Daniil',
//     surname: 'Korshov',
//     jobPosition: 'Front-end developer',
//     avatar: '',
//     deleteAction,
//     className: 'lobby__members_card',
//   },
// ];

// const issues = [
//   {
//     name: '2563',
//     priority: 'low priority',
//     editAction,
//     deleteAction,
//     className: 'lobby__issues_issues',
//   },
//   {
//     name: '2463',
//     priority: 'high priority',
//     editAction,
//     deleteAction,
//     className: 'lobby__issues_issues',
//   },
// ];

// const voteCards = [
//   {
//     className: 'lobby__settings_cards-front-item',
//     editAction,
//     deleteAction,
//   },
//   {
//     className: 'lobby__settings_cards-front-item',
//     editAction,
//     deleteAction,
//     scoreType: 'SP',
//     cardScore: '15',
//     cardType: 'default',
//   },
// ];

// const cardsBack = [
//   {
//     className: 'lobby__settings_cards-back-item',
//     cardBack: 'CardBack1',
//   },
//   {
//     className: 'lobby__settings_cards-back-item',
//     cardBack: 'CardBack2',
//   },
//   {
//     className: 'lobby__settings_cards-back-item',
//     cardBack: 'CardBack3',
//   },
//   {
//     className: 'lobby__settings_cards-back-item',
//     cardBack: 'CardBack4',
//   },
//   {
//     className: 'lobby__settings_cards-back-item',
//     cardBack: 'CardBack5',
//   },
// ];
