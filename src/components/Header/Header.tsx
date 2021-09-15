import React from 'react';
import './Header.scss';
import { IoChatboxEllipses } from 'react-icons/io5';
import classNames from 'classnames';
import { ReactComponent as AppLogo } from '../../assets/app-logo.svg';
import { HeaderProps } from './models';

const Header: React.FC<HeaderProps> = ({ isAuthorized }) => {
  const classes = classNames({
    header: true,
    'header--centered': !isAuthorized,
  });

  return (
    <header className={classes}>
      <div className='header__container'>
        <div className='logo'>
          <a href='/' className='logo__link'>
            <AppLogo className='logo__img' />
            <h1 className='logo__name'>Pointing poker</h1>
          </a>
        </div>
        {isAuthorized ? <IoChatboxEllipses className='header__chat' /> : <></>}
      </div>
    </header>
  );
};

Header.defaultProps = {
  isAuthorized: false,
};

export default Header;
