import React from 'react';
import './SpVoteCard.scss';
import classNames from 'classnames';
import { SpVoteCardProps } from './models';
import SpCardFront from '../SpCardFront/SpCardFront';
import SpCardBack from '../SpCardBack/SpCardBack';

// const [isFlipped, setFlipStatus] = useState<boolean>(false);
// <SpVoteCard isFlipped={isFlipped} />

const SpVoteCard: React.FC<SpVoteCardProps> = ({
  type,
  units,
  score,
  isFlipped,
  onClick,
  isSelected,
  size,
  className,
  id,
}) => {
  const classes = classNames(
    {
      'sp-vote-card': true,
      'sp-vote-card--flipped': isFlipped,
      'sp-vote-card--selected': isSelected,
      [`sp-vote-card--${size}`]: size,
    },
    className,
  );

  return (
    <div className={classes} id={id} onClick={onClick} onKeyDown={() => {}} role='presentation'>
      <div className='sp-vote-card__container'>
        <div className='sp-vote-card__front'>
          <SpCardFront units={units} score={score} isSelected={isSelected} size={size} />
        </div>
        <div className='sp-vote-card__back'>
          <SpCardBack type={type || 'type1'} size={size} />
        </div>
      </div>
    </div>
  );
};

SpVoteCard.defaultProps = {
  type: undefined,
  units: 'unknown',
  score: undefined,
  isFlipped: false,
  isSelected: false,
  size: undefined,
  className: undefined,
  id: undefined,
};

export default SpVoteCard;
