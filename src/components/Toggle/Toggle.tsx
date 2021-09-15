import React from 'react';
import { ToggleProps } from './models';
import './Toggle.scss';

/*
  По умолчанию через пропсы приходит false для toggle. При изменении меняется на true.
  В родительском компоненте это выглядит следующим образом:
  const [checked, toggleChecked] = useState<boolean>(false);
  <Toggle checked={checked} onChange={toggleChecked} />
*/

const Toggle: React.FC<ToggleProps> = ({ checked, onChange }) => {
  const toggleValue = () => {
    onChange(!checked);
  };
  return (
    <div>
      <label htmlFor='toggle' className='toggle'>
        <input id='toggle' type='checkbox' checked={checked} onChange={toggleValue} />
        <span className='toggle__slider toggle__circle' />
      </label>
    </div>
  );
};

export default Toggle;
