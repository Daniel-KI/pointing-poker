import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './ConnectModal.scss';

import TextInput from '../TextInput/TextInput';
import { ConnectModalProps } from './models';
import Avatar from '../Avatar/Avatar';
import FileInput from '../FileInput/FileInput';
import Button from '../Button/Button';
import Toggle from '../Toggle/Toggle';
import ModalBox from '../ModalBox/ModalBox';
import { IStore } from '../../redux/actions';
import imageToDataURL from '../../utils/imageToDataURL';
import IUserData from '../../api/models';
import joinRoom from '../../api/joinRoom';

// Родительский компонент:
// const [isActive, setActive] = useState(false);
// const modalActive = () => {
//   setActive(true);
// };
// const onConfirm = () => {
//   setActive(false);
//   console.log('confirm');
// };
// const onDecline = () => {
//   setActive(false);
//   console.log('decline');
// };

// Появление модального окна при нажатии на кнопку
//   <Button onClick={modalActive}>Modal</Button>
//   <ConnectModal isActive={isActive} setActive={setActive} onDecline={onDecline} onConfirm={onConfirm} userType='admin | user' />

const ConnectModal: React.FC<ConnectModalProps> = ({ setActive, isActive, onDecline, userType }) => {
  const socket = useSelector((state: IStore) => state.socket);

  const [checked, toggleChecked] = useState<boolean>(false);
  const [avatarName, avatarNameSetActive] = useState<string>('');

  const onAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.currentTarget;
    if (!input.files) return;
    const imageURL = await imageToDataURL(input.files[0]);
    avatarNameSetActive(imageURL);
  };

  const onFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const file = formData.get('avatar') as File;
    const imageURL = await imageToDataURL(file);
    formData.set('avatar', imageURL);
    formData.set('role', userType);
    const data = Object.fromEntries(formData) as unknown as IUserData;

    joinRoom(socket, data);

    setActive(false);
  };

  return (
    <ModalBox active={isActive} setActive={setActive}>
      <div className='connect-form'>
        <h2 className='connect-form__title'>Connect to lobby</h2>
        <form onSubmit={onFormSubmit}>
          <div className='connect-form__wrapper'>
            <div className='connect-form__text-inputs'>
              <TextInput name='firstName' placeholder='Your first name' color='light' required bordered />
              <TextInput name='lastName' placeholder='Your last name' color='light' required bordered />
              <TextInput name='position' placeholder='Your job position' color='light' required bordered />
              {userType === 'admin' ? (
                <TextInput name='roomName' placeholder='Lobby name' color='light' required bordered />
              ) : (
                <Toggle name='isPlayer' checked={checked} onChange={toggleChecked}>
                  Connect as observer
                </Toggle>
              )}
            </div>
            <div className='connect-form__avatar-inputs'>
              <Avatar imgName={avatarName} size='large' className='connect-form__avatar-inputs_avatar' />
              <FileInput
                name='avatar'
                color='success'
                size='large'
                className='connect-form__avatar-inputs_file-input'
                onChange={onAvatarChange}
              />
            </div>
          </div>
          <div className='connect-form__buttons'>
            <Button color='success' size='large' className='connect-form__buttons_button' submit>
              Confirm
            </Button>
            <Button color='danger' size='large' className='connect-form__buttons_button' onClick={onDecline}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </ModalBox>
  );
};

export default ConnectModal;
