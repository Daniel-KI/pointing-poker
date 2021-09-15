import React from 'react';
import { IoPerson } from 'react-icons/io5';
import './Avatar.scss';
import classNames from 'classnames';
import { AvatarProps } from './models';

// В компоненте обязательный props с именем файла аватарки:
// <Avatar imgName='' />
// Если имени файла нет, то применяется аватарка по умолчанию.

const Avatar: React.FC<AvatarProps> = ({ imgName, size }) => {
  const classes = classNames({
    avatar: true,
    avatar_empty: !imgName.length,
    [`avatar_${size}`]: size,
  });

  return (
    <div>
      <div className={classes}>
        {imgName.length ? (
          <img src={`./${imgName}`} alt={imgName} className='avatar__img' />
        ) : (
          <IoPerson className='avatar__icon' />
        )}
      </div>
    </div>
  );
};

export default Avatar;
