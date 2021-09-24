import React from 'react';
import './SpCardBack.scss';
import { IoChevronDown } from 'react-icons/io5';
import classNames from 'classnames';
import { SpCardBackProps } from './models';
import spCardBacks from '../../constants/spCardBacks';

const SpCardBack: React.FC<SpCardBackProps> = ({ type, onClick, isSelected, className, id }) => {
  const classes = classNames(
    {
      'sp-card-back': true,
      'sp-card-back--selected': isSelected,
    },
    className,
  );
  const cardBack = Object.values(spCardBacks).find(value => value.type === type) || spCardBacks.type1;

  return (
    <button className={classes} id={id} onClick={onClick} type='button'>
      <div className='sp-card-back__mark'>
        <div className='sp-card-back__circle'>
          <IoChevronDown className='sp-card-back__mark-icon' />
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
  className: undefined,
  id: undefined,
};

export default SpCardBack;
