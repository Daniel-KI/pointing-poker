import React from 'react';
import './Main.scss';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';

const Main: React.FC = () => {
  return (
    <div className='page main'>
      <Header />
      <div className='main__container' />
      <Footer />
    </div>
  );
};

export default Main;
