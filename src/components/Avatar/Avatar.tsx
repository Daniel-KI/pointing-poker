import React from 'react';
import { IoPerson } from 'react-icons/io5';
import './Avatar.scss';
import classNames from 'classnames';
import { AvatarProps } from './models';

const Avatar: React.FC<AvatarProps> = ({ imgName, size, className, id }) => {
  const classes = classNames(
    {
      avatar: true,
      'avatar--empty': !imgName,
      [`avatar--${size}`]: size,
    },
    className,
  );

  return (
    <div className={classes} id={id}>
      {imgName ? (
        <img src={imgName} alt='User avatar' className='avatar__img' />
      ) : (
        <IoPerson className='avatar__icon' />
      )}
    </div>
  );
};

Avatar.defaultProps = {
  imgName: undefined,
  size: undefined,
  className: undefined,
  id: undefined,
};

export default Avatar;
