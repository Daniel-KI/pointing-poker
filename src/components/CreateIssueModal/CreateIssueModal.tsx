import React, { useState } from 'react';
import './CreateIssueModal.scss';
import TextInput from '../TextInput/TextInput';
import { CreateIssueModalProps } from './models';
import Button from '../Button/Button';
import Dropdown from '../Dropdown/Dropdown';
import ModalBox from '../ModalBox/ModalBox';
import priorityLevels from '../../constants/priorityLevels';
import PriorityLevel from '../../types/PriorityLevel';

// Родительский компонент:
// const [isActive, setActive] = useState(false);
// const modalActive = () => {
//   setActive(true);
// };

// Появление модального окна при нажатии на кнопку
//   <Button onClick={modalActive}>Modal</Button>
//   <CreateIssueModal isActive={isActive} setActive={setActive}  />

const CreateIssueModal: React.FC<CreateIssueModalProps> = ({ isActive, setActive, onSubmit }) => {
  const [priority, setPriority] = useState<string | undefined>(undefined);

  const cancelBtnOnClick = () => {
    setActive(false);
    setPriority(undefined);
  };

  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get('name') as string;
    if (priority && name) {
      onSubmit(name, priority as PriorityLevel);
      setPriority(undefined);
    }
  };

  return (
    <ModalBox active={isActive} setActive={setActive}>
      <div className='create-issue'>
        <h2 className='create-issue__title'>Create issue</h2>
        <form className='create-issue__form' onSubmit={onFormSubmit}>
          <div className='create-issue__wrapper'>
            <div className='create-issue__text-inputs'>
              <TextInput name='name' placeholder='Title' size='large' color='light' bordered />
            </div>
            <div className='create-issue__dropdown'>
              <Dropdown
                options={Object.values(priorityLevels).map(level => level.name)}
                selected={priority}
                setSelected={setPriority}
              />
            </div>
          </div>
          <div className='create-issue__buttons'>
            <Button color='success' size='large' className='create-issue__button' submit>
              Confirm
            </Button>
            <Button color='danger' size='large' className='create-issue__button' onClick={cancelBtnOnClick}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </ModalBox>
  );
};

export default CreateIssueModal;
