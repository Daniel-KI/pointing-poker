import React from 'react';
import './Main.scss';
import { ReactComponent as TeamImg } from '../../assets/team.svg';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import Button from '../../components/Button/Button';
import TextInput from '../../components/TextInput/TextInput';

const Main: React.FC = () => {
  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const onCreateBtnClick = () => {};

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
          <form className='main__connection' onSubmit={onFormSubmit}>
            <TextInput
              bordered
              color='light'
              placeholder='Enter lobby url here...'
              name='url'
              className='main__url-input'
              required
            />
            <Button color='primary' className='main__btn main__btn--create' onClick={onCreateBtnClick}>
              Create
            </Button>
            <Button color='success' className='main__btn main__btn--join' submit>
              Join
            </Button>
          </form>
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
