import React from 'react';
import './SpCardBack.scss';
import classNames from 'classnames';
import { SpCardBackProps } from './models';
import spCardBacks from '../../constants/spCardBacks';

const SpCardBack: React.FC<SpCardBackProps> = ({ type, onClick, className, id }) => {
  const classes = classNames(
    {
      'sp-card-back': true,
    },
    className,
  );
  const cardBack = Object.values(spCardBacks).find(value => value.type === type) || spCardBacks.type1;

  return (
    <button className={classes} id={id} onClick={onClick} type='button'>
      <div className='sp-card-back__container'>
        <img src={cardBack.image} alt={cardBack.type} className='sp-card-back__image' />
      </div>
    </button>
  );
};

SpCardBack.defaultProps = {
  onClick: undefined,
  className: undefined,
  id: undefined,
};

export default SpCardBack;
