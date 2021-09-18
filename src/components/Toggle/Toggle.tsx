import React from 'react';
import classNames from 'classnames';
import { ToggleProps } from './models';
import './Toggle.scss';

/*
  По умолчанию через пропсы приходит false для toggle. При изменении меняется на true.
  В родительском компоненте это выглядит следующим образом:
  const [checked, toggleChecked] = useState<boolean>(false);
  <Toggle checked={checked} onChange={toggleChecked} />
*/

const Toggle: React.FC<ToggleProps> = ({ checked, onChange, children, name, id, className }) => {
  const classes = classNames(className);

  const toggleValue = () => {
    onChange(!checked);
  };

  return (
    <div>
      <label htmlFor='toggle' className='toggle'>
        <div className='toggle__toggle-btn'>
          <input id={id} className={classes} name={name} type='checkbox' checked={checked} onChange={toggleValue} />
          <span className='toggle__slider toggle__circle' />
        </div>
        <div className='toggle__label'>{children}</div>
      </label>
    </div>
  );
};

Toggle.defaultProps = {
  id: 'toggle',
  className: undefined,
  name: 'toggle',
  children: undefined,
};

export default Toggle;
