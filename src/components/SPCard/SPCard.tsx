import React from 'react';
import './SPCard.scss';
import { IoHelp, IoPencilSharp, IoAdd } from 'react-icons/io5';
import { SPCardProps } from './models';

// В родительском компоненте:

// Чтобы была карта Unknown:
// <SPCard />

// Чтобы была стандартная карта с цифрами:
// <SPCard scoreType='SP' cardScore='15' cardType='default' />

// Чтобы была карта "добавить новую карту":
// <SPCard cardType='new' />

const SPCard: React.FC<SPCardProps> = ({ scoreType, cardScore, cardType }) => {
  return (
    <div className='sp-card'>
      <div className='sp-card__inner-border'>
        {cardType === undefined ? (
          <div className='sp-card__content'>
            <div className='sp-card__score-type_top'>
              <div>Unknown</div>
              <div className='sp-card__edit-btn'>
                <IoPencilSharp className='sp-card__edit-btn_pencil' />
              </div>
            </div>
            <div className='sp-card__circle sp-card__circle_question'>
              <IoHelp className='sp-card__question-icon' />
            </div>
            <div className='sp-card__score-type_bottom'>Unknown</div>
          </div>
        ) : null}
        {cardType === 'default' ? (
          <div className='sp-card__content'>
            <div className='sp-card__score-type_top'>
              <div>{scoreType}</div>
              <div className='sp-card__edit-btn'>
                <IoPencilSharp className='sp-card__edit-btn_pencil' />
              </div>
            </div>
            <div className='sp-card__card-score'>{cardScore}</div>
            <div className='sp-card__score-type_bottom'>{scoreType}</div>
          </div>
        ) : null}
        {cardType === 'new' ? (
          <div className='sp-card__content sp-card__content_new'>
            <div className='sp-card__circle sp-card__circle_plus'>
              <IoAdd className='sp-card__question-icon' />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default SPCard;
