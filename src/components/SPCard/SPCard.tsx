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
// <SPCard scoreType='SP' cardScore='15' cardType='default' editAction={editAction} deleteAction={deleteAction} />

const SPCard: React.FC<SPCardProps> = ({ scoreType, cardScore, cardType, editAction, deleteAction, className, id }) => {
  const classes = classNames(className);

  const onMouseClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const card = event.currentTarget as HTMLElement;
    if (card.dataset.card === 'card') {
      card.classList.toggle('sp-card--active');
    }
  };

  return (
    <div className={`${classes} sp-card`} id={id} onClick={onMouseClick} data-card='card' role='presentation'>
      <div className='sp-card__card-edit'>
        <DataControlPanel deleteAction={deleteAction} className='sp-card__card-edit_edit-btn' />
        <DataControlPanel editAction={editAction} className='sp-card__card-edit_edit-btn' />
      </div>
      <div className='sp-card__inner-border'>
        {cardType === 'default' ? (
          <div className='sp-card__content'>
            <div className='sp-card__type-top'>
              <div>{scoreType}</div>
            </div>
            <div className='sp-card__card-score'>{cardScore}</div>
            <div className='sp-card__type-bottom'>{scoreType}</div>
          </div>
        ) : null}
        {cardType === undefined ? (
          <div className='sp-card__content'>
            <div className='sp-card__type-top'>
              <div>Unknown</div>
            </div>
            <div className='sp-card__circle sp-card__circle--question'>
              <IoHelp className='sp-card__question-icon' />
            </div>
            <div className='sp-card__type-bottom'>Unknown</div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default SPCard;
