import React from 'react';
import './SpVoteCard.scss';
import classNames from 'classnames';
import { SpVoteCardProps } from './models';
import SpCardFront from '../SpCardFront/SpCardFront';
import SpCardBack from '../SpCardBack/SpCardBack';

// const [isFlipped, setFlipStatus] = useState<boolean>(false);
// <SpVoteCard isFlipped={isFlipped} />

const SpVoteCard: React.FC<SpVoteCardProps> = ({ type, units, score, isFlipped, onClick, className, id }) => {
  const classes = classNames(
    {
      'sp-vote-card': true,
      'sp-vote-card--flipped': isFlipped,
    },
    className,
  );

  return (
    <div className={classes} id={id} onClick={onClick} onKeyDown={() => {}} role='presentation'>
      <div className='sp-vote-card__container'>
        <SpCardFront units={units} score={score} className='sp-vote-card__front' />
        <SpCardBack type={type || 'type1'} className='sp-vote-card__back' />
      </div>
    </div>
  );
};

SpVoteCard.defaultProps = {
  type: undefined,
  units: 'unknown',
  score: undefined,
  isFlipped: false,
  className: undefined,
  id: undefined,
};

export default SpVoteCard;
