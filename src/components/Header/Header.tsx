import React from 'react';
import './Header.scss';
import { IoChatboxEllipses } from 'react-icons/io5';
import classNames from 'classnames';
import { ReactComponent as AppLogo } from '../../assets/app-logo.svg';

interface HeaderProps {
  isAuthorized?: boolean;
}

const Header: React.FC<HeaderProps> = ({ isAuthorized }) => {
  const classes = classNames({
    header: true,
    header_centered: !isAuthorized,
  });

  return (
    <header className={classes}>
      <div className='header__container'>
        <div className='header__logo'>
          <a href='/' className='header__logo-link'>
            <AppLogo className='header__logo-img' />
            <h1 className='header__logo-name'>Pointing poker</h1>
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
