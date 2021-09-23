import React from 'react';
import './SpCardFront.scss';
import { IoHelp } from 'react-icons/io5';
import classNames from 'classnames';
import { SpCardFrontProps } from './models';

const SpCardFront: React.FC<SpCardFrontProps> = ({ units, score, onClick, className, id }) => {
  const classes = classNames(
    {
      'sp-card-front': true,
    },
    className,
  );

  return (
    <button className={classes} id={id} type='button' onClick={onClick}>
      <div className='sp-card-front__container'>
        <p className='sp-card-front__top-text'>{units}</p>
        <div className='sp-card-front__content'>
          {score ? (
            <p className='sp-card-front__score'>{score}</p>
          ) : (
            <div className='sp-card-front__circle'>
              <IoHelp className='sp-card-front__icon' />
            </div>
          )}
        </div>
        <p className='sp-card-front__bottom-text'>{units}</p>
      </div>
    </button>
  );
};

SpCardFront.defaultProps = {
  units: 'unknown',
  score: undefined,
  onClick: undefined,
  className: undefined,
  id: undefined,
};

export default SpCardFront;
