import React from 'react';
import { IoPerson } from 'react-icons/io5';
import './avatar.scss';
import classNames from 'classnames';

// В компоненте обязательный props с именем файла аватарки:
// <Avatar imgName='' />
// Если имени файла нет, то применяется аватарка по умолчанию.

interface AvatarProps {
  imgName: string;
}

const Avatar: React.FC<AvatarProps> = props => {
  const { imgName } = props;
  const classes = classNames({
    avatar: true,
    avatar_empty: !imgName.length,
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
