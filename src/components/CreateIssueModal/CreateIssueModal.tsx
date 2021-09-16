import React, { useState } from 'react';
import './CreateIssueModal.scss';
import TextInput from '../TextInput/TextInput';
import { CreateIssueModalProps } from './models';
import Button from '../Button/Button';
import Dropdown from '../Dropdown/Dropdown';
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
//   <CreateIssueModal isActive={isActive} setActive={setActive} onDecline={onDecline} onConfirm={onConfirm} />

const CreateIssueModal: React.FC<CreateIssueModalProps> = ({ setActive, isActive, onConfirm, onDecline }) => {
  const [priority, setPriority] = useState<string | undefined>(undefined);

  return (
    <ModalBox active={isActive} setActive={setActive}>
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
            <Button color='success' size='large' className='create-issue__buttons_button' onClick={onConfirm}>
              Confirm
            </Button>
            <Button color='danger' size='large' className='create-issue__buttons_button' onClick={onDecline}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </ModalBox>
  );
};

export default CreateIssueModal;
