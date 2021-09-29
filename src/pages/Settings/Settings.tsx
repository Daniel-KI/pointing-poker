import React, { useEffect, useState } from 'react';
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
import { ISettings, IState, IUser } from '../../redux/models';
import spCardBacks from '../../constants/spCardBacks';
import { BASE_URL } from '../../api/constants';
import { updateSettings } from '../../redux/actions/settingsActions';
import SpCardBackType from '../../types/SpCardBackType';
import CreateSpCardModal from '../../components/CreateSpCardModal/CreateSpCardModal';
import SpOptionCard from '../../components/SpOptionCard/SpOptionCard';
import { addIssue, removeIssue, updateIssue } from '../../redux/actions/issuesActions';
import PriorityLevel from '../../types/PriorityLevel';
import { removeUser } from '../../redux/actions/usersActions';

const Settings: React.FC = () => {
  const dispatch = useDispatch();

  const roomId = useSelector((state: IState) => state.room.id);
  const roomName = useSelector((state: IState) => state.room.name);
  const admin = useSelector((state: IState) => state.room.admin);
  const users = useSelector((state: IState) => state.users);
  const issues = useSelector((state: IState) => state.issues);

  const settings = localStorage.getItem('settings');

  const [isAdminPlayer, setAdminIsPlayer] = useState<boolean>(false);
  const [flipCards, toggleFlipCards] = useState<boolean>(false);
  const [isTimerNeeded, toggleTimerNeeded] = useState<boolean>(false);
  const [scoreType, setScoreType] = useState<string>(() => {
    if (settings) {
      const data: ISettings = JSON.parse(settings);
      return data.scoreType;
    }
    return '';
  });
  const [cardBack, setCardBack] = useState<SpCardBackType>('type1');
  const [addNewPlayer, toggleAddNewPlayer] = useState<boolean>(false);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  const [cardValues, setCardValues] = useState<string[]>([]);

  const [isEditIssueActive, setEditIssueActive] = useState(false);
  const [editIssueId, setEditIssueId] = useState<number | null>(null);
  const [isCardEditActive, setCardEditActive] = useState(false);
  const [cardEditIndex, setCardEditIndex] = useState<number | null>(null);
  const [isCardCreateActive, setCardCreateActive] = useState(false);
  const [isCreateIssueActive, setCreateIssueActive] = useState(false);
  const [isUserModalActive, setUserModalActive] = useState(false);
  const [deletingUser, setDeletingUser] = useState<IUser | null>(null);

  useEffect(() => {
    if (settings) {
      const data: ISettings = JSON.parse(settings);
      setAdminIsPlayer(!data.isAdminObserver);
      toggleFlipCards(data.cardsFlipAutomatically);
      toggleTimerNeeded(!!data.timer);
      toggleAddNewPlayer(data.addNewPlayersAutomatically);
      setCardBack(data.cardBack);
      setMinutes(data.timer ? data.timer.minutes : 0);
      setSeconds(data.timer ? data.timer.seconds : 0);
      setCardValues(data.cardValues);
    }
  }, []);

  const getSettingsData = (): ISettings => ({
    isAdminObserver: !isAdminPlayer,
    timer: isTimerNeeded ? { minutes, seconds } : null,
    scoreType,
    cardValues,
    cardBack,
    addNewPlayersAutomatically: addNewPlayer,
    cardsFlipAutomatically: flipCards,
  });

  const cardBacks = spCardBacks.map(value => value.type);

  const linkToLobby = `${BASE_URL}${roomId}`;

  const onUserModalConfirm = () => {
    if (deletingUser !== null) {
      dispatch(removeUser(deletingUser.id));
      setUserModalActive(false);
    }
  };
  const onUserModalDecline = () => {
    setUserModalActive(false);
  };
  const deleteUserAction = (user: IUser) => {
    setDeletingUser(user);
    setUserModalActive(true);
  };

  const onCopyClick = () => {
    navigator.clipboard.writeText(linkToLobby);
  };
  const onStartGameClick = () => {
    const settingsData = getSettingsData();
    dispatch(updateSettings(settingsData));
    localStorage.setItem('settings', JSON.stringify(settingsData));
  };

  const onEditIssueSubmit = (name: string, priority: PriorityLevel) => {
    if (editIssueId !== null) {
      dispatch(updateIssue({ id: editIssueId, name, priority }));
      setEditIssueActive(false);
    }
  };
  const editIssueAction = (id: number) => {
    setEditIssueId(id);
    setEditIssueActive(true);
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

  const onScoreTypeInputChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setScoreType(event.currentTarget.value);

  const onCardBackClick = (element: SpCardBackType) => setCardBack(element);

  const deleteCardAction = (index: number) => {
    const newCardValues = [...cardValues];
    newCardValues.splice(index, 1);
    setCardValues(newCardValues);
  };
  const editCardAction = (index: number) => {
    setCardEditIndex(index);
    setCardEditActive(true);
  };
  const onCardEditSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const value = formData.get('score') as string;
    const newCardValues = [...cardValues];
    if (formData.get('isUnknown') && cardEditIndex !== null) {
      newCardValues[cardEditIndex] = '';
    } else if (value && cardEditIndex !== null) {
      newCardValues[cardEditIndex] = value;
    }
    setCardValues(newCardValues);
    setCardEditActive(false);
  };
  const onCreateCardClick = () => setCardCreateActive(true);
  const onCardCreateSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const value = formData.get('score') as string;
    if (formData.get('isUnknown')) {
      setCardValues([...cardValues, '']);
    } else if (value) {
      setCardValues([...cardValues, value]);
    }
    setCardCreateActive(false);
  };

  return (
    <div className='lobby'>
      <Header isAuthorized />
      <div className='lobby__wrapper'>
        <h2 className='lobby__title'>
          <div className='lobby__title_content'>{roomName}</div>
        </h2>
        <div className='lobby__scram-master'>
          <div className='lobby__scram-master_card-field-wrapper'>
            <div className='lobby__scram-master_card-field'>
              <div>Scram master:</div>
              <UserCard
                name={admin?.firstName}
                surname={admin?.lastName}
                jobPosition={admin?.position}
                avatar={admin?.avatar}
                color='primary'
                className='lobby__scram-master_card'
              />
            </div>

            <div className='lobby__scram-master_link-field'>
              <div>Link to lobby:</div>
              <TextInput size='large' className='lobby__scram-master_link-input' value={linkToLobby} />
              <Button color='dark' size='large' onClick={onCopyClick}>
                Copy
              </Button>
            </div>
          </div>

          <div className='lobby__scram-master_button-field'>
            <Button color='success' size='large' onClick={onStartGameClick}>
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
            {users?.map((element, index: number) => (
              <UserCard
                key={index.toString()}
                name={element.firstName}
                surname={element.lastName}
                jobPosition={element.position}
                avatar={element.avatar}
                deleteAction={() => deleteUserAction(element)}
                className='lobby__members_card'
              />
            ))}
          </div>
        </div>

        <div className='lobby__issues'>
          <h3 className='lobby__issues_title'>Issues</h3>
          <div className='lobby__issues_issues-field'>
            {issues?.map((element, index) => (
              <IssueCard
                key={index.toString()}
                name={element.name}
                priority={element.priority}
                deleteAction={() => deleteIssueAction(element.id)}
                editAction={() => editIssueAction(element.id)}
                className='lobby__issues_issue'
              />
            ))}
            <CreateIssueModal
              isActive={isEditIssueActive}
              setActive={setEditIssueActive}
              onSubmit={onEditIssueSubmit}
            />
            <IssueCreationCard label='Create issue' addAction={addIssueAction} className='lobby__issues_create-issue' />
          </div>
        </div>

        <div className='lobby__settings'>
          <h3 className='lobby__settings_title'>Game settings</h3>
          <div className='lobby__settings_settings-field'>
            <form className='lobby__settings_items'>
              <Toggle
                checked={isAdminPlayer}
                inputId='scramMasterToggle'
                onChange={setAdminIsPlayer}
                className='lobby__settings_toggle-item'
              >
                Scram master as player:
              </Toggle>
              <Toggle
                checked={flipCards}
                inputId='changingCardToggle'
                onChange={toggleFlipCards}
                className='lobby__settings_toggle-item'
              >
                Changing card in round end:
              </Toggle>
              <Toggle
                checked={isTimerNeeded}
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
                <TextInput
                  id='scoreType'
                  name='scoreType'
                  placeholder='Story point'
                  value={scoreType}
                  onChange={onScoreTypeInputChange}
                />
              </label>
              {isTimerNeeded ? (
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
              ) : null}
            </form>
            <div className='lobby__settings_items'>
              <div className='lobby__settings_cards-back'>
                <div>Set card back:</div>
                <div className='lobby__settings_cards-back-items'>
                  {cardBacks?.map((element, index) => (
                    <SpCardBack
                      key={index.toString()}
                      className='lobby__settings_cards-back-item'
                      type={element}
                      size='small'
                      onClick={() => onCardBackClick(element)}
                      isSelected={cardBack === element}
                    />
                  ))}
                </div>
              </div>
              <div className='lobby__settings_cards-front'>
                <div>Add card values:</div>
                <div className='lobby__settings_cards-front-items'>
                  {cardValues?.map((element, index) => (
                    <SpOptionCard
                      key={index.toString()}
                      className='lobby__settings_cards-front-item'
                      deleteAction={() => deleteCardAction(index)}
                      editAction={() => editCardAction(index)}
                      score={element}
                      units={scoreType}
                      size='small'
                    />
                  ))}
                  <SpCreationCard onClick={onCreateCardClick} size='small' />
                  <CreateSpCardModal
                    isActive={isCardCreateActive}
                    setActive={setCardCreateActive}
                    onSubmit={onCardCreateSubmit}
                  />
                  <CreateSpCardModal
                    isActive={isCardEditActive}
                    setActive={setCardEditActive}
                    onSubmit={onCardEditSubmit}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />

      {isUserModalActive ? (
        <ConfirmModal
          isActive={isUserModalActive}
          setActive={setUserModalActive}
          onDecline={onUserModalDecline}
          onConfirm={onUserModalConfirm}
        >
          {`Remove ${deletingUser?.firstName} ${deletingUser?.lastName} from lobby?`}
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

export default Settings;
