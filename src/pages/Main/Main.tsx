import React from 'react';
import './Main.scss';
import { ReactComponent as TeamImg } from '../../assets/team.svg';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import Button from '../../components/Button/Button';

const Main: React.FC = () => {
  return (
    <div className='main'>
      <Header />
      <div className='main__wrapper'>
        <div className='main__container'>
          <h2 className='main__title'>Plan your project</h2>
          <p className='main__description'>
            Planning poker is a consensus-based, gamified technique for estimating, mostly used for timeboxing in Agile
            principles.
          </p>
          <div className='main__interactions'>
            <Button color='primary' className='main__btn'>
              Create
            </Button>
            <Button color='success' className='main__btn'>
              Join
            </Button>
          </div>
          <div className='main__image-container'>
            <TeamImg className='main__image' />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Main;
