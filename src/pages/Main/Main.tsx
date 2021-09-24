import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import './Main.scss';

import { ReactComponent as TeamImg } from '../../assets/team.svg';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import Button from '../../components/Button/Button';
import TextInput from '../../components/TextInput/TextInput';
import ConnectModal from '../../components/ConnectModal/ConnectModal';
import { updateSocket } from '../../redux/actions/socketActions';
import UserType from '../../types/UserType';
import validateURL from '../../api/validateURL';
import connectSocket from '../../api/connectSocket';
import { updateRoom } from '../../redux/actions/roomActions';

const Main: React.FC = () => {
  const dispatch = useDispatch();

  const [isModalActive, setActive] = useState(false);
  const [currentUserType, setUserType] = useState((): UserType => 'user');

  useEffect(() => {
    const newSocket = connectSocket();
    dispatch(updateSocket(newSocket));
  }, []);

  const onCreateBtnClick = () => {
    setUserType('admin');
    setActive(true);
  };

  const onJoinBtnClick = () => {
    setUserType('user');
  };

  const onFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const url = formData.get('url') as string;

    const res = await validateURL(url);
    if (res) {
      setActive(true);
      dispatch(updateRoom({ id: res, name: undefined, admin: undefined }));
    }
  };

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
            <Button color='success' className='main__btn main__btn--join' onClick={onJoinBtnClick} submit>
              Join
            </Button>
          </form>
          <ConnectModal userType={currentUserType} isActive={isModalActive} setActive={setActive} />
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
