import React from 'react';
import './ModalBox.scss';
import { ModalBoxProps } from './models';

// В родительском компоненте указаны следующие данные:
//   const [isActive, setActive] = useState(false);
//   const modalActive = () => {
//     setActive(true);
//   };
// <ModalBox active={isActive} setActive={setActive}>content</ModalBox>

const ModalBox: React.FC<ModalBoxProps> = ({ children, active, setActive }) => {
  const outsideClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (event.target === event.currentTarget) setActive(false);
  };

  return active ? (
    <div className='overlay' onClick={outsideClick} role='presentation'>
      <div className='modal'>{children}</div>
    </div>
  ) : (
    <></>
  );
};

export default ModalBox;
