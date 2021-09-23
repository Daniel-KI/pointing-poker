import React from 'react';
import './SpCreationCard.scss';
import { IoAdd } from 'react-icons/io5';
import classNames from 'classnames';
import { SpCreationCardProps } from './models';

// В родительском компоненте:

// const onAddCard = () => {
//   console.log('add card');
// };

// <AddCard onClick={onAddCard} />

const SpCreationCard: React.FC<SpCreationCardProps> = ({ onClick, className, id }) => {
  const classes = classNames(
    {
      'sp-creation-card': true,
    },
    className,
  );

  return (
    <button type='button' className={classes} id={id} onClick={onClick}>
      <div className='sp-creation-card__container'>
        <div className='sp-creation-card__circle'>
          <IoAdd className='sp-creation-card__plus-icon' />
        </div>
      </div>
    </button>
  );
};

SpCreationCard.defaultProps = {
  className: undefined,
  id: undefined,
};

export default SpCreationCard;
