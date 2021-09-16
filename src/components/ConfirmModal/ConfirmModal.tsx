import React from 'react';
import './ConfirmModal.scss';
import { ConfirmModalProps } from './models';
import Button from '../Button/Button';
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

// <Button onClick={modalActive}>Modal</Button>
//
// <ConfirmModal isActive={isActive} setActive={setActive} onDecline={onDecline} onConfirm={onConfirm}>
//   Текст всплывающего окна
// </ConfirmModal>

const ConfirmModal: React.FC<ConfirmModalProps> = ({ setActive, isActive, children, onConfirm, onDecline }) => {
  return (
    <ModalBox active={isActive} setActive={setActive}>
      <div className='confirm'>
        <div className='confirm__text'>{children}</div>
        <div className='confirm__buttons'>
          <Button color='success' size='large' className='confirm__buttons_btn' onClick={onConfirm}>
            Yes
          </Button>
          <Button color='danger' size='large' className='confirm__buttons_btn' onClick={onDecline}>
            No
          </Button>
        </div>
      </div>
    </ModalBox>
  );
};

export default ConfirmModal;
