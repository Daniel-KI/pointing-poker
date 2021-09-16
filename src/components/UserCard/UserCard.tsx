import React from 'react';
import './UserCard.scss';
import { UserCardProps } from './models';
import Avatar from '../Avatar/Avatar';

const UserCard: React.FC<UserCardProps> = ({ name, surname, jobPosition, avatar, addAction, editAction, deleteAction }) => {
  return (
    <div className='user-card'>
      <Avatar imgName={avatar ? avatar : ''}/>
    </div>
  );
};

UserCard.defaultProps = {
  avatar: undefined,
  addAction: undefined,
  editAction: undefined,
  deleteAction: undefined,
};

export default UserCard;
