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

const CreateIssueModal: React.FC<CreateIssueModalProps> = ({ isActive, setActive, onSubmit, onConfirm, onDecline }) => {
  const [priority, setPriority] = useState<string | undefined>(undefined);

  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(event);
  };

  return (
    <ModalBox active={isActive} setActive={setActive}>
      <div className='create-issue'>
        <h2 className='create-issue__title'>Create issue</h2>
        <form className='create-issue__form' onSubmit={onFormSubmit}>
          <div className='create-issue__wrapper'>
            <div className='create-issue__text-inputs'>
              <TextInput placeholder='Title' size='large' color='light' bordered />
              <TextInput placeholder='Link' size='large' color='light' bordered />
            </div>
            <div className='create-issue__dropdown'>
              <Dropdown options={['low', 'medium', 'hight']} selected={priority} setSelected={setPriority} />
            </div>
          </div>
          <div className='create-issue__buttons'>
            <Button color='success' size='large' className='create-issue__button' onClick={onConfirm} submit>
              Confirm
            </Button>
            <Button color='danger' size='large' className='create-issue__button' onClick={onDecline}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </ModalBox>
  );
};

CreateIssueModal.defaultProps = {
  onDecline: undefined,
  onConfirm: undefined,
  className: undefined,
};

export default CreateIssueModal;
