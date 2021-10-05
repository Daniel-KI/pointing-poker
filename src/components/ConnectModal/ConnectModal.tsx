import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './ConnectModal.scss';

import { useHistory } from 'react-router-dom';
import TextInput from '../TextInput/TextInput';
import { ConnectModalProps } from './models';
import Avatar from '../Avatar/Avatar';
import FileInput from '../FileInput/FileInput';
import Button from '../Button/Button';
import Toggle from '../Toggle/Toggle';
import ModalBox from '../ModalBox/ModalBox';
import imageToDataURL from '../../utils/imageToDataURL';
import IConnectionData from '../../api/models';
import joinRoom from '../../api/joinRoom';
import { IState } from '../../redux/models';
import getRoomData from '../../api/getRoomData';
import { updateRoom } from '../../redux/actions/roomActions';
import { updateCurrentUser } from '../../redux/actions/currentUserActions';
import validateFullName from '../../utils/validation/validateFullName';
import emptyStringValidation from '../../utils/validation/emptyStringValidation';
import { updateSettings } from '../../redux/actions/settingsActions';
import { updateIssues } from '../../redux/actions/issuesActions';
import { updateUsers } from '../../redux/actions/usersActions';

const ConnectModal: React.FC<ConnectModalProps> = ({ setActive, isActive, userType }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const socket = useSelector((state: IState) => state.socket);
  const roomId = useSelector((state: IState) => state.room.id);

  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [position, setPosition] = useState<string>('');
  const [isObserver, setObserverStatus] = useState<boolean>(false);
  const [roomName, setRoomName] = useState<string>('');
  const [avatar, setAvatar] = useState<string>('');

  useEffect(() => {
    if (!isActive) {
      setAvatar('');
    }
  }, [isActive]);

  const resetData = () => {
    setAvatar('');
    setFirstName('');
    setLastName('');
    setPosition('');
    setObserverStatus(false);
    setRoomName('');
  };

  const getUserData = (): IConnectionData => ({
    id: socket.id,
    firstName,
    lastName,
    position,
    avatar,
    role: userType,
    isObserver,
    roomName,
  });

  const validateFullNameInputs = (input: HTMLInputElement) => {
    const validationMessage = validateFullName(input.value);
    input.setCustomValidity(validationMessage);
  };

  const validatePositionInput = (input: HTMLInputElement) => {
    const validationMessage = emptyStringValidation(input.value) ? 'This field cannot be empty' : '';
    input.setCustomValidity(validationMessage);
  };

  const validateRoomNameInput = (input: HTMLInputElement) => {
    const validationMessage = emptyStringValidation(input.value) ? 'This field cannot be empty' : '';
    input.setCustomValidity(validationMessage);
  };

  const onFirstNameInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.currentTarget;
    validateFullNameInputs(input);
    input.reportValidity();
    setFirstName(input.value);
  };

  const onLastNameInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.currentTarget;
    validateFullNameInputs(input);
    input.reportValidity();
    setLastName(input.value);
  };

  const onFullNameInputInvalid = (event: React.FormEvent<HTMLInputElement>) => {
    validateFullNameInputs(event.currentTarget);
  };

  const onPositionInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.currentTarget;
    validatePositionInput(input);
    input.reportValidity();
    setPosition(input.value);
  };

  const onPositionInputInvalid = (event: React.FormEvent<HTMLInputElement>) => {
    validatePositionInput(event.currentTarget);
  };

  const onRoomNameInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.currentTarget;
    validateRoomNameInput(input);
    input.reportValidity();
    setRoomName(input.value);
  };

  const onRoomNameInputInvalid = (event: React.FormEvent<HTMLInputElement>) => {
    validateRoomNameInput(event.currentTarget);
  };

  const onAvatarInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.currentTarget;
    if (!input.files || !input.files[0]) {
      setAvatar('');
    } else {
      const imageURL = await imageToDataURL(input.files[0]);
      setAvatar(imageURL);
    }
  };

  const onFormSubmitAdmin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const user = getUserData();
    dispatch(updateCurrentUser({ id: socket.id, role: userType }));
    dispatch(updateRoom({ id: socket.id, name: user.roomName, admin: user }));
    resetData();
    setActive(false);
    // redirect to lobby page
    history.push(`/settings/${socket.id}`);
    joinRoom(socket, user);
  };

  const onFormSubmitUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const user = { ...getUserData(), roomId };
    dispatch(updateCurrentUser({ id: socket.id, role: userType }));
    const roomData = await getRoomData(roomId);
    if (!roomData) {
      return;
    }
    dispatch(updateRoom(roomData));
    if (roomData.isGameStarted && roomData.settings && roomData.issues && roomData.users) {
      dispatch(updateSettings(roomData.settings));
      dispatch(updateIssues(roomData.issues));
      dispatch(updateUsers(roomData.users));
    }
    resetData();
    setActive(false);
    // redirect to lobby page
    history.push(roomData.isGameStarted ? `/game/${roomId}` : `/lobby/${roomId}`);
    joinRoom(socket, user);
  };

  const cancelBtnOnClick = () => {
    resetData();
    setActive(false);
  };

  return (
    <ModalBox active={isActive} setActive={setActive}>
      <div className='connect-form'>
        <h2 className='connect-form__title'>Connect to lobby</h2>
        <form onSubmit={userType === 'admin' ? onFormSubmitAdmin : onFormSubmitUser}>
          <div className='connect-form__wrapper'>
            <div className='connect-form__text-inputs'>
              <TextInput
                name='firstName'
                placeholder='Your first name'
                color='light'
                required
                bordered
                onChange={onFirstNameInputChange}
                onInvalid={onFullNameInputInvalid}
              />
              <TextInput
                name='lastName'
                placeholder='Your last name'
                color='light'
                required
                bordered
                onChange={onLastNameInputChange}
                onInvalid={onFullNameInputInvalid}
              />
              <TextInput
                name='position'
                placeholder='Your job position'
                color='light'
                required
                bordered
                onChange={onPositionInputChange}
                onInvalid={onPositionInputInvalid}
              />
              {userType === 'admin' ? (
                <TextInput
                  name='roomName'
                  placeholder='Lobby name'
                  color='light'
                  required
                  bordered
                  onChange={onRoomNameInputChange}
                  onInvalid={onRoomNameInputInvalid}
                />
              ) : (
                <Toggle name='isObserver' checked={isObserver} onChange={setObserverStatus}>
                  Connect as observer
                </Toggle>
              )}
            </div>
            <div className='connect-form__avatar-inputs'>
              <Avatar imgName={avatar} size='large' className='connect-form__avatar-inputs_avatar' />
              <FileInput
                name='avatar'
                color='success'
                size='large'
                className='connect-form__avatar-inputs_file-input'
                onChange={onAvatarInputChange}
              />
            </div>
          </div>
          <div className='connect-form__buttons'>
            <Button color='success' size='large' className='connect-form__buttons_button' submit>
              Confirm
            </Button>
            <Button color='danger' size='large' className='connect-form__buttons_button' onClick={cancelBtnOnClick}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </ModalBox>
  );
};

export default ConnectModal;
