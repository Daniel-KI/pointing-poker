import React, { useEffect } from 'react';
import './Timer.scss';
import classNames from 'classnames';
import { TimerProps } from './models';

const Timer: React.FC<TimerProps> = ({
  minutes,
  setMinutes,
  seconds,
  setSeconds,
  className,
  id,
  disabled,
  isGameOn,
  setGameOn,
}) => {
  const classes = classNames(className);

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, maxLength } = event.target;
    if (event.target.value.match('[0-9]') != null) {
      const val = value.slice(0, maxLength);
      if (+val >= 0 && +val <= 59) {
        if (event.target.dataset.type === 'minutes') {
          if (setMinutes) setMinutes(+val);
        }
        if (event.target.dataset.type === 'seconds') {
          if (setSeconds) setSeconds(+val);
        }
      }
    }
  };

  const updateTime = () => {
    if (minutes === 0 && seconds === 0) {
      if (setMinutes) setMinutes(0);
      if (setSeconds) setSeconds(0);
      if (setGameOn) setGameOn(false);
    } else if (seconds === 0) {
      if (setMinutes && minutes) setMinutes(minutes - 1);
      if (setSeconds) setSeconds(59);
    } else if (setSeconds && seconds) setSeconds(seconds - 1);
  };

  useEffect(() => {
    let token: ReturnType<typeof setTimeout>;
    if (isGameOn) {
      token = setTimeout(updateTime, 1000);
    }
    return function cleanUp() {
      clearTimeout(token);
    };
  });

  return (
    <div className={`timer ${classes}`} id={id}>
      <div className='timer__wrapper'>
        <div className='timer__wrapper_inner'>
          <div className='timer__minutes'>
            <input
              type='number'
              maxLength={2}
              className='timer__input timer__minutes_number'
              value={String(minutes).padStart(2, '0')}
              onChange={onInputChange}
              data-type='minutes'
              disabled={disabled}
            />
            <div>m</div>
          </div>
          <div className='timer__line' />
          <div className='timer__seconds'>
            <input
              type='number'
              maxLength={2}
              className='timer__input timer__seconds_number'
              value={String(seconds).padStart(2, '0')}
              onChange={onInputChange}
              data-type='seconds'
              disabled={disabled}
            />
            <div>s</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timer;
