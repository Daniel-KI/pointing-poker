import React from 'react';
import './IssueCreationCard.scss';
import classNames from 'classnames';
import { IssueCreationCardProps } from './models';
import DataControlPanel from '../DataControlPanel/DataControlPanel';

const IssueCreationCard: React.FC<IssueCreationCardProps> = ({ addAction, label, color, className, id }) => {
  const classes = classNames(
    {
      'issue-creation-card': true,
      [`issue-creation-card--${color}`]: color,
    },
    className,
  );

  return (
    <div className={classes} id={id}>
      <h3 className='issue-creation-card__label'>{label}</h3>
      <DataControlPanel addAction={addAction} bordered />
    </div>
  );
};

IssueCreationCard.defaultProps = {
  label: 'Create new issue',
  color: undefined,
  className: undefined,
  id: undefined,
};

export default IssueCreationCard;
