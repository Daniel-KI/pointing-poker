import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './ConnectModal.scss';

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

// Родительский компонент:
// const [isActive, setActive] = useState(false);
// const modalActive = () => {
//   setActive(true);
// };

// Появление модального окна при нажатии на кнопку
//   <Button onClick={modalActive}>Modal</Button>
//   <ConnectModal isActive={isActive} setActive={setActive} onDecline={onDecline} onConfirm={onConfirm} userType='admin | user' />

const ConnectModal: React.FC<ConnectModalProps> = ({ setActive, isActive, userType }) => {
  const dispatch = useDispatch();

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
    firstName,
    lastName,
    position,
    avatar,
    role: userType,
    isObserver,
    roomName,
  });

  const onFirstNameInputChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setFirstName(event.currentTarget.value);
  const onLastNameInputChange = (event: React.ChangeEvent<HTMLInputElement>) => setLastName(event.currentTarget.value);
  const onPositionInputChange = (event: React.ChangeEvent<HTMLInputElement>) => setPosition(event.currentTarget.value);
  const onAvatarInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.currentTarget;
    if (!input.files || !input.files[0]) {
      setAvatar('');
    } else {
      const imageURL = await imageToDataURL(input.files[0]);
      setAvatar(imageURL);
    }
  };
  const onRoomNameInputChange = (event: React.ChangeEvent<HTMLInputElement>) => setRoomName(event.currentTarget.value);

  const onFormSubmitAdmin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const user = getUserData();
    joinRoom(socket, user);
    dispatch(updateCurrentUser({ id: socket.id, role: userType }));
    dispatch(updateRoom({ id: socket.id, name: user.roomName, admin: user }));
    resetData();
    setActive(false);
    // redirect to lobby page
  };

  const onFormSubmitUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const user = { ...getUserData(), roomId };
    joinRoom(socket, user);
    dispatch(updateCurrentUser({ id: socket.id, role: userType }));
    const roomData = await getRoomData(roomId);
    if (roomData) {
      dispatch(updateRoom(roomData));
      resetData();
      setActive(false);
      // redirect to lobby page
    }
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
              />
              <TextInput
                name='lastName'
                placeholder='Your last name'
                color='light'
                required
                bordered
                onChange={onLastNameInputChange}
              />
              <TextInput
                name='position'
                placeholder='Your job position'
                color='light'
                required
                bordered
                onChange={onPositionInputChange}
              />
              {userType === 'admin' ? (
                <TextInput
                  name='roomName'
                  placeholder='Lobby name'
                  color='light'
                  required
                  bordered
                  onChange={onRoomNameInputChange}
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
