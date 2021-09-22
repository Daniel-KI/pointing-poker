import React, { useState } from 'react';
import './CreateIssueModal.scss';
import TextInput from '../TextInput/TextInput';
import { CreateIssueModalProps } from './models';
import Button from '../Button/Button';
import Dropdown from '../Dropdown/Dropdown';
import ModalBox from '../ModalBox/ModalBox';
import priorityLevels from '../../constants/priorityLevels';

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
  };

  return (
    <ModalBox active={isActive} setActive={setActive}>
      <div className='create-issue'>
        <h2 className='create-issue__title'>Create issue</h2>
        <form className='create-issue__form' onSubmit={onSubmit}>
          <div className='create-issue__wrapper'>
            <div className='create-issue__text-inputs'>
              <TextInput placeholder='Title' size='large' color='light' bordered />
              <TextInput placeholder='Link' size='large' color='light' bordered />
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

CreateIssueModal.defaultProps = {
  onSubmit: undefined,
};

export default CreateIssueModal;
