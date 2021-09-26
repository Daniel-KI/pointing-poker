import React from 'react';
import './SpCreationCard.scss';
import { IoAdd } from 'react-icons/io5';
import classNames from 'classnames';
import { SpCreationCardProps } from './models';

const SpCreationCard: React.FC<SpCreationCardProps> = ({ onClick, size, className, id }) => {
  const classes = classNames(
    {
      'sp-creation-card': true,
      [`sp-creation-card--${size}`]: size,
    },
    className,
  );

  return (
    <button type='button' className={classes} id={id} onClick={onClick}>
      <div className='sp-creation-card__container'>
        <div className='sp-creation-card__circle'>
          <IoAdd className='sp-creation-card__icon' />
        </div>
      </div>
    </button>
  );
};

SpCreationCard.defaultProps = {
  size: undefined,
  className: undefined,
  id: undefined,
};

export default SpCreationCard;
