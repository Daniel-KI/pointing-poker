import React from 'react';
import './DataControlPanel.scss';
import { IoAdd, IoPencil, IoTrash } from 'react-icons/io5';
import classNames from 'classnames';
import { DataControlPanelProps } from './models';
import Button from '../Button/Button';

const DataControlPanel: React.FC<DataControlPanelProps> = ({ addAction, editAction, deleteAction, bordered }) => {
  const classes = classNames({
    'data-control-panel': true,
    'data-control-panel--bordered': bordered,
  });

  if (!addAction && !editAction && !deleteAction) return null;

  return (
    <div className={classes}>
      {addAction ? (
        <Button color='success' className='data-control-panel__btn' onClick={addAction}>
          <IoAdd />
        </Button>
      ) : null}
      {editAction ? (
        <Button color='warning' className='data-control-panel__btn' onClick={editAction}>
          <IoPencil />
        </Button>
      ) : null}
      {deleteAction ? (
        <Button color='danger' className='data-control-panel__btn' onClick={deleteAction}>
          <IoTrash />
        </Button>
      ) : null}
    </div>
  );
};

DataControlPanel.defaultProps = {
  addAction: undefined,
  editAction: undefined,
  deleteAction: undefined,
  bordered: false,
};

export default DataControlPanel;
