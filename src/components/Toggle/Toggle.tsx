import React from 'react';
import './Toggle.scss';
import '../../utils/colors.scss';

const Toggle: React.FC = () => {
  return (
    <div>
      <label htmlFor='toggle' className='toggle'>
        <input id='toggle' type='checkbox' />
        <span className='toggle__slider toggle__circle' />
      </label>
    </div>
  );
};

export default Toggle;
