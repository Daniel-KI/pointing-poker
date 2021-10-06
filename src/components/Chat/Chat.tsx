import classNames from 'classnames';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage } from '../../redux/actions/messagesActions';
import { IMessage, IState } from '../../redux/models';
import Button from '../Button/Button';
import ChatMessage from '../ChatMessage/ChatMessage';
import TextInput from '../TextInput/TextInput';
import './Chat.scss';
import { ChatProps } from './models';

const Chat: React.FC<ChatProps> = ({ className }) => {
  const dispatch = useDispatch();

  const socket = useSelector((state: IState) => state.socket);
  const messages = useSelector((state: IState) => state.messages);
  const currentUserData = useSelector((state: IState) => state.currentUser);
  const admin = useSelector((state: IState) => state.room.admin);
  const members = useSelector((state: IState) => state.users);
  const currentUser = currentUserData.role === 'admin' ? admin : members.find(user => user.id === currentUserData.id);

  const [isCurrentUser, setIsCurrentUser] = useState(() => true);
  const [isLastUserMessage, setIsLastUserMessage] = useState(() => false);
  const [isFirstMessage, setIsFirstMessage] = useState(() => true);
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
      console.log(newMessage);
      // отправка сообщения на сервер
      socket.emit('message:add', newMessage);
    }
  };

  return (
    <div className={classes}>
      <div className='chat__items'>
        {messages.map((element: IMessage, index, arr) => {
          setIsCurrentUser(element.user.id === currentUserData.id);
          if (index < arr.length - 1) {
            setIsLastUserMessage(element.user.id === arr[index + 1].user.id);
          }
          if (index > 0) {
            setIsFirstMessage(element.user.id === arr[index - 1].user.id);
          }
          return (
            <div key={index.toString()} className='chat__item'>
              <ChatMessage
                userId={element.user.id}
                name={`${element.user.firstName} ${element.user.lastName}`}
                text={element.text}
                imgName={element.user.avatar}
                className='chat__message'
                isCurrentUser={isCurrentUser}
                isLastUserMessage={isLastUserMessage}
                isFirstMessage={isFirstMessage}
              />
            </div>
          );
        })}
      </div>
      {/* TODO: добавить onSubmit функцию для отправки сообщений */}
      <form onSubmit={onMessageSubmit}>
        <TextInput
          name='text'
          placeholder='Message...'
          className='chat__input'
          value={messageText}
          onChange={onMessageChange}
        />
        <Button color='light' size='small' submit>
          Send
        </Button>
      </form>
    </div>
  );
};

export default Chat;
