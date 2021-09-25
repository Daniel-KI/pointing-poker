/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import './Game.scss';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import { GameProps, GameScoreProps, StatisticsCardsProps } from './models';
import UserCard from '../../components/UserCard/UserCard';
import Button from '../../components/Button/Button';
import ConfirmModal from '../../components/ConfirmModal/ConfirmModal';
import DataControlPanel from '../../components/DataControlPanel/DataControlPanel';
import Timer from '../../components/Timer/Timer';
import { IssueCardProps } from '../../components/IssueCard/models';
import IssueCard from '../../components/IssueCard/IssueCard';
import IssueCreationCard from '../../components/IssueCreationCard/IssueCreationCard';
import SpCardFront from '../../components/SpCardFront/SpCardFront';
import CreateIssueModal from '../../components/CreateIssueModal/CreateIssueModal';
import SpVoteCard from '../../components/SpVoteCard/SpVoteCard';
import { SpVoteCardProps } from '../../components/SpVoteCard/models';

const Game: React.FC<GameProps> = ({ isMaster, lobbyTitle, master, issues, gameScore, statisticsCards, voteCards }) => {
  const [isConfirm, setConfirm] = useState(false);
  const [isCreateIssue, setCreateIssue] = useState(false);
  const [isTimeOut, setTimeOut] = useState(false);
  const [isGameOn, setGameOn] = useState(true);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(3);

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
  const onClick = (event: any) => {
    console.log('click');
  };

  const runRound = () => {
    if (isGameOn && !isTimeOut) {
      setMinutes(0);
      setSeconds(3);
      setGameOn(false);
      setTimeOut(false);
    }
    if (!isGameOn && !isTimeOut) {
      setGameOn(true);
    }
    if (!isGameOn && isTimeOut) {
      setTimeOut(false);
      setMinutes(0);
      setSeconds(3);
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
                <Button color='danger' size='large' className='game__scram-master_exit-btn'>
                  {isMaster ? 'Stop game' : 'Exit'}
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
                  setTimeOut={setTimeOut}
                  className='game__settings_timer'
                  disabled={!isMaster}
                />
              </div>
              {isMaster ? (
                <div className='game__scram-master_timer-btn'>
                  <Button color='dark' size='large' onClick={runRound}>
                    {!isGameOn && !isTimeOut
                      ? 'Run round'
                      : [
                          isGameOn && !isTimeOut
                            ? 'Restart round'
                            : [!isGameOn && isTimeOut ? 'Restart round' : 'Restart round'],
                        ]}
                  </Button>
                  {isTimeOut ? (
                    <Button color='dark' size='large'>
                      Next issue
                    </Button>
                  ) : null}
                </div>
              ) : null}
            </div>
            <div className='game__issues'>
              <h3 className='game__issues_title'>Issues</h3>
              <div className='game__issues_issues-field'>
                {issues?.map((element: IssueCardProps, index: number) => (
                  <IssueCard
                    key={index.toString()}
                    name={element.name}
                    priority={element.priority}
                    deleteAction={isMaster ? element.deleteAction : undefined}
                    className='game__issues_issue'
                    color={element.color}
                  />
                ))}
                {isMaster ? (
                  <IssueCreationCard label='Create issue' addAction={addAction} className='game__issues_create-issue' />
                ) : null}
              </div>
            </div>
            <div className='game__vote'>
              <h3 className='game__vote_title'>Vote</h3>
              <div className='game__vote_vote-field'>
                {voteCards?.map((element: SpVoteCardProps, index: number) => (
                  <div>
                    <SpVoteCard
                      key={index.toString()}
                      className='game__vote_cards-front-item'
                      score={element.score}
                      units={element.units}
                      onClick={onClick}
                      size='large'
                    />
                  </div>
                ))}
              </div>
            </div>
            {isTimeOut ? (
              <div className='game__statistics'>
                <h3 className='game__statistics_title'>Statistics</h3>
                <div className='game__statistics_statistic-field'>
                  {statisticsCards?.map((element: StatisticsCardsProps, index: number) => (
                    <div>
                      <SpCardFront
                        key={index.toString()}
                        className='game__statistics_cards-front-item'
                        score={element.score}
                        units={element.units}
                        onClick={onClick}
                        size='small'
                      />
                      <div className='game__statistics_percent'>{element.percent}</div>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
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
                {gameScore?.map((element: GameScoreProps, index: number) => (
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

      {isCreateIssue ? (
        <CreateIssueModal isActive={isCreateIssue} setActive={setCreateIssue} onSubmit={onSubmit} />
      ) : null}
    </div>
  );
};

export default Game;
