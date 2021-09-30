import React from 'react';
import Avatar from '../Avatar/Avatar';
import './ChatMessage.scss';
import { MessageProps } from './models';

const ChatMessage: React.FC<MessageProps> = ({
  name,
  text,
  imgName,
  isCurrentUser,
  isLastUserMessage,
  isFirstMessage,
}) => {
  return (
    <div className={!isCurrentUser ? 'chat-message members' : 'chat-message current-user'}>
      {!isCurrentUser && isLastUserMessage ? (
        <Avatar className='chat-message__avatar' imgName={imgName} />
      ) : (
        <div className='chat-message__avatar_empty-box' />
      )}

      {!isLastUserMessage ? (
        <div className='chat-message__item'>
          {isFirstMessage ? <div className='chat-message__item_name'>{name}</div> : null}
          <div className='chat-message__item_text'>{text}</div>
        </div>
      ) : (
        [
          !isCurrentUser ? (
            <div className='chat-message__item members'>
              {isFirstMessage ? <div className='chat-message__item_name'>{name}</div> : null}
              <div className='chat-message__item_text'>{text}</div>
            </div>
          ) : (
            <div className='chat-message__item current-user'>
              {isFirstMessage ? <div className='chat-message__item_name'>{name}</div> : null}
              <div className='chat-message__item_text'>{text}</div>
            </div>
          ),
        ]
      )}
    </div>
  );
};

export default ChatMessage;
