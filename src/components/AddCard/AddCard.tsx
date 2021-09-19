import React from 'react';
import './AddCard.scss';
import { IoAdd } from 'react-icons/io5';
import classNames from 'classnames';
import { AddCardProps } from './models';

// В родительском компоненте:

// const onAddCard = () => {
//   console.log('add card');
// };

// <AddCard onClick={onAddCard} />

const AddCard: React.FC<AddCardProps> = ({ className, id, onClick }) => {
  const classes = classNames(className);

  return (
    <button type='button' className={`${classes} add-card`} id={id} onClick={onClick}>
      <div className='add-card__inner-border'>
        <div className='add-card__content add-card__content_new'>
          <div className='add-card__circle add-card__circle_plus'>
            <IoAdd className='add-card__plus-icon' />
          </div>
        </div>
      </div>
    </button>
  );
};

export default AddCard;
