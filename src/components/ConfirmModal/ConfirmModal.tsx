import React from 'react';
import './ConfirmModal.scss';
import { ConfirmModalProps } from './models';
import Button from '../Button/Button';

const ConfirmModal: React.FC<ConfirmModalProps> = ({ setActive, children }) => {
  const modalActive = () => {
    setActive(false);
  };

  return (
    <div className='confirm'>
      <div className='confirm__text'>{children}</div>
      <div className='confirm__buttons'>
        <Button color='success' size='large' className='confirm__buttons_btn'>
          Yes
        </Button>
        <Button color='danger' size='large' className='confirm__buttons_btn' onClick={modalActive}>
          No
        </Button>
      </div>
    </div>
  );
};

export default ConfirmModal;
