import React, { useState } from 'react';
import './CreateSpCardModal.scss';
import TextInput from '../TextInput/TextInput';
import { CreateSpCardModalProps } from './models';
import Button from '../Button/Button';
import ModalBox from '../ModalBox/ModalBox';
import Toggle from '../Toggle/Toggle';

const CreateSpCardModal: React.FC<CreateSpCardModalProps> = ({ isActive, setActive, onSubmit, score }) => {
  const [isUnknown, setUnknownStatus] = useState<boolean>(false);

  const cancelBtnOnClick = () => {
    setUnknownStatus(false);
    setActive(false);
  };

  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (onSubmit) onSubmit(event);
    setUnknownStatus(false);
  };

  return (
    <ModalBox active={isActive} setActive={cancelBtnOnClick}>
      <div className='create-sp-card-modal'>
        <h2 className='create-sp-card-modal__title'>Create vote card</h2>
        <form className='create-sp-card-modal__form' onSubmit={onFormSubmit}>
          <div className='create-sp-card-modal__text-inputs'>
            <TextInput
              name='score'
              value={score}
              placeholder='Score'
              size='large'
              color='light'
              bordered
              disabled={isUnknown}
              autocomplete='on'
            />
            <Toggle name='isUnknown' checked={isUnknown} onChange={setUnknownStatus}>
              Unknown card
            </Toggle>
          </div>
          <div className='create-sp-card-modal__buttons'>
            <Button color='success' size='large' className='create-sp-card-modal__button' submit>
              Confirm
            </Button>
            <Button color='danger' size='large' className='create-sp-card-modal__button' onClick={cancelBtnOnClick}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </ModalBox>
  );
};

CreateSpCardModal.defaultProps = {
  onSubmit: undefined,
  score: '',
};

export default CreateSpCardModal;
