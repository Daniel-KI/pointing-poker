import React from 'react';
import './IssueCard.scss';
import classNames from 'classnames';
import { IssueCardProps } from './models';
import DataControlPanel from '../DataControlPanel/DataControlPanel';

const IssueCard: React.FC<IssueCardProps> = ({
  name,
  priority,
  editAction,
  deleteAction,
  color,
  className,
  id,
  onClick,
}) => {
  const classes = classNames(
    {
      'issue-card': true,
      [`issue-card--${color}`]: color,
    },
    className,
  );

  return (
    <div className={classes} id={id}>
      <div className='issue-card__info'>
        <h3 className='issue-card__name' onClick={onClick} onKeyDown={() => {}} role='presentation'>
          Issue: {!name ? 'unknown' : name}
        </h3>
        <h3 className='issue-card__priority'>{!priority ? 'unknown' : priority}</h3>
      </div>
      <DataControlPanel editAction={editAction} deleteAction={deleteAction} bordered />
    </div>
  );
};

IssueCard.defaultProps = {
  name: undefined,
  priority: undefined,
  editAction: undefined,
  deleteAction: undefined,
  color: undefined,
  className: undefined,
  id: undefined,
};

export default IssueCard;
