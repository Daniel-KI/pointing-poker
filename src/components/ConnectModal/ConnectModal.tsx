import React, { useState } from 'react';
import './ConnectModal.scss';
import TextInput from '../TextInput/TextInput';
import { ConnectModalProps } from './models';
import Avatar from '../Avatar/Avatar';
import FileInput from '../FileInput/FileInput';
import Button from '../Button/Button';
import Toggle from '../Toggle/Toggle';
import ModalBox from '../ModalBox/ModalBox';

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

const ConnectModal: React.FC<ConnectModalProps> = ({ setActive, isActive, onConfirm, onDecline, userType }) => {
  const [checked, toggleChecked] = useState<boolean>(false);
  const [avatarName, avatarNameSetActive] = useState<string>('');

  return (
    <ModalBox active={isActive} setActive={setActive}>
      <div className='connect-form'>
        <h2 className='connect-form__title'>Connect to lobby</h2>
        <form>
          <div className='connect-form__wrapper'>
            <div className='connect-form__text-inputs'>
              <TextInput placeholder='Your first name' color='light' bordered />
              <TextInput placeholder='Your last name' color='light' bordered />
              <TextInput placeholder='Your job position' color='light' bordered />
              {userType === 'admin' ? (
                <TextInput placeholder='Lobby name' color='light' bordered />
              ) : (
                <Toggle checked={checked} onChange={toggleChecked}>
                  Connect as observer
                </Toggle>
              )}
            </div>
            <div className='connect-form__avatar-inputs'>
              <Avatar imgName={avatarName} size='large' className='connect-form__avatar-inputs_avatar' />
              <FileInput color='success' size='large' className='connect-form__avatar-inputs_file-input' />
            </div>
          </div>
          <div className='connect-form__buttons'>
            <Button color='success' size='large' className='connect-form__buttons_button' onClick={onConfirm}>
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
