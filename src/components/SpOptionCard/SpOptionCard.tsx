import React from 'react';
import './SpOptionCard.scss';
import classNames from 'classnames';
import { SpOptionCardProps } from './models';
import DataControlPanel from '../DataControlPanel/DataControlPanel';
import SpCardFront from '../SpCardFront/SpCardFront';

const SpOptionCard: React.FC<SpOptionCardProps> = ({ units, score, editAction, deleteAction, size, className, id }) => {
  const classes = classNames(
    {
      'sp-option-card': true,
      [`sp-option-card--${size}`]: size,
    },
    className,
  );

  return (
    <div className={classes} id={id}>
      {editAction || deleteAction ? (
        <div className='sp-option-card__controls'>
          <DataControlPanel
            deleteAction={deleteAction}
            editAction={editAction}
            className='sp-option-card__control-panel'
          />
        </div>
      ) : null}
      <SpCardFront units={units} score={score} size={size} />
    </div>
  );
};

SpOptionCard.defaultProps = {
  units: 'unknown',
  score: undefined,
  editAction: undefined,
  deleteAction: undefined,
  size: undefined,
  className: undefined,
  id: undefined,
};

export default SpOptionCard;
