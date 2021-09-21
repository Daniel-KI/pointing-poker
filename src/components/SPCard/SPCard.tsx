import React from 'react';
import './SPCard.scss';
import { IoHelp } from 'react-icons/io5';
import classNames from 'classnames';
import { SPCardProps } from './models';
import DataControlPanel from '../DataControlPanel/DataControlPanel';

// В родительском компоненте:

// Чтобы была карта Unknown:
// <SPCard editAction={editAction} deleteAction={deleteAction} />

// Чтобы была стандартная карта с цифрами:
// <SPCard scoreType='SP' cardScore='15' editAction={editAction} deleteAction={deleteAction} />

// const editAction = () => {
//   alert('edit');
// };

// const deleteAction = () => {
//   alert('del');
// };

const SPCard: React.FC<SPCardProps> = ({ scoreType, cardScore, editAction, deleteAction, className, id }) => {
  const classes = classNames(
    {
      'sp-card': true,
    },
    className,
  );

  return (
    <div className={classes} id={id} data-card='card'>
      <div className='sp-card__container'>
        <div className='sp-card__controls'>
          <DataControlPanel
            deleteAction={deleteAction}
            editAction={editAction}
            className='sp-card__card-edit_edit-btn'
          />
        </div>
        <p className='sp-card__top-text'>{scoreType}</p>
        <div className='sp-card__body'>
          {cardScore ? (
            <p className='sp-card__score'>{cardScore}</p>
          ) : (
            <div className='sp-card__circle'>
              <IoHelp className='sp-card__question-icon' />
            </div>
          )}
        </div>
        <div className='sp-card__bottom-text'>{scoreType}</div>
      </div>
    </div>
  );
};

SPCard.defaultProps = {
  className: undefined,
  id: undefined,
  editAction: undefined,
  deleteAction: undefined,
  scoreType: 'unknown',
  cardScore: undefined,
};

export default SPCard;
