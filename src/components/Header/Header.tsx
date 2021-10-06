import React from 'react';
import './Header.scss';
import { IoChatboxEllipses } from 'react-icons/io5';
import classNames from 'classnames';
import { ReactComponent as AppLogo } from '../../assets/app-logo.svg';
import { HeaderProps } from './models';

const Header: React.FC<HeaderProps> = ({ isAuthorized, isChatOpen, setChatOpen }) => {
  const classes = classNames({
    header: true,
    'header--centered': !isAuthorized,
    'header--open-chat': isChatOpen,
  });

  const onChatClick = () => {
    if (setChatOpen) {
      setChatOpen(!isChatOpen);
    }
  };

  return (
    <header className={classes}>
      <div className='header__container'>
        <div className='logo'>
          <a href='/' className='logo__link'>
            <AppLogo className='logo__img' />
            <h1 className='logo__name'>Pointing poker</h1>
          </a>
        </div>
        {isAuthorized ? <IoChatboxEllipses className='header__chat' onClick={onChatClick} /> : <></>}
      </div>
    </header>
  );
};

Header.defaultProps = {
  isAuthorized: false,
  isChatOpen: false,
};

export default Header;
