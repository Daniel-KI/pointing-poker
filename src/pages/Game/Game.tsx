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
import { IGameResult, IIssue, IState, IUser } from '../../redux/models';
import PriorityLevel from '../../types/PriorityLevel';
import changeCurrentIssue from '../../api/changeCurrentIssue';
import SpCardFront from '../../components/SpCardFront/SpCardFront';
import countVotes from '../../utils/countVotes';
import { addGameResult, updateGameResults } from '../../redux/actions/gameResultsActions';
import useGame from '../../hooks/useGame';
import { updateUsers } from '../../redux/actions/usersActions';
import Color from '../../types/Color';
import leaveRoom from '../../api/leaveRoom';
import useDidUpdateEffect from '../../hooks/useDidUpdateEffect';

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
  const results = useSelector((state: IState) => state.gameResults);
  const votes = useSelector((state: IState) => state.votes);
  const statistics = useSelector((state: IState) => state.gameResults);

  const [currentIssue, setCurrentIssue] = useState((): IIssue => issues[0]);
  const [isRoundStarted, setRoundStarted] = useState(false);
  const [isRoundEnded, setRoundEnded] = useState(false);
  const [minutes, setMinutes] = useState(() => settings.timer?.minutes);
  const [seconds, setSeconds] = useState(() => settings.timer?.seconds);

  // const [isVisibleIssueTooltip, setVisibilityIssueTooltip] = useState(() => false);
  const [isCardsFlipped, setCardsFlipped] = useState(() => false);
  const [chosenCardIndex, setChosenCardIndex] = useState((): number | null => null);
  // const [statisticsForCurrentIssue, setStatistics] = useState((): IStatistics[] | null => null);

  // CRUD operation: Exit, Users, Issues ----------------------------
  const [newUser, setNewUser] = useState<IUser | null>(null);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [selectedIssue, setSelectedIssue] = useState<IIssue | null>(null);

  const [isActiveAddNewUserModal, setActiveAddNewUserModal] = useState(false);

  const [isActiveStopConfirmModal, setActiveStatusStopConfirmModal] = useState(false);

  const [isActiveDeleteUserModal, setActiveStatusDeleteUserModal] = useState(false);

  const [isActiveCreateIssueModal, setActiveStatusCreateIssueModal] = useState(false);
  const [isActiveEditIssueModal, setActiveStatusEditIssueModal] = useState(false);
  const [isActiveDeleteIssueModal, setActiveStatusDeleteIssueModal] = useState(false);

  useGame();

  useEffect(() => {
    socket.on(
      'getGameState',
      (state: { result: IGameResult[]; currentIssue: IIssue; isRoundStarted: boolean; isRoundEnded: boolean }) => {
        dispatch(updateGameResults(state.result));
        setCurrentIssue(state.currentIssue);
        setRoundStarted(state.isRoundStarted);
        setRoundEnded(state.isRoundEnded);
      },
    );

    socket.on('users', (users: IUser[], user: IUser) => {
      if (currentUserData.role === 'admin' && !settings.addNewPlayersAutomatically) {
        setNewUser(user);
        setActiveAddNewUserModal(true);
      } else if (settings.addNewPlayersAutomatically) {
        dispatch(updateUsers(users));
      }
      if (currentUserData.role === 'admin') {
        socket.emit('game:sendState', user.id, { result: statistics, currentIssue, isRoundStarted, isRoundEnded });
      }
    });

    socket.on('currentIssue', (issue: IIssue) => {
      setCurrentIssue(issue);
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

    return () => {
      socket.offAny();
    };
  }, []);

  // stop game when everybody have voted
  useDidUpdateEffect(() => {
    const players = members.filter(member => !member.isObserver);
    if (settings.cardsFlipAutomatically && votes.length === players.length) {
      console.log('use effect for votes');
      setRoundEnded(true);
      setRoundStarted(false);
    }
  }, [votes]);

  // count votes and save statistics
  useDidUpdateEffect(() => {
    if (isRoundEnded) {
      const score = members
        .filter(member => !member.isObserver)
        .map(player => votes.find(({ member }) => member.id === player.id)?.score || '');
      const votesForCurrentIssue = countVotes(score);
      setCardsFlipped(true);
      if (!statistics.find(({ issue }) => issue.id === currentIssue.id)) {
        console.log('add new result');
        dispatch(addGameResult({ issue: currentIssue, votesPercentage: votesForCurrentIssue }));
      }
      console.log(votes, 'from game end');
    }
  }, [isRoundEnded]);

  useEffect(() => {
    if (statistics.find(({ issue }) => issue.id === currentIssue.id)) {
      console.log('use effect for current issue');
      setRoundEnded(true);
    }
  }, [currentIssue]);

  const onAddNewUserConfirm = () => {
    setActiveAddNewUserModal(false);
  };
  const onAddNewUserDecline = () => {
    setActiveAddNewUserModal(false);
  };

  // CRUD operation: Exit, Users, Issues ----------------------------
  const onStopGameClick = () => {
    setActiveStatusStopConfirmModal(true);
  };
  const onStopModalConfirm = () => {
    if (master && roomId) {
      leaveRoom(socket, master?.id, roomId);
    }
    setActiveStatusStopConfirmModal(false);
  };
  const onStopModalDecline = () => {
    setActiveStatusStopConfirmModal(false);
  };

  const onUserDeleteModalConfirm = () => {
    if (selectedUser && roomId) {
      leaveRoom(socket, selectedUser.id, roomId);
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
    socket.emit('issue:add', newIssue);
    setActiveStatusCreateIssueModal(false);
  };
  const editIssueAction = (issue: IIssue) => {
    setSelectedIssue(issue);
    setActiveStatusEditIssueModal(true);
  };
  const onEditIssueModalConfirm = (name: string, priority: PriorityLevel) => {
    if (selectedIssue) {
      socket.emit('issue:update', { id: selectedIssue.id, name, priority });
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
      socket.emit('issue:delete', selectedIssue);
      setSelectedIssue(null);
      setActiveStatusDeleteIssueModal(false);
    }
  };
  // ----------------------------------------------------------------

  const onChangeCurrentIssue = (chosenIssue: IIssue) => {
    console.log('change issue', chosenIssue);
    changeCurrentIssue(socket, chosenIssue);
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
                {issues.map(item => {
                  let color: Color | undefined;
                  if (currentIssue.id === item.id) {
                    color = 'primary';
                  } else if (results.find(({ issue }) => issue.id === item.id)) {
                    color = 'dark';
                  }
                  return (
                    <IssueCard
                      id={item.id.toString()}
                      key={item.id}
                      name={item.name}
                      priority={item.priority}
                      deleteAction={isMaster ? () => deleteIssueAction(item) : undefined}
                      editAction={isMaster ? () => editIssueAction(item) : undefined}
                      className='game__issue'
                      color={color}
                      onClick={
                        currentIssue.id !== item.id && isMaster && !isRoundStarted
                          ? () => onChangeCurrentIssue(item)
                          : undefined
                      }
                    />
                  );
                })}
                {isMaster ? (
                  <IssueCreationCard label='Create issue' addAction={addIssueAction} className='game__create-issue' />
                ) : null}
              </div>
            </div>
            {currentUser?.isObserver ? null : (
              <div className='game__vote'>
                <div>
                  <h3 className='game__vote-title'>Vote</h3>
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
                  {statistics
                    .find(({ issue }) => issue.id === currentIssue.id)
                    ?.votesPercentage.map((element, index) => (
                      <div key={index.toString()}>
                        <SpCardFront
                          className='game__statistics_cards-front-item'
                          score={element.value}
                          units={settings.scoreType}
                          size='small'
                        />
                        <div className='game__statistics-percent'>{element.percentage}%</div>
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
                {members
                  .sort(member => (member.isObserver ? 1 : -1))
                  .map(element => (
                    <tr key={element.id} className='game__score-tr'>
                      <td data-label='Score' className='game__table-score'>
                        {element.isObserver
                          ? `---`
                          : [
                              isRoundStarted
                                ? 'In progress'
                                : votes.find(({ member }) => member.id === element.id)?.score,
                            ]}
                      </td>
                      <td data-label='Player' className='game__table-card'>
                        <UserCard
                          name={element.firstName}
                          surname={element.lastName}
                          jobPosition={element.position}
                          avatar={element.avatar}
                          color={element.isObserver ? undefined : 'warning'}
                          deleteAction={isMaster ? () => deleteUserAction(element) : undefined}
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

          <ConfirmModal
            isActive={isActiveAddNewUserModal}
            setActive={setActiveAddNewUserModal}
            onDecline={onAddNewUserDecline}
            onConfirm={onAddNewUserConfirm}
          >
            {`${newUser?.firstName} ${newUser?.lastName} wants to join the game`}
          </ConfirmModal>
        </>
      ) : null}
    </div>
  );
};

export default Game;
