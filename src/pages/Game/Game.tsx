/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useRef, useState } from 'react';
import './Game.scss';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import { GameProps, GameResultProps } from './models';
import UserCard from '../../components/UserCard/UserCard';
import Button from '../../components/Button/Button';
import { UserCardProps } from '../../components/UserCard/models';
import ConfirmModal from '../../components/ConfirmModal/ConfirmModal';
import DataControlPanel from '../../components/DataControlPanel/DataControlPanel';
import Timer from '../../components/Timer/Timer';
import { IssueCardProps } from '../../components/IssueCard/models';
import IssueCard from '../../components/IssueCard/IssueCard';
import IssueCreationCard from '../../components/IssueCreationCard/IssueCreationCard';

const Game: React.FC<GameProps> = ({ isMaster, lobbyTitle, master, members, issues, gameResult }) => {
  const [isConfirm, setConfirm] = useState(false);
  const [isCreateIssue, setCreateIssue] = useState(false);
  const [isTimeOut, setTimeOut] = useState(false);
  const [isGameOn, setGameOn] = useState(false);
  const [minutes, setMinutes] = useState<number>(2);
  const [seconds, setSeconds] = useState<number>(0);

  const onConfirm = () => {
    setConfirm(false);
  };
  const onDecline = () => {
    setConfirm(false);
  };
  const deleteAction = () => {
    setConfirm(!isConfirm);
  };
  const editAction = () => {
    console.log('edit');
  };
  const addAction = () => {
    setCreateIssue(!isCreateIssue);
  };
  const onSubmit = () => {
    setConfirm(false);
  };

  const runRound = () => {
    if (!isGameOn) {
      setGameOn(true);
    } else {
      setGameOn(false);
      setMinutes(2);
      setSeconds(0);
    }
  };

  return (
    <div className='game'>
      <Header isAuthorized />
      <div className='game__wrapper'>
        <h2 className='game__title'>
          <div className='game__title_content'>{lobbyTitle}</div>
          {isMaster ? <DataControlPanel editAction={editAction} /> : null}
        </h2>
        <div className='game__scram-master'>
          <div className='game__scram-master_card-field-wrapper'>
            <div className='game__scram-master_card-field'>
              <div className='game__scram-master_card-master'>
                <div>Scram master:</div>
                <UserCard
                  name={master?.name}
                  surname={master?.surname}
                  jobPosition={master?.jobPosition}
                  avatar={master?.avatar}
                  color={isMaster ? 'primary' : undefined}
                  className='game__scram-master_card'
                />
              </div>
              <div className='game__scram-master_card-master-btn'>
                <Button color='danger' size='large'>
                  Stop game
                </Button>
              </div>
              <div className='game__scram-master_timer'>
                <Timer
                  id='timer'
                  minutes={minutes}
                  seconds={seconds}
                  setMinutes={setMinutes}
                  setSeconds={setSeconds}
                  isGameOn={isGameOn}
                  setGameOn={setGameOn}
                  className='lobby__settings_timer'
                  disabled
                />
              </div>
              <div className='game__scram-master_timer-btn'>
                <Button color='dark' size='large' onClick={runRound}>
                  {isGameOn ? 'Restart round' : 'Run round'}
                </Button>
              </div>
            </div>
            <div className='game__issues'>
              <h3 className='game__issues_title'>Issues</h3>
              <div className='game__issues_issues-field'>
                {issues?.map((element: IssueCardProps, index: number) => (
                  <IssueCard
                    key={index.toString()}
                    name={element.name}
                    priority={element.priority}
                    deleteAction={element.deleteAction}
                    editAction={element.editAction}
                    className='game__issues_issue'
                  />
                ))}
                <IssueCreationCard label='Create issue' addAction={addAction} className='game__issues_create-issue' />
              </div>
            </div>
          </div>
          <div className='game__scram-master_score-wrapper'>
            <h3 className='game__scram-master_score-title'>Score table</h3>
            <table>
              <thead>
                <tr>
                  <th className='game__scram-master_score'>Score</th>
                  <th>Player</th>
                </tr>
              </thead>
              <tbody>
                {gameResult?.map((element: GameResultProps, index: number) => (
                  <tr className='game__members_tr'>
                    <td data-label='Score' className='game__members_table-score'>
                      {isTimeOut ? element.score : 'In progress'}
                    </td>
                    <td data-label='Player' className='game__members_table-card'>
                      <UserCard
                        key={index.toString()}
                        name={element.player.name}
                        surname={element.player.surname}
                        jobPosition={element.player.jobPosition}
                        avatar={element.player.avatar}
                        deleteAction={deleteAction}
                        className='game__members_card'
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />

      {isConfirm ? (
        <ConfirmModal isActive={isConfirm} setActive={setConfirm} onDecline={onDecline} onConfirm={onConfirm}>
          {isMaster ? (
            <div>Remove Daniil Korshov from lobby?</div>
          ) : (
            <div>
              <p>
                <b>Daniil Korshov</b> want to remove <b>Ekaterina Kotliarenko</b>.
              </p>
              <br />
              <p>Do you agree with it?</p>
            </div>
          )}
        </ConfirmModal>
      ) : null}
    </div>
  );
};

export default Game;
