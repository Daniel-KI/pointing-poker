import React from 'react';
import './ConfirmModal.scss';
import { ConfirmModalProps } from './models';
import Button from '../Button/Button';
import ModalBox from '../ModalBox/ModalBox';

const ConfirmModal: React.FC<ConfirmModalProps> = ({ setActive, isActive, children }) => {
  const cancelClick = () => {
    setActive(false);
  };

  return (
    <ModalBox active={isActive} setActive={setActive}>
      <div className='confirm'>
        <div className='confirm__text'>{children}</div>
        <div className='confirm__buttons'>
          <Button color='success' size='large' className='confirm__buttons_btn'>
            Yes
          </Button>
          <Button color='danger' size='large' className='confirm__buttons_btn' onClick={cancelClick}>
            No
          </Button>
        </div>
      </div>
    </ModalBox>
  );
};

export default ConfirmModal;
