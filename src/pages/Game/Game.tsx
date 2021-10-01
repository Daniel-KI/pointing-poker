/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import { IState } from '../../redux/models';
import { addIssue, removeIssue } from '../../redux/actions/issuesActions';
import PriorityLevel from '../../types/PriorityLevel';
import UserType from '../../types/UserType';

const Game: React.FC<GameProps> = ({ gameScore, statisticsCards, voteCards }) => {
  const dispatch = useDispatch();

  const gameTitle = useSelector((state: IState) => state.room.name);
  const master = useSelector((state: IState) => state.room.admin);
  const members = useSelector((state: IState) => state.users);
  const currentUserData = useSelector((state: IState) => state.currentUser);
  const currentUser = members.find(user => user.id === currentUserData.id);
  const issues = useSelector((state: IState) => state.issues);
  // const currentIssueData = useSelector((state: IState) => state.currentIssue);
  // const currentIssue = issues.find(issue => issue.id === currentIssueData.id);

  const [isActiveExitModal, setExitModalActiveStatus] = useState<boolean>(false);
  const [isConfirm, setConfirm] = useState(false);
  const [isTimeOut, setTimeOut] = useState(false);
  const [isGameOn, setGameOn] = useState(true);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  const [isCreateIssueActive, setCreateIssueActive] = useState(false);
  const [isCurrentIssue, setIsCurrentIssue] = useState(false);

  const exitBtnOnClick = () => {
    setExitModalActiveStatus(true);
  };
  const deleteIssueAction = (id: number) => {
    dispatch(removeIssue(id));
  };
  const addIssueAction = () => {
    setCreateIssueActive(!isCreateIssueActive);
  };
  const onCreateIssueSubmit = (name: string, priority: PriorityLevel) => {
    const id = issues.length > 0 ? issues[issues.length - 1].id + 1 : 1;
    dispatch(addIssue({ id, name, priority }));
    setCreateIssueActive(false);
  };
  const onConfirm = () => {
    setConfirm(false);
    setExitModalActiveStatus(false);
  };
  const onDecline = () => {
    setConfirm(false);
    setExitModalActiveStatus(false);
  };
  const deleteAction = () => {
    setConfirm(!isConfirm);
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
          <div className='game__title-content'>{gameTitle || 'Game'}</div>
          {/* TODO: {master ? <DataControlPanel editAction={editAction} /> : null} */}
        </h2>
        <div className='scram-master'>
          <div className='scram-master__card-field-wrapper'>
            <div className='scram-master__card-field'>
              <div className='scram-master__card-master'>
                <h3 className='scram-master__section-title'>Scram master:</h3>
                <UserCard
                  name={master?.firstName}
                  surname={master?.lastName}
                  jobPosition={master?.position}
                  avatar={master?.avatar}
                  color={master ? 'primary' : undefined}
                  className='scram-master__card'
                />
              </div>
              <div className='scram-master__card-master-btn'>
                <Button color='danger' size='large' className='scram-master__exit-btn' onClick={exitBtnOnClick}>
                  {master ? 'Stop game' : 'Exit'}
                </Button>
              </div>
              <div className='scram-master__timer'>
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
                  disabled={!master}
                />
              </div>
              {master ? (
                <div className='scram-master__timer-btn'>
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
              <h3 className='game__issues-title'>Issues</h3>
              <div className='game__issues-field'>
                {issues?.map((element, index: number) => (
                  <IssueCard
                    id={element.id.toString()}
                    key={index.toString()}
                    name={element.name}
                    priority={element.priority}
                    deleteAction={master ? () => deleteIssueAction(element.id) : undefined}
                    className='game__issue'
                    color={isCurrentIssue ? 'primary' : undefined}
                  />
                ))}
                {master ? (
                  <IssueCreationCard label='Create issue' addAction={addIssueAction} className='game__create-issue' />
                ) : null}
              </div>
            </div>
            <div className='game__vote'>
              <h3 className='game__vote-title'>Vote</h3>
              <div className='game__vote-field'>
                {voteCards?.map((element: SpVoteCardProps, index: number) => (
                  <div>
                    <SpVoteCard
                      key={index.toString()}
                      className='game__vote-front'
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
                <h3 className='game__statistics-title'>Statistics</h3>
                <div className='game__statistics-field'>
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
                      <div className='game__statistics-percent'>{element.percent}</div>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
          <div className='game__score-wrapper'>
            <h3 className='game__score-title'>Score table</h3>
            <table>
              <thead>
                <tr>
                  <th className='game__score'>Score</th>
                  <th>Player</th>
                </tr>
              </thead>
              <tbody>
                {gameScore?.map((element: GameScoreProps, index: number) => (
                  <tr className='game__score-tr'>
                    <td data-label='Score' className='game__table-score'>
                      {isTimeOut ? element.score : 'In progress'}
                    </td>
                    <td data-label='Player' className='game__table-card'>
                      <UserCard
                        key={index.toString()}
                        name={element.player.name}
                        surname={element.player.surname}
                        jobPosition={element.player.jobPosition}
                        avatar={element.player.avatar}
                        deleteAction={deleteAction}
                        className='game__user-card'
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
          {master ? (
            <div>Remove Name Surname from lobby?</div>
          ) : (
            <div>
              <p>
                <b>Name Surname</b> want to remove <b>Name Surname</b>.
              </p>
              <br />
              <p>Do you agree with it?</p>
            </div>
          )}
        </ConfirmModal>
      ) : null}

      {isActiveExitModal ? (
        <ConfirmModal isActive={isActiveExitModal} setActive={setConfirm} onDecline={onDecline} onConfirm={onConfirm}>
          {master ? <p>Are you sure you want to stop the game?</p> : <p>Are you sure you want to exit the game?</p>}
        </ConfirmModal>
      ) : null}

      {isCreateIssueActive ? (
        <CreateIssueModal
          isActive={isCreateIssueActive}
          setActive={setCreateIssueActive}
          onSubmit={onCreateIssueSubmit}
        />
      ) : null}
    </div>
  );
};

export default Game;
