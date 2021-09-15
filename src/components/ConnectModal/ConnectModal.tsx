import React, { useState } from 'react';
import './ConnectModal.scss';
import TextInput from '../TextInput/TextInput';
import { ConnectModalProps } from './models';
import Avatar from '../Avatar/Avatar';
import FileInput from '../FileInput/FileInput';
import Button from '../Button/Button';
import Toggle from '../Toggle/Toggle';

const ConnectModal: React.FC<ConnectModalProps> = ({ setActive }) => {
  const [checked, toggleChecked] = useState<boolean>(false);
  const [avatarName, avatarNameSetActive] = useState<string>('');

  const modalActive = () => {
    setActive(false);
  };

  return (
    <div className='connect-form'>
      <h2 className='connect-form__title'>Connect to lobby</h2>
      <form>
        <div className='connect-form__wrapper'>
          <div className='connect-form__text-inputs'>
            <TextInput placeholder='Your first name' color='light' className='ssss' bordered />
            <TextInput placeholder='Your last name' color='light' bordered />
            <TextInput placeholder='Your job position' color='light' bordered />
            <Toggle checked={checked} onChange={toggleChecked}>
              Connect as observer
            </Toggle>
          </div>
          <div className='connect-form__avatar-inputs'>
            <Avatar imgName={avatarName} size='large' className='connect-form__avatar-inputs_avatar' />
            <FileInput color='success' size='large' className='connect-form__avatar-inputs_file-input' />
          </div>
        </div>
        <div className='connect-form__buttons'>
          <Button color='success' size='large' className='connect-form__buttons_button'>
            Confirm
          </Button>
          <Button color='danger' size='large' className='connect-form__buttons_button' onClick={modalActive}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ConnectModal;
