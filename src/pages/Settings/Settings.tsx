import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Settings.scss';

import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import UserCard from '../../components/UserCard/UserCard';
import TextInput from '../../components/TextInput/TextInput';
import Button from '../../components/Button/Button';
import IssueCreationCard from '../../components/IssueCreationCard/IssueCreationCard';
import IssueCard from '../../components/IssueCard/IssueCard';
import Toggle from '../../components/Toggle/Toggle';
import Timer from '../../components/Timer/Timer';
import ConfirmModal from '../../components/ConfirmModal/ConfirmModal';
import CreateIssueModal from '../../components/CreateIssueModal/CreateIssueModal';
import SpCardBack from '../../components/SpCardBack/SpCardBack';
import SpCreationCard from '../../components/SpCreationCard/SpCreationCard';
import { IIssue, ISettings, IState, IUser } from '../../redux/models';
import spCardBacks from '../../constants/spCardBacks';
import { updateSettings } from '../../redux/actions/settingsActions';
import SpCardBackType from '../../types/SpCardBackType';
import CreateSpCardModal from '../../components/CreateSpCardModal/CreateSpCardModal';
import SpOptionCard from '../../components/SpOptionCard/SpOptionCard';
import { addIssue, removeIssue, updateIssue } from '../../redux/actions/issuesActions';
import PriorityLevel from '../../types/PriorityLevel';
import { removeUser } from '../../redux/actions/usersActions';
import FileInput from '../../components/FileInput/FileInput';

