import classNames from 'classnames';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { IMessage, IState } from '../../redux/models';
import ChatMessage from '../ChatMessage/ChatMessage';
import TextInput from '../TextInput/TextInput';
import './Chat.scss';
import { ChatProps } from './models';

const Chat: React.FC<ChatProps> = ({ className }) => {
  const messages = useSelector((state: IState) => state.messages);

  const [isCurrentUser, setIsCurrentUser] = useState(true);
  const [isLastUserMessage, setIsLastUserMessage] = useState(false);
  const [isFirstMessage, setIsFirstMessage] = useState(true);
  const [messageText, setMessageText] = useState('');
  const classes = classNames(
    {
      chat: true,
    },
    className,
  );
  const onMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessageText(event.currentTarget.value);
    console.log(messageText);
  };
  return (
    <div className={classes}>
      {messages.map((element: IMessage, index, arr) => {
        // setIsLastUserMessage(element.userId === arr[index + 1].userId);
        // setIsFirstMessage(element.userId === arr[index - 1].userId);

        return (
          <div className='chat__item'>
            <ChatMessage
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

      <TextInput placeholder='Message...' className='chat__input' value={messageText} onChange={onMessageChange} />
    </div>
  );
};

export default Chat;
