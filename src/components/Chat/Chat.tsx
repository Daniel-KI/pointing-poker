import classNames from 'classnames';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { IoSend } from 'react-icons/io5';
import { IMessage, IState } from '../../redux/models';
import Button from '../Button/Button';
import ChatMessage from '../ChatMessage/ChatMessage';
import TextInput from '../TextInput/TextInput';
import './Chat.scss';
import { ChatProps } from './models';

const Chat: React.FC<ChatProps> = ({ className }) => {
  const socket = useSelector((state: IState) => state.socket);
  const messages = useSelector((state: IState) => state.messages);
  const currentUserData = useSelector((state: IState) => state.currentUser);
  const admin = useSelector((state: IState) => state.room.admin);
  const members = useSelector((state: IState) => state.users);
  const currentUser = currentUserData.role === 'admin' ? admin : members.find(user => user.id === currentUserData.id);

  const [messageText, setMessageText] = useState(() => '');
  const classes = classNames(
    {
      chat: true,
    },
    className,
  );
  const onMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessageText(event.currentTarget.value);
  };

  const onMessageSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (currentUser) {
      const newMessage = { user: currentUser, text: messageText };
      socket.emit('message:add', newMessage);
    }
  };

  const checkIsNotLastMessage = (index: number, dataLength: number) => {
    return index <= dataLength - 1;
  };

  const checkIsNotFirstMessage = (index: number) => {
    return index > 0;
  };

  const checkIsSameUserMessages = (currentMessage: IMessage, NextMessage: IMessage) => {
    return NextMessage && NextMessage.user && currentMessage && currentMessage.user.id === NextMessage.user.id;
  };

  const checkIsCurrentUserMessage = (currentMessage: IMessage) => {
    return currentMessage.user.id === currentUserData.id;
  };

  const checkedMessages = messages.map((element: IMessage, index, arr) => {
    return {
      message: element,
      isCurrentUser: checkIsCurrentUserMessage(element),
      isLastUserMessage: checkIsNotLastMessage(index, arr.length) && !checkIsSameUserMessages(element, arr[index + 1]),
      isFirstMessage: checkIsNotFirstMessage(index) && !checkIsSameUserMessages(element, arr[index - 1]),
    };
  });

  return (
    <div className={classes}>
      <div className='chat__items'>
        {checkedMessages.map((element, index) => {
          return (
            <div key={index.toString()} className='chat__item'>
              <ChatMessage
                className='chat__message'
                userId={element.message.user.id}
                name={`${element.message.user.firstName} ${element.message.user.lastName}`}
                text={element.message.text}
                imgName={element.message.user.avatar}
                isCurrentUser={element.isCurrentUser}
                isLastUserMessage={element.isLastUserMessage}
                isFirstMessage={element.isFirstMessage}
              />
            </div>
          );
        })}
      </div>
      {/* TODO: добавить onSubmit функцию для отправки сообщений */}
      <form onSubmit={onMessageSubmit} className='chat__form'>
        <TextInput
          name='text'
          placeholder='Message...'
          className='chat__input'
          value={messageText}
          onChange={onMessageChange}
        />
        <Button color='light' size='small' submit>
          <IoSend />
        </Button>
      </form>
    </div>
  );
};

export default Chat;
