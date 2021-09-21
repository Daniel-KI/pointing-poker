import React from 'react';
import './SpCardBack.scss';
import classNames from 'classnames';
import { SpCardBackProps } from './models';
import CardBack1 from '../../assets/cardBack/card-back-1.svg';
import CardBack2 from '../../assets/cardBack/card-back-2.svg';
import CardBack3 from '../../assets/cardBack/card-back-3.svg';
import CardBack4 from '../../assets/cardBack/card-back-4.svg';
import CardBack5 from '../../assets/cardBack/card-back-5.svg';

const SpCardBack: React.FC<SpCardBackProps> = ({ cardBack, className, id }) => {
  const classes = classNames(className);

  const onMouseClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const card = event.currentTarget as HTMLElement;
    document.querySelector('.sp-card--active')?.classList.remove('sp-card--active');
    if (card.dataset.card === 'card' && !(event.target as HTMLElement).classList.contains('sp-card--active')) {
      card.classList.add('sp-card--active');
    }
  };

  return (
    <div className={`${classes} sp-card`} id={id} data-card='card' onClick={onMouseClick} role='presentation'>
      <div className='sp-card__card-active' />
      <div className='sp-card__inner-border'>
        {cardBack === 'CardBack1' ? <img src={CardBack1} alt='React Logo' className='sp-card__card-back' /> : null}
        {cardBack === 'CardBack2' ? <img src={CardBack2} alt='React Logo' className='sp-card__card-back' /> : null}
        {cardBack === 'CardBack3' ? <img src={CardBack3} alt='React Logo' className='sp-card__card-back' /> : null}
        {cardBack === 'CardBack4' ? <img src={CardBack4} alt='React Logo' className='sp-card__card-back' /> : null}
        {cardBack === 'CardBack5' ? <img src={CardBack5} alt='React Logo' className='sp-card__card-back' /> : null}
      </div>
    </div>
  );
};

export default SpCardBack;
