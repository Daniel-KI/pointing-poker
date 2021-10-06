import React from 'react';
import classNames from 'classnames';
import { ToggleProps } from './models';
import './Toggle.scss';

const Toggle: React.FC<ToggleProps> = ({ checked, onChange, children, id, className, name, inputId }) => {
  const classes = classNames(
    {
      toggle: true,
    },
    className,
  );

  const toggleValue = () => {
    onChange(!checked);
  };

  return (
    <label htmlFor={inputId} id={id} className={classes}>
      <div className='toggle__toggle-btn'>
        <input id={inputId} name={name} type='checkbox' checked={checked} onChange={toggleValue} />
        <span className='toggle__slider toggle__circle' />
      </div>
      <div className='toggle__label'>{children}</div>
    </label>
  );
};

Toggle.defaultProps = {
  children: undefined,
  id: undefined,
  className: undefined,
  inputId: 'toggle',
  name: 'toggle',
};

export default Toggle;
