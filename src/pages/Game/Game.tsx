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
  const votes = useSelector((state: IState) => state.votes);
  const statistics = useSelector((state: IState) => state.gameResults);

  const [currentIssue, setCurrentIssue] = useState((): IIssue => issues[0]);
  const [isRoundStarted, setRoundStarted] = useState(false);
  const [isRoundEnded, setRoundEnded] = useState(false);

  const [minutes, setMinutes] = useState(() => settings.timer?.minutes);
  const [seconds, setSeconds] = useState(() => settings.timer?.seconds);

  const [isCardsFlipped, setCardsFlipped] = useState(() => false);
  const [chosenCardIndex, setChosenCardIndex] = useState((): number | null => null);

  const [newСonnectedUser, setNewСonnectedUser] = useState<IUser | null>(null);

  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [selectedIssue, setSelectedIssue] = useState<IIssue | null>(null);

  const [isActiveAddNewUserModal, setActiveAddNewUserModal] = useState(false);
  const [isActiveDeleteUserModal, setActiveStatusDeleteUserModal] = useState(false);

  const [isActiveCreateIssueModal, setActiveStatusCreateIssueModal] = useState(false);
  const [isActiveEditIssueModal, setActiveStatusEditIssueModal] = useState(false);
  const [isActiveDeleteIssueModal, setActiveStatusDeleteIssueModal] = useState(false);

  const [isActiveExitModal, setActiveStatusExitModal] = useState(false);
  const [isActiveFinishModal, setActiveStatusFinishModal] = useState(false);
  // TODO - для модалки окончания игры + сделать кнопку + перенаправление на страницу результатов + уведомить

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
      if (settings.addNewPlayersAutomatically) {
        dispatch(updateUsers(users));
      }

      if (currentUserData.role === 'admin') {
        if (settings.addNewPlayersAutomatically) {
          socket.emit('game:sendState', user.id, { result: statistics, currentIssue, isRoundStarted, isRoundEnded });
        } else {
          setNewСonnectedUser(user);
          setActiveAddNewUserModal(true);
        }
      }
    });

    socket.on('currentIssue', (issue: IIssue) => {
      setCurrentIssue(issue);
    });

    socket.on('startRound', () => {
      if (!isRoundStarted) {
        // ? можно убрать
        setRoundStarted(true);
        console.log('start round!');
      }
    });

    socket.on('endRound', () => {
      if (!isRoundEnded) {
        // ? можно убрать
        setRoundStarted(false);
        setRoundEnded(true);
        console.log('stop round!');
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

  const isIssueExistsInStatistics = (item: IIssue): boolean => {
    return !!statistics.find(({ issue }) => issue.id === item.id);
  };

  useDidUpdateEffect(() => {
    const players = getPlayers();
    if (settings.cardsFlipAutomatically && votes.length === players.length) {
      console.log('use effect for votes');
      setRoundEnded(true);
      setRoundStarted(false);
    }
  }, [votes]);

  // count votes and save statistics
  useDidUpdateEffect(() => {
    if (isRoundEnded) {
      setCardsFlipped(true);
      const players = getPlayers();
      const score = getScore(players);
      const votesForCurrentIssue = countVotes(score);
      if (!isIssueExistsInStatistics(currentIssue)) {
        console.log('add new result');
        dispatch(addGameResult({ issue: currentIssue, votesPercentage: votesForCurrentIssue }));
      } else {
        console.log('upd');
        // else update
        // проверить голосовали ли за эту issue и если да, удалить из голов (где записаны результаты прошлых баллов)
        // перезаписать если повторно головал TODO
      }
      console.log(votes, 'from game end');
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

  const onClickStartBtn = () => {
    if (isMaster) {
      // isRoundStarted && isRoundEnded - не бывает
      // isRoundStarted && !isRoundEnded - идет игра (стоп)
      // !isRoundStarted && isRoundEnded - после конца игры (рестарт)
      // !isRoundStarted && !isRoundEnded - самый первый вход в игру (первый раз открыл страницу)
      if (isRoundStarted && !isRoundEnded) {
        socket.emit('game:endRound');
        console.log('stop round click');
      } else {
        socket.emit('game:startRound');
        console.log('start round click');
      }
    }
  };

  const onClickNextIssueBtn = () => {
    if (!isRoundStarted) {
      const nextIssueIndex = issues.findIndex(issue => issue.id === currentIssue.id) + 1;
      const correctNewIssueIndex = nextIssueIndex < issues.length ? nextIssueIndex : 0;
      console.log('change issue', issues[correctNewIssueIndex]);
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
      console.log('change issue', chosenIssue);
      setRoundStarted(false);
      setRoundEnded(false);
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
    if (newСonnectedUser) {
      // ответ пользователю, что его пустили TODO
      socket.emit('game:sendState', newСonnectedUser.id, {
        result: statistics,
        currentIssue,
        isRoundStarted,
        isRoundEnded,
      });
      setNewСonnectedUser(null);
      setActiveAddNewUserModal(false);
    }
  };
  const onAddNewUserDecline = () => {
    setNewСonnectedUser(null);
    setActiveAddNewUserModal(false);
    // ответ пользователю, что его не пустили TODO
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
                <Button color='danger' size='large' className='scram-master__exit-btn' onClick={onClickExitBtn}>
                  Exit
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
              ) : null}

              {isMaster ? (
                <div className='scram-master__timer-btn'>
                  <Button color='success' size='large' onClick={onClickStartBtn}>
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
                </div>
              ) : null}
            </div>
            <div className='game__issues'>
              <h3 className='game__issues-title'>Issues</h3>
              <div className='game__issues-field'>
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
                        onClick={() => onChooseCard(index, value)}
                        size='large'
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className='game__statistics'>
              <h3 className='game__statistics-title'>Statistics</h3>
              <div className='game__statistics-field'>
                {isIssueExistsInStatistics(currentIssue) ? (
                  statistics
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
                    ))
                ) : (
                  <p>No results yet</p>
                )}
              </div>
            </div>
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
        {`${newСonnectedUser?.firstName} ${newСonnectedUser?.lastName} wants to join the game`}
      </ConfirmModal>
    </div>
  );
};

export default Game;
