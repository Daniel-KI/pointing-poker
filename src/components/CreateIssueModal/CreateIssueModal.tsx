import React, { useState } from 'react';
import './CreateIssueModal.scss';
import TextInput from '../TextInput/TextInput';
import { CreateIssueModalProps } from './models';
import Button from '../Button/Button';
import Dropdown from '../Dropdown/Dropdown';

const CreateIssueModal: React.FC<CreateIssueModalProps> = ({ setActive }) => {
  const [priority, setPriority] = useState<string | undefined>(undefined);

  const modalActive = () => {
    setActive(false);
  };

  return (
    <div className='create-issue'>
      <h2 className='create-issue__title'>Create issue</h2>
      <form className='create-issue__form'>
        <div className='create-issue__wrapper'>
          <div className='create-issue__text-inputs'>
            <TextInput placeholder='Title' size='large' color='light' bordered />
            <TextInput placeholder='Link' size='large' color='light' bordered />
          </div>
          <div className='create-issue__dropdown'>
            <Dropdown
              options={['low', 'medium', 'hight']}
              selected={priority}
              setSelected={setPriority}
              className='create-issue__dropdown_input'
            />
          </div>
        </div>
        <div className='create-issue__buttons'>
          <Button color='success' size='large' className='create-issue__buttons_button'>
            Confirm
          </Button>
          <Button color='danger' size='large' className='create-issue__buttons_button' onClick={modalActive}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateIssueModal;
