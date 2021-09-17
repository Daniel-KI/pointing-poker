import React from 'react';
import './UserCard.scss';
import classNames from 'classnames';
import { UserCardProps } from './models';
import Avatar from '../Avatar/Avatar';
import DataControlPanel from '../DataControlPanel/DataControlPanel';

const UserCard: React.FC<UserCardProps> = ({
  name,
  surname,
  jobPosition,
  avatar,
  deleteAction,
  color,
  className,
  id,
}) => {
  const classes = classNames(
    {
      'user-card': true,
      [`user-card--${color}`]: color,
    },
    className,
  );

  return (
    <div className={classes} id={id}>
      <Avatar imgName={avatar} className='user-card__avatar' />
      <div className='user-card__info'>
        <div className='user-card__fullname'>
          <h3 className='user-card__name'>{!name && !surname ? 'unknown' : name}</h3>
          <h3 className='user-card__surname'>{!name && !surname ? 'unknown' : surname}</h3>
        </div>
        <p className='user-card__position'>{!jobPosition ? 'unknown' : jobPosition}</p>
      </div>
      <DataControlPanel deleteAction={deleteAction} bordered />
    </div>
  );
};

UserCard.defaultProps = {
  name: undefined,
  surname: undefined,
  jobPosition: undefined,
  avatar: undefined,
  deleteAction: undefined,
  color: undefined,
  className: undefined,
  id: undefined,
};

export default UserCard;
