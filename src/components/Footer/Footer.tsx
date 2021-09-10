import React from 'react';
import './Footer.scss';
import developers from '../../constants/developers';
import { ReactComponent as RsLogo } from '../../assets/rsschool-logo.svg';

const Footer: React.FC = () => {
  return (
    <footer className='footer'>
      <div className='footer__container'>
        <a href='https://rs.school/react/' className='footer__logo-wrapper'>
          <RsLogo className='footer__logo' />
        </a>
        <ul className='footer__developers-list'>
          {developers.map(developer => {
            return (
              <li className='footer__developers-item' key={developer.name}>
                <a href={developer.link} className='footer__developers-link'>
                  {developer.name}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
