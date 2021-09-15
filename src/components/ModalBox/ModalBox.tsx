import React from 'react';
import './ModalBox.scss';
import { ModalBoxProps } from './models';

// В родительском компоненте указаны следующие данные:
//   const [isActive, setActive] = useState(false);
//   const modalActive = () => {
//     setActive(true);
//   };

// И появление модального окна в зависимости от нажатия на кнопку
//   <Button onClick={modalActive}>Modal</Button>
//   {isActive ? (
//      <ModalBox setActive={setActive}>
//        {children}
//      </ModalBox>
//    ) : null}

const ModalBox: React.FC<ModalBoxProps> = ({ setActive, children }) => {
  const modalActive = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const { overlay } = (event.target as HTMLElement).dataset;
    if (overlay === 'overlay') {
      setActive(false);
    }
  };

  return (
    <div className='overlay' data-overlay='overlay' onClick={modalActive} role='presentation'>
      <div className='modal'>{children}</div>
    </div>
  );
};

export default ModalBox;
