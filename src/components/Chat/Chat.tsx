import classNames from 'classnames';
import React, { useState } from 'react';
import ChatMessage from '../ChatMessage/ChatMessage';
import { MessageProps } from '../ChatMessage/models';
import TextInput from '../TextInput/TextInput';
import './Chat.scss';
import { ChatProps } from './models';

const Chat: React.FC<ChatProps> = ({ chatMessage, className }) => {
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
      {chatMessage.map((element: MessageProps, index, arr) => {
        // setIsLastUserMessage(element.userId === arr[index + 1].userId);
        // setIsFirstMessage(element.userId === arr[index - 1].userId);

        return (
          <div className='chat__item'>
            <ChatMessage
              name={element.name}
              userId={element.userId}
              text={element.text}
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