const Settings: React.FC = () => {
  const dispatch = useDispatch();

  const roomId = useSelector((state: IState) => state.room.id);
  const roomName = useSelector((state: IState) => state.room.name);
  const admin = useSelector((state: IState) => state.room.admin);
  const users = useSelector((state: IState) => state.users);
  const issues = useSelector((state: IState) => state.issues);
  const cardBacks = spCardBacks.map(value => value.type);

  const settings = localStorage.getItem('settings');
  const data: ISettings | undefined = settings ? JSON.parse(settings) : undefined;

  const [masterAsPlayer, setMasterAsPlayer] = useState<boolean>(data ? !data.isAdminObserver : false);
  const [flipCardsInTheEnd, setFlipCardsInTheEnd] = useState<boolean>(data ? data.cardsFlipAutomatically : false);
  const [isTimer, setIsTimer] = useState<boolean>(data ? !!data.timer : false);
  const [timerMinutes, setTimerMinutes] = useState<number>(data && data.timer ? data.timer.minutes : 0);
  const [timerSeconds, setTimerSeconds] = useState<number>(data && data.timer ? data.timer.seconds : 0);
  const [autoAddUsers, setAutoAddUsers] = useState<boolean>(data ? data.addNewPlayersAutomatically : false);
  const [scoreType, setScoreType] = useState<string>(data ? data.scoreType : '');
  const [cardBack, setCardBack] = useState<SpCardBackType>(data ? data.cardBack : 'type1');
  const [voteCardValues, setVoteCardValues] = useState<string[]>(data ? data.cardValues : []);

  const [isActiveCreateIssueModal, setActiveStatusCreateIssueModal] = useState(false);
  const [isActiveCreateVoteCardModal, setActiveStatusCreateVoteCardModal] = useState(false);

  const [isActiveDeleteUserModal, setActiveStatusDeleteUserModal] = useState(false);
  const [isActiveDeleteIssueModal, setActiveStatusDeleteIssueModal] = useState(false);
  const [isActiveDeleteVoteCardModal, setActiveStatusDeleteVoteCardModal] = useState(false);

  const [isActiveEditIssueModal, setActiveStatusEditIssueModal] = useState(false);
  const [isActiveEditVoteCardModal, setActiveStatusEditVoteCardModal] = useState(false);

  const [selectedIssue, setSelectedIssue] = useState<IIssue | null>(null);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [selectedVoteCard, setSelectedVoteCard] = useState<number | null>(null);

  const [isActiveStartConfirmModal, setActiveStatusStartConfirmModal] = useState(false);
  const [isActiveStopConfirmModal, setActiveStatusStopConfirmModal] = useState(false);

  const getSettingsData = (): ISettings => ({
    isAdminObserver: !masterAsPlayer,
    timer: isTimer ? { minutes: timerMinutes, seconds: timerSeconds } : null,
    scoreType,
    cardValues: voteCardValues,
    cardBack,
    addNewPlayersAutomatically: autoAddUsers,
    cardsFlipAutomatically: flipCardsInTheEnd,
  });

  const onCopyClick = () => {
    navigator.clipboard.writeText(`${roomId}`);
  };

  const onStartGameClick = () => {
    setActiveStatusStartConfirmModal(true);
  };
  const onStartModalConfirm = () => {
    const settingsData = getSettingsData();
    localStorage.setItem('settings', JSON.stringify(settingsData));
    dispatch(updateSettings(settingsData));
    setActiveStatusStartConfirmModal(false);
    // start game here
  };
  const onStartModalDecline = () => {
    setActiveStatusStartConfirmModal(false);
  };

  const onStopGameClick = () => {
    setActiveStatusStopConfirmModal(true);
  };
  const onStopModalConfirm = () => {
    // stop game here
    setActiveStatusStopConfirmModal(false);
  };
  const onStopModalDecline = () => {
    setActiveStatusStopConfirmModal(false);
  };

  const onScoreTypeInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setScoreType(event.currentTarget.value);
  };

  const onCardBackClick = (element: SpCardBackType) => {
    setCardBack(element);
  };

  const deleteUserAction = (user: IUser) => {
    setSelectedUser(user);
    setActiveStatusDeleteUserModal(true);
  };
  const onUserDeleteModalDecline = () => {
    setActiveStatusDeleteUserModal(false);
  };
  const onUserDeleteModalConfirm = () => {
    if (selectedUser) {
      dispatch(removeUser(selectedUser.id));
      setSelectedUser(null);
      setActiveStatusDeleteUserModal(false);
    }
  };

  const addIssueAction = () => {
    setActiveStatusCreateIssueModal(true);
  };
  const onCreateIssueModalConfirm = (name: string, priority: PriorityLevel) => {
    const id = issues.length > 0 ? issues[issues.length - 1].id + 1 : 1;
    dispatch(addIssue({ id, name, priority }));
    setActiveStatusCreateIssueModal(false);
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
      setSelectedIssue(null);
      setActiveStatusDeleteIssueModal(false);
    }
  };

  const editIssueAction = (issue: IIssue) => {
    setSelectedIssue(issue);
    setActiveStatusEditIssueModal(true);
  };
  const onEditIssueModalConfirm = (name: string, priority: PriorityLevel) => {
    if (selectedIssue) {
      dispatch(updateIssue({ id: selectedIssue.id, name, priority }));
      setSelectedIssue(null);
      setActiveStatusEditIssueModal(false);
    }
  };

  const deleteVoteCardAction = (index: number) => {
    setSelectedVoteCard(index);
    setActiveStatusDeleteVoteCardModal(true);
  };
  const onVoteCardDeleteModalDecline = () => {
    setActiveStatusDeleteVoteCardModal(false);
  };
  const onVoteCardDeleteModalConfirm = () => {
    if (selectedVoteCard !== null) {
      const newCardValues = [...voteCardValues];
      newCardValues.splice(selectedVoteCard, 1);
      setVoteCardValues(newCardValues);
      setSelectedVoteCard(null);
    }
    setActiveStatusDeleteVoteCardModal(false);
  };

  const editVoteCardAction = (index: number) => {
    setSelectedVoteCard(index);
    setActiveStatusEditVoteCardModal(true);
  };
  const onVoteCardEditModalConfirm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newCardValues = [...voteCardValues];
    const formData = new FormData(event.currentTarget);
    const score = formData.get('score') as string;
    const isUnknown = Boolean(formData.get('isUnknown'));
    if (selectedVoteCard !== null) {
      if (isUnknown) {
        newCardValues[selectedVoteCard] = '';
      } else if (score) {
        newCardValues[selectedVoteCard] = score;
      }
    }
    setVoteCardValues(newCardValues);
    setActiveStatusEditVoteCardModal(false);
  };

  const onCreateVoteCardClick = () => setActiveStatusCreateVoteCardModal(true);
  const onCreateVoteCardModalConfirm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const score = formData.get('score') as string;
    const isUnknown = Boolean(formData.get('isUnknown'));
    if (isUnknown) {
      setVoteCardValues([...voteCardValues, '']);
    } else if (score) {
      setVoteCardValues([...voteCardValues, score]);
    }
    setActiveStatusCreateVoteCardModal(false);
  };

  const fileInputOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.currentTarget;
    const file = files && files[0] ? files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = () => {
        const json: IIssue[] = JSON.parse(reader.result as string);
        if (json) {
          json.forEach(issue => {
            dispatch(addIssue(issue));
          });
        }
      };
    }
    event.currentTarget.value = '';
  };

  return (
    <div className='lobby'>
      <Header isAuthorized />
      <div className='lobby__wrapper'>
        <div className='lobby__container'>
          <h2 className='lobby__title'>{roomName}</h2>

          <div className='lobby__info'>
            <div className='lobby__room-info'>
              <div className='lobby__room-master'>
                <h3 className='lobby__section-title'>Scram master:</h3>
                <UserCard
                  name={admin?.firstName}
                  surname={admin?.lastName}
                  jobPosition={admin?.position}
                  avatar={admin?.avatar}
                  color='primary'
                  className='lobby__scram-master_card'
                />
              </div>
              <div className='lobby__room-id'>
                <h3 className='lobby__section-title'>Link to lobby:</h3>
                <TextInput size='large' color='light' bordered value={roomId} disabled />
                <Button color='dark' size='large' onClick={onCopyClick}>
                  Copy
                </Button>
              </div>
            </div>
            <div className='lobby__controls'>
              <Button color='success' size='large' onClick={onStartGameClick}>
                Start game
              </Button>
              <Button color='danger' size='large' onClick={onStopGameClick}>
                Cancel game
              </Button>
            </div>
          </div>

          <div className='lobby__members'>
            <h3 className='lobby__section-title'>Members</h3>
            <div className='lobby__members-container'>
              {users && users.length ? (
                users.map((element, index: number) => (
                  <UserCard
                    key={index.toString()}
                    name={element.firstName}
                    surname={element.lastName}
                    jobPosition={element.position}
                    avatar={element.avatar}
                    deleteAction={() => deleteUserAction(element)}
                    className='lobby__member_card'
                  />
                ))
              ) : (
                <p className='lobby__empty-text'>There is no members</p>
              )}
            </div>
          </div>

          <div className='lobby__issues'>
            <h3 className='lobby__section-title'>Issues</h3>
            <div className='lobby__issues-file'>
              <p className='lobby__empty-text'>Click here to load json file with issues data</p>
              <div className='lobby__send-file-card'>
                <FileInput
                  color='success'
                  accept='application/json'
                  name='issues-file'
                  onChange={fileInputOnChange}
                  required
                />
              </div>
            </div>
            <div className='lobby__issues-container'>
              {issues?.map((element, index) => (
                <IssueCard
                  key={index.toString()}
                  name={element.name}
                  priority={element.priority}
                  deleteAction={() => deleteIssueAction(element)}
                  editAction={() => editIssueAction(element)}
                  className='lobby__issue-card'
                />
              ))}
              <IssueCreationCard
                label='Create issue'
                addAction={addIssueAction}
                className='lobby__issues_create-issue'
              />
            </div>
          </div>

          <div className='lobby__settings'>
            <h3 className='lobby__section-title'>Game settings</h3>
            <form className='lobby__settings_form'>
              <Toggle checked={masterAsPlayer} inputId='scramMasterToggle' onChange={setMasterAsPlayer}>
                Scram master as player
              </Toggle>
              <Toggle checked={flipCardsInTheEnd} inputId='changingCardToggle' onChange={setFlipCardsInTheEnd}>
                Flip cards in round end
              </Toggle>
              <Toggle checked={isTimer} inputId='timerNeededToggle' onChange={setIsTimer}>
                Is timer needed
              </Toggle>
              <Toggle checked={autoAddUsers} inputId='addNewPlayerToggle' onChange={setAutoAddUsers}>
                Auto add users
              </Toggle>
              <label htmlFor='scoreType' className='lobby__score-input'>
                <span>Score type</span>
                <TextInput
                  id='scoreType'
                  name='scoreType'
                  placeholder='Story point'
                  value={scoreType}
                  onChange={onScoreTypeInputChange}
                />
              </label>
              {isTimer ? (
                <label htmlFor='timer' className='lobby__timer-input'>
                  <span>Round time</span>
                  <Timer
                    id='timer'
                    minutes={timerMinutes}
                    seconds={timerSeconds}
                    setMinutes={setTimerMinutes}
                    setSeconds={setTimerSeconds}
                  />
                </label>
              ) : null}
            </form>

            <div className='lobby__card-backs'>
              <h3 className='lobby__section-title'>Set card back:</h3>
              <div className='lobby__card-backs-container'>
                {cardBacks?.map((element, index) => (
                  <SpCardBack
                    key={index.toString()}
                    type={element}
                    size='small'
                    onClick={() => onCardBackClick(element)}
                    isSelected={cardBack === element}
                  />
                ))}
              </div>
            </div>

            <div className='lobby__card-fronts'>
              <h3 className='lobby__section-title'>Add card values:</h3>
              <div className='lobby__card-fronts-container'>
                {voteCardValues?.map((element, index) => (
                  <SpOptionCard
                    key={index.toString()}
                    deleteAction={() => deleteVoteCardAction(index)}
                    editAction={() => editVoteCardAction(index)}
                    score={element}
                    units={scoreType}
                    size='small'
                  />
                ))}
                <SpCreationCard onClick={onCreateVoteCardClick} size='small' />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />

      <ConfirmModal
        isActive={isActiveStartConfirmModal}
        setActive={setActiveStatusStartConfirmModal}
        onDecline={onStartModalDecline}
        onConfirm={onStartModalConfirm}
      >
        Start game with current settings?
      </ConfirmModal>

      <ConfirmModal
        isActive={isActiveStopConfirmModal}
        setActive={setActiveStatusStopConfirmModal}
        onDecline={onStopModalDecline}
        onConfirm={onStopModalConfirm}
      >
        Stop this game ?
      </ConfirmModal>

      <ConfirmModal
        isActive={isActiveDeleteUserModal}
        setActive={setActiveStatusDeleteUserModal}
        onDecline={onUserDeleteModalDecline}
        onConfirm={onUserDeleteModalConfirm}
      >
        {`Remove ${selectedUser?.firstName} ${selectedUser?.lastName} from lobby?`}
      </ConfirmModal>

      <ConfirmModal
        isActive={isActiveDeleteIssueModal}
        setActive={setActiveStatusDeleteIssueModal}
        onDecline={onIssueDeleteModalDecline}
        onConfirm={onIssueDeleteModalConfirm}
      >
        {`Remove issue "${selectedIssue?.name}" from lobby?`}
      </ConfirmModal>

      <ConfirmModal
        isActive={isActiveDeleteVoteCardModal}
        setActive={setActiveStatusDeleteVoteCardModal}
        onDecline={onVoteCardDeleteModalDecline}
        onConfirm={onVoteCardDeleteModalConfirm}
      >
        {`Remove vote card with "${
          selectedVoteCard !== null && voteCardValues[selectedVoteCard] !== ''
            ? voteCardValues[selectedVoteCard]
            : 'unknown'
        }" score from lobby?`}
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

      <CreateSpCardModal
        isActive={isActiveCreateVoteCardModal}
        setActive={setActiveStatusCreateVoteCardModal}
        onSubmit={onCreateVoteCardModalConfirm}
      />

      <CreateSpCardModal
        isActive={isActiveEditVoteCardModal}
        setActive={setActiveStatusEditVoteCardModal}
        onSubmit={onVoteCardEditModalConfirm}
        score={selectedVoteCard !== null ? voteCardValues[selectedVoteCard] : voteCardValues[selectedVoteCard || 0]}
      />
    </div>
  );
};

export default Settings;
