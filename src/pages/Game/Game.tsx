/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Game.scss';

import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import UserCard from '../../components/UserCard/UserCard';
import Button from '../../components/Button/Button';
import ConfirmModal from '../../components/ConfirmModal/ConfirmModal';
import Timer from '../../components/Timer/Timer';
import IssueCard from '../../components/IssueCard/IssueCard';
import IssueCreationCard from '../../components/IssueCreationCard/IssueCreationCard';
import CreateIssueModal from '../../components/CreateIssueModal/CreateIssueModal';
import SpVoteCard from '../../components/SpVoteCard/SpVoteCard';
import { IIssue, IState, IUser } from '../../redux/models';
import { addIssue, removeIssue, updateIssue, updateIssues } from '../../redux/actions/issuesActions';
import PriorityLevel from '../../types/PriorityLevel';
import changeCurrentIssue from '../../api/changeCurrentIssue';
import SpCardFront from '../../components/SpCardFront/SpCardFront';
import { IStatistics } from './models';
import countVotes from '../../utils/countVotes';

const Game: React.FC = () => {
  const dispatch = useDispatch();

  const socket = useSelector((state: IState) => state.socket);
  const settings = useSelector((state: IState) => state.settings);
  const gameTitle = useSelector((state: IState) => state.room.name);
  const roomId = useSelector((state: IState) => state.room.id);
  const master = useSelector((state: IState) => state.room.admin);
  const members = useSelector((state: IState) => state.users);
  const currentUserData = useSelector((state: IState) => state.currentUser);
  const currentUser = members.find(user => user.id === currentUserData.id);
  const isMaster = currentUserData.role === 'admin';
  const issues = useSelector((state: IState) => state.issues);

  const [isRoundEnded, setRoundEnded] = useState(false);
  const [isRoundStarted, setRoundStarted] = useState(false);
  const [minutes, setMinutes] = useState(() => settings.timer?.minutes);
  const [seconds, setSeconds] = useState(() => settings.timer?.seconds);

  const [currentIssue, setCurrentIssue] = useState((): IIssue => issues[0]);
  const [isCardsFlipped, setCardsFlipped] = useState(() => false);
  const [chosenCardIndex, setChosenCardIndex] = useState((): number | null => null);
  const [votes, setVote] = useState(() => members.map(member => ({ member, score: '' })));
  const [statisticsForCurrentIssue, setStatistics] = useState((): IStatistics[] | null => null);

  // CRUD operation: Exit, Users, Issues ----------------------------
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [selectedIssue, setSelectedIssue] = useState<IIssue | null>(null);

  const [isActiveStopConfirmModal, setActiveStatusStopConfirmModal] = useState<boolean>(false);

  const [isActiveDeleteUserModal, setActiveStatusDeleteUserModal] = useState(false);

  const [isActiveCreateIssueModal, setActiveStatusCreateIssueModal] = useState(false);
  const [isActiveEditIssueModal, setActiveStatusEditIssueModal] = useState(false);
  const [isActiveDeleteIssueModal, setActiveStatusDeleteIssueModal] = useState(false);

  useEffect(() => {
    socket.on('issues', (newIssues: IIssue[]) => {
      dispatch(updateIssues(newIssues));
    });

    socket.on('startRound', () => {
      if (!isRoundStarted && !isRoundEnded) {
        setRoundStarted(true);
        console.log('start round!');
      }
    });

    socket.on('endRound', () => {
      setRoundStarted(false);
      setRoundEnded(true);
      console.log('stop round!');
    });

    socket.on('newVote', (newVote: { member: IUser; score: string }) => {
      setVote([...votes, newVote]);
    });

    socket.on('currentIssue', (issue: IIssue) => {
      console.log('change issue', issue);
      setCurrentIssue(issue);
    });

    return () => {
      socket.offAny();
    };
  }, []);

  // stop game when everybody have voted
  useEffect(() => {
    const players = members.filter(member => !member.isObserver);
    if (settings.cardsFlipAutomatically && votes.length === players.length) {
      setRoundEnded(true);
    }
  }, [votes]);

  // count votes and save statistics
  useEffect(() => {
    if (isRoundEnded) {
      const votesForCurrentIssue = countVotes(votes.map(({ score }) => score));
      console.log(votesForCurrentIssue, 'from useEffect for round end');
      setStatistics(votesForCurrentIssue);
      setCardsFlipped(true);
      // add dispatch for game results ()
    }
  }, [isRoundEnded]);

  // CRUD operation: Exit, Users, Issues ----------------------------
  const onStopGameClick = () => {
    setActiveStatusStopConfirmModal(true);
  };
  const onStopModalConfirm = () => {
    // leaveRoom(socket, master.id, roomId);
    setActiveStatusStopConfirmModal(false);
  };
  const onStopModalDecline = () => {
    setActiveStatusStopConfirmModal(false);
  };

  const onUserDeleteModalConfirm = () => {
    if (selectedUser && roomId) {
      // leaveRoom(socket, selectedUser.id, roomId);
      setSelectedUser(null);
      setActiveStatusDeleteUserModal(false);
    }
  };
  const onUserDeleteModalDecline = () => {
    setActiveStatusDeleteUserModal(false);
  };
  const deleteUserAction = (user: IUser) => {
    setSelectedUser(user);
    setActiveStatusDeleteUserModal(true);
  };

  const addIssueAction = () => {
    setActiveStatusCreateIssueModal(true);
  };
  const onCreateIssueModalConfirm = (name: string, priority: PriorityLevel) => {
    const id = issues.length > 0 ? issues[issues.length - 1].id + 1 : 1;
    const newIssue = { id, name, priority };
    dispatch(addIssue(newIssue));
    // socket.emit('issue:add', newIssue);
    setActiveStatusCreateIssueModal(false);
  };
  const editIssueAction = (issue: IIssue) => {
    setSelectedIssue(issue);
    setActiveStatusEditIssueModal(true);
  };
  const onEditIssueModalConfirm = (name: string, priority: PriorityLevel) => {
    if (selectedIssue) {
      dispatch(updateIssue({ id: selectedIssue.id, name, priority }));
      // socket.emit('issue:update', { id: selectedIssue.id, name, priority });
      setSelectedIssue(null);
      setActiveStatusEditIssueModal(false);
    }
  };
  const deleteIssueAction = (issue: IIssue) => {
    setSelectedIssue(issue);
    setActiveStatusDeleteIssueModal(true);
  };
  const onIssueDeleteModalDecline = () => {
    setActiveStatusDeleteIssueModal(false);
  };
  const onIssueDeleteModalConfirm = () => {
    if (selectedIssue) {
      dispatch(removeIssue(selectedIssue.id));
      // socket.emit('issue:delete', selectedIssue);
      setSelectedIssue(null);
      setActiveStatusDeleteIssueModal(false);
    }
  };
  // ----------------------------------------------------------------

  const onChangeCurrentIssue = (issue: IIssue) => {
    // console.log('change issue', issue);
    changeCurrentIssue(socket, issue);
  };

  const onNextIssue = () => {
    const nextIssueIndex = issues.findIndex(issue => issue.id === currentIssue.id) + 1;
    console.log('change issue', issues[nextIssueIndex]);
    changeCurrentIssue(socket, issues[nextIssueIndex]);
  };

  const onChooseCard = (index: number, value: string) => {
    setChosenCardIndex(index);
    socket.emit('game:vote', currentUser, value);
  };

  const onStartRound = () => {
    if (!isRoundStarted) {
      socket.emit('game:startRound');
      console.log('start round click');
    } else if (isRoundStarted && !isRoundEnded) {
      socket.emit('game:endRound');
      console.log('stop round click');
    }
  };

  return (
    <div className='game'>
      <Header isAuthorized />
      <div className='game__wrapper'>
        <h2 className='game__title'>
          <div className='game__title-content'>{gameTitle || 'Game'}</div>
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
                  color={isMaster ? 'primary' : undefined}
                  className='scram-master__card'
                />
              </div>
              <div className='scram-master__card-master-btn'>
                <Button color='danger' size='large' className='scram-master__exit-btn' onClick={onStopGameClick}>
                  {isMaster ? 'Stop game' : 'Exit'}
                </Button>
              </div>
              {settings.timer ? (
                <div className='scram-master__timer'>
                  <Timer
                    id='timer'
                    minutes={minutes}
                    seconds={seconds}
                    setMinutes={setMinutes}
                    setSeconds={setSeconds}
                    isGameOn={isRoundStarted}
                    setGameOn={setRoundStarted}
                    setTimeOut={setRoundEnded}
                    className='game__settings_timer'
                    disabled={!master}
                  />
                </div>
              ) : (
                [isRoundStarted ? <h3 className='game__issues-title'>Round started!</h3> : null]
              )}
              {isMaster ? (
                <div className='scram-master__timer-btn'>
                  <Button color='dark' size='large' onClick={onStartRound}>
                    {!isRoundStarted && !isRoundEnded
                      ? 'Run round'
                      : [isRoundStarted && !isRoundEnded ? 'Stop round' : 'Restart round']}
                  </Button>
                  {!isRoundEnded && issues.findIndex(issue => issue.id === currentIssue.id) !== issues.length - 1 ? (
                    <Button color='dark' size='large' onClick={onNextIssue}>
                      Next issue
                    </Button>
                  ) : null}
                </div>
              ) : null}
            </div>
            <div className='game__issues'>
              <h3 className='game__issues-title'>Issues</h3>
              <div className='game__issues-field'>
                {issues.map(issue => (
                  <IssueCard
                    id={issue.id.toString()}
                    key={issue.id}
                    name={issue.name}
                    priority={issue.priority}
                    deleteAction={isMaster ? () => deleteIssueAction(issue) : undefined}
                    editAction={isMaster ? () => editIssueAction(issue) : undefined}
                    className='game__issue'
                    color={currentIssue.id === issue.id ? 'primary' : undefined}
                    onClick={
                      currentIssue.id !== issue.id && isMaster && !isRoundStarted
                        ? () => onChangeCurrentIssue(issue)
                        : undefined
                    }
                  />
                ))}
                {isMaster ? (
                  <IssueCreationCard label='Create issue' addAction={addIssueAction} className='game__create-issue' />
                ) : null}
              </div>
            </div>
            {currentUser?.isObserver ? null : (
              <div className='game__vote'>
                <div>
                  <h3 className='game__vote-title'>Vote</h3>
                  {/* {!settings.cardsFlipAutomatically && isRoundStarted && !isRoundEnded ? (
                    <Button color='dark' size='large' onClick={() => setCardsFlipped(true)}>
                      Flip cards
                    </Button>
                  ) : null} */}
                </div>
                <div className='game__vote-field'>
                  {settings.cardValues.map((value, index) => (
                    <div key={index.toString()}>
                      <SpVoteCard
                        className='game__vote-front'
                        score={value}
                        units={settings.scoreType}
                        isFlipped={isCardsFlipped}
                        isSelected={chosenCardIndex === index}
                        onClick={!isRoundEnded && isRoundStarted ? () => onChooseCard(index, value) : undefined}
                        size='large'
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
            {isRoundEnded ? (
              <div className='game__statistics'>
                <h3 className='game__statistics-title'>Statistics</h3>
                <div className='game__statistics-field'>
                  {statisticsForCurrentIssue?.map((element, index) => (
                    <div key={index.toString()}>
                      <SpCardFront
                        className='game__statistics_cards-front-item'
                        score={element.value}
                        units={settings.scoreType}
                        size='small'
                      />
                      <div className='game__statistics-percent'>{element.percentage}</div>
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
                  <th>Players</th>
                </tr>
              </thead>
              <tbody>
                {votes
                  .sort(({ member }) => (member.isObserver ? 1 : -1))
                  .map(element => (
                    <tr key={element.member.id} className='game__score-tr'>
                      <td data-label='Score' className='game__table-score'>
                        {element.member.isObserver ? `---` : [isRoundEnded ? element.score : 'In progress']}
                      </td>
                      <td data-label='Player' className='game__table-card'>
                        <UserCard
                          name={element.member.firstName}
                          surname={element.member.lastName}
                          jobPosition={element.member.position}
                          avatar={element.member.avatar}
                          color={element.member.isObserver ? undefined : 'warning'}
                          deleteAction={isMaster ? () => deleteUserAction(element.member) : undefined}
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

      <ConfirmModal
        isActive={isActiveStopConfirmModal}
        setActive={setActiveStatusStopConfirmModal}
        onDecline={onStopModalDecline}
        onConfirm={onStopModalConfirm}
      >
        {isMaster ? <p>Are you sure you want to stop the game?</p> : <p>Are you sure you want to exit the game?</p>}
      </ConfirmModal>

      {isMaster ? (
        <>
          <ConfirmModal
            isActive={isActiveDeleteUserModal}
            setActive={setActiveStatusDeleteUserModal}
            onDecline={onUserDeleteModalDecline}
            onConfirm={onUserDeleteModalConfirm}
          >
            {`Remove ${selectedUser?.firstName} ${selectedUser?.lastName} from the game?`}
          </ConfirmModal>

          <CreateIssueModal
            isActive={isActiveCreateIssueModal}
            setActive={setActiveStatusCreateIssueModal}
            onSubmit={onCreateIssueModalConfirm}
          />

          <CreateIssueModal
            isActive={isActiveEditIssueModal}
            setActive={setActiveStatusEditIssueModal}
            onSubmit={onEditIssueModalConfirm}
          />

          <ConfirmModal
            isActive={isActiveDeleteIssueModal}
            setActive={setActiveStatusDeleteIssueModal}
            onDecline={onIssueDeleteModalDecline}
            onConfirm={onIssueDeleteModalConfirm}
          >
            {`Remove issue "${selectedIssue?.name}" from the game?`}
          </ConfirmModal>
        </>
      ) : null}
    </div>
  );
};

export default Game;
