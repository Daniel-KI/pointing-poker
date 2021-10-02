import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import './Main.scss';

import { ReactComponent as TeamImg } from '../../assets/team.svg';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import Button from '../../components/Button/Button';
import TextInput from '../../components/TextInput/TextInput';
import ConnectModal from '../../components/ConnectModal/ConnectModal';
import UserType from '../../types/UserType';
import validateConnection from '../../api/validateConnection';
import { updateRoom } from '../../redux/actions/roomActions';
import validateLobbyId from '../../utils/validation/validateLobbyId';

const Main: React.FC = () => {
  const dispatch = useDispatch();
  const [isPending, setPendingStatus] = useState<boolean>(false);
  const [isModalActive, setActive] = useState<boolean>(false);
  const [currentUserType, setUserType] = useState<UserType>('user');

  const onCreateBtnClick = () => {
    setUserType('admin');
    setActive(true);
  };

  const onJoinBtnClick = () => {
    setUserType('user');
  };

  const validateIdInput = (input: HTMLInputElement) => {
    const validationMessage = validateLobbyId(input.value);
    input.setCustomValidity(validationMessage);
  };

  const onIdFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.currentTarget;
    validateIdInput(input);
    input.reportValidity();
  };

  const onFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const id = formData.get('id') as string;
    const textInput = form.elements[0] as HTMLInputElement;

    const validateMessage = validateLobbyId(textInput.value);
    if (validateMessage) {
      textInput.setCustomValidity(validateMessage);
      textInput.reportValidity();
      return;
    }

    setPendingStatus(true);
    const validateConnectionMessage = await validateConnection(id);
    setPendingStatus(false);

    if (validateConnectionMessage && validateConnectionMessage !== '') {
      if (textInput) {
        textInput.setCustomValidity(validateConnectionMessage);
        textInput.reportValidity();
      }
      return;
    }

    setActive(true);
    dispatch(
      updateRoom({
        id,
        name: undefined,
        admin: undefined,
      }),
    );
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
              placeholder='Enter lobby ID here...'
              name='id'
              className='main__id-input'
              onChange={onIdFieldChange}
            />
            <Button color='primary' className='main__btn main__btn--create' onClick={onCreateBtnClick}>
              Create
            </Button>
            <Button
              color='success'
              className='main__btn main__btn--join'
              onClick={onJoinBtnClick}
              submit
              disabled={isPending}
            >
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
