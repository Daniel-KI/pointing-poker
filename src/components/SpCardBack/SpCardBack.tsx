import React from 'react';
import './SpCardBack.scss';
import { IoChevronDownCircle } from 'react-icons/io5';
import classNames from 'classnames';
import { SpCardBackProps } from './models';
import spCardBacks from '../../constants/spCardBacks';

const SpCardBack: React.FC<SpCardBackProps> = ({ type, onClick, isSelected, size, className, id }) => {
  const classes = classNames(
    {
      'sp-card-back': true,
      [`sp-card-back--${size}`]: size,
      'sp-card-back--selected': isSelected,
    },
    className,
  );
  const cardBack = spCardBacks.find(value => value.type === type) || spCardBacks[0];

  return (
    <button className={classes} id={id} onClick={onClick} type='button'>
      <div className='sp-card-back__mark'>
        <div className='sp-card-back__circle'>
          <IoChevronDownCircle className='sp-card-back__mark-icon' />
        </div>
      </div>
      <div className='sp-card-back__container'>
        <img src={cardBack.image} alt={cardBack.type} className='sp-card-back__image' />
      </div>
    </button>
  );
};

SpCardBack.defaultProps = {
  onClick: undefined,
  isSelected: false,
  size: undefined,
  className: undefined,
  id: undefined,
};

export default SpCardBack;
