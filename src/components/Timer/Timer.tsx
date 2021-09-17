import React, { useState } from 'react';
import './Timer.scss';
import classNames from 'classnames';
import { TimerProps } from './models';

const Timer: React.FC<TimerProps> = ({ minutes, seconds, className, id }) => {
  const classes = classNames(className);

  const [minutesValue, setMinutesValue] = useState<string>(minutes || '00');
  const [secondsValue, setSecondsValue] = useState<string>(seconds || '00');

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, maxLength } = event.target;
    if (event.target.value.match('[0-9]') != null) {
      const val = value.slice(0, maxLength);
      if (+val >= 0 && +val <= 59) {
        if (event.target.dataset.type === 'minutes') {
          setMinutesValue(val);
        }
        if (event.target.dataset.type === 'seconds') {
          setSecondsValue(val);
        }
      }
    }
  };

  return (
    <div className={`timer ${classes}`} id={id}>
      <div className='timer__wrapper'>
        <div className='timer__wrapper_inner'>
          <div className='timer__minutes'>
            <input
              type='number'
              maxLength={2}
              className='timer__input timer__minutes_number'
              value={minutesValue}
              onChange={onInputChange}
              data-type='minutes'
            />
            <div>m</div>
          </div>
          <div className='timer__line' />
          <div className='timer__seconds'>
            <input
              type='number'
              maxLength={2}
              className='timer__input timer__seconds_number'
              value={secondsValue}
              onChange={onInputChange}
              data-type='seconds'
            />
            <div>s</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timer;
