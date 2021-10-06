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
import { IGameResult, IIssue, IState, ITimer, IUser } from '../../redux/models';
import PriorityLevel from '../../types/PriorityLevel';
import changeCurrentIssue from '../../api/changeCurrentIssue';
import SpCardFront from '../../components/SpCardFront/SpCardFront';
import countVotes from '../../utils/countVotes';
import { addGameResult, updateGameResult, updateGameResults } from '../../redux/actions/gameResultsActions';
import useGame from '../../hooks/useGame';
import { updateUsers } from '../../redux/actions/usersActions';
import Color from '../../types/Color';
import leaveRoom from '../../api/leaveRoom';
import useDidUpdateEffect from '../../hooks/useDidUpdateEffect';
import { updateVotes } from '../../redux/actions/votesActions';
import { updateTimer } from '../../redux/actions/settingsActions';
import Chat from '../../components/Chat/Chat';

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
  const votes = useSelector((state: IState) => state.votes);
  const statistics = useSelector((state: IState) => state.gameResults);

  const [isChatOpen, setChatOpen] = useState(false);

  const [currentIssue, setCurrentIssue] = useState((): IIssue => issues[0]);
  const [isRoundStarted, setRoundStarted] = useState(false);
  const [isRoundEnded, setRoundEnded] = useState(false);

  const [minutes, setMinutes] = useState(() => settings.timer?.minutes);
  const [seconds, setSeconds] = useState(() => settings.timer?.seconds);

  const [isCardsFlipped, setCardsFlipped] = useState(() => true);
  const [chosenCardIndex, setChosenCardIndex] = useState((): number | null => null);

  const [newConnectedUser, setNewConnectedUser] = useState<IUser | null>(null);

  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [selectedIssue, setSelectedIssue] = useState<IIssue | null>(null);

  const [isActiveAddNewUserModal, setActiveAddNewUserModal] = useState(false);
  const [isActiveDeleteUserModal, setActiveStatusDeleteUserModal] = useState(false);

  const [isActiveCreateIssueModal, setActiveStatusCreateIssueModal] = useState(false);
  const [isActiveEditIssueModal, setActiveStatusEditIssueModal] = useState(false);
  const [isActiveDeleteIssueModal, setActiveStatusDeleteIssueModal] = useState(false);

  const [isActiveExitModal, setActiveStatusExitModal] = useState(false);
  const [isActiveFinishModal, setActiveStatusFinishModal] = useState(false);

  useGame();

  const isIssueExistsInStatistics = (item: IIssue): boolean => {
    return !!statistics.find(({ issue }) => issue.id === item.id);
  };

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

    socket.on('users', (users: IUser[], user: IUser | null) => {
      if (settings.addNewPlayersAutomatically) {
        dispatch(updateUsers(users));
      }

      if (currentUserData.role === 'admin') {
        if (user) {
          // user может прийти в значении null, если обновление происходит после удаления пользователя
          socket.emit('game:sendState', user.id, {
            result: statistics,
            currentIssue,
            isRoundStarted,
            isRoundEnded,
          });
        }
      }
    });

    socket.on('admitUser', (newUser: IUser) => {
      if (isMaster) {
        setNewConnectedUser(newUser);
        setActiveAddNewUserModal(true);
      }
    });

    socket.on('currentIssue', (issue: IIssue) => {
      setCurrentIssue(issue);
      setRoundStarted(false);
      setRoundEnded(false);
      dispatch(updateVotes([]));
      if (settings.timer) {
        setMinutes(settings.timer?.minutes);
        setSeconds(settings.timer?.seconds);
      }
    });

    socket.on('timer', (newTimer: ITimer) => {
      if (!isMaster) {
        setMinutes(newTimer.minutes);
        setSeconds(newTimer.seconds);
        dispatch(updateTimer(newTimer));
      }
    });

    socket.on('startRound', () => {
      if (!isRoundStarted) {
        // ? можно убрать
        setRoundStarted(true);
        setCardsFlipped(false);
        if (isRoundEnded && settings.timer) {
          setMinutes(settings.timer?.minutes);
          setSeconds(settings.timer?.seconds);
        }
      }
    });

    socket.on('endRound', () => {
      if (!isRoundEnded) {
        // ? можно убрать
        setRoundStarted(false);
        setRoundEnded(true);
      }
    });

    return () => {
      socket.offAny();
    };
  }, []);

  const getPlayers = (): IUser[] => {
    return members.filter(member => !member.isObserver);
  };

  const getScore = (players: IUser[]): string[] => {
    return players.map(player => votes.find(({ member }) => member.id === player.id)?.score || '');
  };

  useDidUpdateEffect(() => {
    const players = getPlayers();
    if (settings.cardsFlipAutomatically && votes.length === players.length) {
      setRoundEnded(true);
      setRoundStarted(false);
    }
  }, [votes]);

  // count votes and save statistics
  useDidUpdateEffect(() => {
    if (isRoundEnded) {
      setCardsFlipped(true);
      setChosenCardIndex(null);
      const players = getPlayers();
      const score = getScore(players);
      const votesForCurrentIssue = countVotes(score);
      if (isIssueExistsInStatistics(currentIssue)) {
        dispatch(updateGameResult({ issue: currentIssue, votesPercentage: votesForCurrentIssue }));
      } else {
        dispatch(addGameResult({ issue: currentIssue, votesPercentage: votesForCurrentIssue }));
      }
    }
  }, [isRoundEnded]);

  // Game controls
  const onClickExitBtn = () => {
    setActiveStatusExitModal(true);
  };
  const onExitModalConfirm = () => {
    if (roomId && currentUserData && currentUserData.id) {
      leaveRoom(socket, currentUserData.id, roomId);
      setActiveStatusExitModal(false);
    }
  };
  const onExitModalDecline = () => {
    setActiveStatusExitModal(false);
  };

  const onClickFinishGameBtn = () => {
    setActiveStatusFinishModal(true);
  };

  const onFinishGameModalDecline = () => {
    setActiveStatusFinishModal(false);
  };

  const onFinishGameModalConfirm = () => {
    socket.emit('game:finish');
    setActiveStatusFinishModal(false);
  };

  const onClickStartBtn = () => {
    if (isMaster) {
      // isRoundStarted && isRoundEnded - не бывает
      // isRoundStarted && !isRoundEnded - идет игра (стоп)
      // !isRoundStarted && isRoundEnded - после конца игры (рестарт)
      // !isRoundStarted && !isRoundEnded - самый первый вход в игру (первый раз открыл страницу)
      if (isRoundStarted && !isRoundEnded) {
        socket.emit('game:endRound');
      } else {
        socket.emit('game:startRound', minutes, seconds);
      }
    }
  };

  const onClickNextIssueBtn = () => {
    if (!isRoundStarted) {
      const nextIssueIndex = issues.findIndex(issue => issue.id === currentIssue.id) + 1;
      const correctNewIssueIndex = nextIssueIndex < issues.length ? nextIssueIndex : 0;
      changeCurrentIssue(socket, issues[correctNewIssueIndex]);
      setRoundStarted(false);
      setRoundEnded(false);
    }
  };

  const getControlRoundBtnText = (): string => {
    if (isRoundStarted && !isRoundEnded) return 'Stop round';
    if (!isRoundStarted && isRoundEnded) return 'Restart round';
    return 'Run round';
  };

  // Select issue
  const onClickIssue = (chosenIssue: IIssue) => {
    if (isMaster) {
      if (isRoundStarted && !isRoundEnded) return;
      if (currentIssue.id === chosenIssue.id) return;
      changeCurrentIssue(socket, chosenIssue);
    }
  };

  const getIssueColorByStatus = (issue: IIssue): Color | undefined => {
    if (currentIssue.id === issue.id) return 'primary';
    if (isIssueExistsInStatistics(issue)) return 'dark';
    return undefined;
  };

  // Add issue card
  const createIssueAction = () => {
    setActiveStatusCreateIssueModal(true);
  };
  const onCreateIssueModalConfirm = (name: string, priority: PriorityLevel) => {
    const id = issues.length > 0 ? issues[issues.length - 1].id + 1 : 1;
    const newIssue = { id, name, priority };
    socket.emit('issue:add', newIssue);
    setActiveStatusCreateIssueModal(false);
  };

  // Crud for issue card
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
    setSelectedIssue(null);
    setActiveStatusDeleteIssueModal(false);
  };
  const onIssueDeleteModalConfirm = () => {
    if (selectedIssue) {
      socket.emit('issue:delete', selectedIssue);
      setSelectedIssue(null);
      setActiveStatusDeleteIssueModal(false);
    }
  };

  // Add new user after connection request
  const onAddNewUserConfirm = () => {
    if (newConnectedUser) {
      socket.emit('user:admit', newConnectedUser);
      socket.emit('game:sendState', newConnectedUser.id, {
        result: statistics,
        currentIssue,
        isRoundStarted,
        isRoundEnded,
      });
      setNewConnectedUser(null);
      setActiveAddNewUserModal(false);
    }
  };
  const onAddNewUserDecline = () => {
    socket.emit('user:reject', newConnectedUser);
    setNewConnectedUser(null);
    setActiveAddNewUserModal(false);
  };

  // Crud for user
  const deleteUserAction = (user: IUser) => {
    setSelectedUser(user);
    setActiveStatusDeleteUserModal(true);
  };
  const onUserDeleteModalConfirm = () => {
    if (selectedUser && roomId) {
      leaveRoom(socket, selectedUser.id, roomId);
      setSelectedUser(null);
      setActiveStatusDeleteUserModal(false);
    }
  };
  const onUserDeleteModalDecline = () => {
    setSelectedUser(null);
    setActiveStatusDeleteUserModal(false);
  };

  // Vote
  const onChooseCard = (index: number, value: string) => {
    if (isRoundStarted && !isRoundEnded) {
      setChosenCardIndex(index);
      socket.emit('game:vote', currentUser, value);
    }
  };

  // Score table props
  const getScoreTableValue = (player: IUser) => {
    if (isRoundStarted) return 'In progress';
    const value = votes.find(({ member }) => member.id === player.id)?.score;
    return value ? `${value} ${settings.scoreType}` : 'Unknown';
  };

  const getUserCardColor = (user: IUser): Color | undefined => {
    if (user.id === currentUser?.id) return 'primary';
    return user.isObserver ? 'light' : 'warning';
  };

  const checkCurrentUserIsObserver = (): boolean => {
    return currentUser?.isObserver || (isMaster && settings.isAdminObserver);
  };

  return (
    <div className='game'>
      <Header isAuthorized isChatOpen={isChatOpen} setChatOpen={setChatOpen} />
      <div className='game__wrapper'>
        <div className='game__container'>
          <h2 className='game__title'>{gameTitle || 'Game'}</h2>
          <div className={isChatOpen ? 'game__content game__content--double' : 'game__content'}>
            <div className='game__main-content'>
              <div className='game__data'>
                <div className='game__info'>
                  <div className='game__master'>
                    <h3 className='game__section-title'>Scram master:</h3>
                    <UserCard
                      name={master?.firstName}
                      surname={master?.lastName}
                      jobPosition={master?.position}
                      avatar={master?.avatar}
                      color={isMaster ? 'primary' : undefined}
                      className='game__master-card'
                    />
                  </div>
                  {settings.timer ? (
                    <div className='game__timer'>
                      <Timer
                        id='timer'
                        minutes={minutes}
                        seconds={seconds}
                        setMinutes={setMinutes}
                        setSeconds={setSeconds}
                        isGameOn={isRoundStarted}
                        setGameOn={setRoundStarted}
                        setTimeOut={setRoundEnded}
                        className='game__timer-clock'
                        disabled={!isMaster}
                      />
                    </div>
                  ) : null}
                </div>
                <div className='game__controls'>
                  {isMaster ? (
                    <>
                      <Button
                        color='light'
                        size='large'
                        className='scram-master__finish-btn'
                        onClick={onClickFinishGameBtn}
                      >
                        Finish game
                      </Button>
                      <Button
                        color='success'
                        size='large'
                        onClick={onClickStartBtn}
                        disabled={!settings.canChangeChoice && isIssueExistsInStatistics(currentIssue)}
                      >
                        {getControlRoundBtnText()}
                      </Button>
                      <Button
                        color='dark'
                        size='large'
                        onClick={onClickNextIssueBtn}
                        disabled={isRoundStarted && !isRoundEnded}
                      >
                        Next issue
                      </Button>
                    </>
                  ) : null}
                  <Button color='danger' size='large' className='scram-master__exit-btn' onClick={onClickExitBtn}>
                    Exit
                  </Button>
                </div>
              </div>
              <div className='game__issues'>
                <h3 className='game__section-title'>Issues</h3>
                <div className='game__issues-container'>
                  {issues.map(item => (
                    <IssueCard
                      id={item.id.toString()}
                      key={item.id}
                      name={item.name}
                      priority={item.priority}
                      deleteAction={isMaster ? () => deleteIssueAction(item) : undefined}
                      editAction={isMaster ? () => editIssueAction(item) : undefined}
                      className='game__issue'
                      color={getIssueColorByStatus(item)}
                      onClick={() => onClickIssue(item)}
                    />
                  ))}
                  {isMaster ? (
                    <IssueCreationCard
                      label='Create issue'
                      addAction={createIssueAction}
                      className='game__create-issue'
                    />
                  ) : null}
                </div>
              </div>

              {!checkCurrentUserIsObserver() ? (
                <div className='game__vote'>
                  <h3 className='game__section-title'>Vote</h3>
                  <div className='game__vote-container'>
                    {settings.cardValues.map((value, index) => (
                      <div key={index.toString()}>
                        <SpVoteCard
                          className='game__vote-card'
                          score={value}
                          units={settings.scoreType}
                          isFlipped={isCardsFlipped}
                          isSelected={chosenCardIndex === index}
                          onClick={() => onChooseCard(index, value)}
                          size='large'
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

              <div className='game__statistics'>
                <h3 className='game__section-title'>Statistics</h3>
                <div className='game__statistics-container'>
                  {isIssueExistsInStatistics(currentIssue) ? (
                    statistics
                      .find(({ issue }) => issue.id === currentIssue.id)
                      ?.votesPercentage.map((element, index) => (
                        <div key={index.toString()} className='game__statistics-block'>
                          <SpCardFront
                            className='game__statistics_card'
                            score={element.value}
                            units={settings.scoreType}
                            size='small'
                          />
                          <div className='game__statistics-percent'>{element.percentage}%</div>
                        </div>
                      ))
                  ) : (
                    <p className='game__empty-text'>No results yet</p>
                  )}
                </div>
              </div>

              <div className='game__score'>
                <h3 className='game__section-title'>Score table</h3>

                <table className='game__table'>
                  <thead className='game__thead'>
                    <tr className='game__tr'>
                      <th className='game__th'>Score</th>
                      <th className='game__th'>Players</th>
                    </tr>
                  </thead>
                  <tbody className='game__tbody'>
                    {members
                      .sort(member => (member.isObserver ? 1 : -1))
                      .map(user => (
                        <tr key={user.id} className='game__tr'>
                          <td data-label='Score' className='game__td game__td-score'>
                            {user.isObserver ? `---` : getScoreTableValue(user)}
                          </td>
                          <td data-label='Player' className='game__td'>
                            <UserCard
                              name={user.firstName}
                              surname={user.lastName}
                              jobPosition={user.position}
                              avatar={user.avatar}
                              color={getUserCardColor(user)}
                              deleteAction={isMaster ? () => deleteUserAction(user) : undefined}
                              className='game__user-card'
                            />
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
            {isChatOpen ? (
              <div className='game__chat-content'>
                <Chat className='game__chat' />
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <Footer />

      <ConfirmModal
        isActive={isActiveExitModal}
        setActive={setActiveStatusExitModal}
        onDecline={onExitModalDecline}
        onConfirm={onExitModalConfirm}
      >
        <div>
          <p>Are you sure you want to exit the game?</p>
          {isMaster ? <p>(because of you are a master, other users will also leave the game)</p> : null}
        </div>
      </ConfirmModal>

      <ConfirmModal
        isActive={isActiveFinishModal}
        setActive={setActiveStatusFinishModal}
        onDecline={onFinishGameModalDecline}
        onConfirm={onFinishGameModalConfirm}
      >
        <p>Are you sure you want to finish the game and go to result page?</p>
      </ConfirmModal>

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
        {`${newConnectedUser?.firstName} ${newConnectedUser?.lastName} wants to join the game`}
      </ConfirmModal>
    </div>
  );
};

export default Game;
