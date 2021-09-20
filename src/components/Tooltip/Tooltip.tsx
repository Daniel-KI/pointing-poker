import './Tooltip.scss';
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { TooltipProps } from './models';

// valid status - статус валидности input
// errorMessage - сообщение об ошибке input

// const [validStatus, setValidStatus] = useState(true);
// const [errorMessage, setErrorMessage] = useState('');

// Функция валидации input

// const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//   if (event.currentTarget.value === 'qwe') {
//     setErrorMessage('QWE string here...');
//     setValidStatus(false);
//     return;
//   }
//   setValidStatus(true);
//   setErrorMessage('');
// };

// Layout

// <Tooltip message={errorMessage} visible={!validStatus}>
//   <TextInput onChange={onInputChange} bordered color='dark' />
// </Tooltip>

// Basic onHover Tooltip
//
// <Tooltip message='some tooltip text'>
//   <p>Tooltip</p>
// </Tooltip>

const Tooltip: React.FC<TooltipProps> = ({ children, message, visible, color, className, id }) => {
  const [visibility, setVisibility] = useState<boolean>(false);
  const [tooltipMessage, setTooltipMessage] = useState<string>(message);

  useEffect(() => {
    if (visible && message) {
      setTooltipMessage(message);
      setVisibility(true);
    }
    if (!message) {
      setVisibility(false);
      setTooltipMessage('');
    }
  }, [message, visible]);

  const classes = classNames(
    {
      tooltip: true,
      [`tooltip--hidden`]: visibility !== true,
      [`tooltip--${color}`]: color,
    },
    className,
  );

  const handleFocus = (event: React.FocusEvent<HTMLDivElement>) => {
    if (event.currentTarget.contains(event.target) && tooltipMessage) {
      setVisibility(true);
    }
  };

  const handleBlur = () => {
    setVisibility(false);
  };

  const onMouseEnter = () => {
    if (tooltipMessage) setVisibility(true);
  };

  const onMouseLeave = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!event.currentTarget.contains(document.activeElement)) setVisibility(false);
  };

  return (
    <div id={id} className={classes}>
      <div className='tooltip__content'>
        <p className='tooltip__message'>{tooltipMessage}</p>
        <div className='tooltip__triangle' />
      </div>
      <div
        className='tooltip__target'
        onFocus={handleFocus}
        onBlur={handleBlur}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {children}
      </div>
    </div>
  );
};

Tooltip.defaultProps = {
  visible: false,
  color: undefined,
  className: undefined,
  id: undefined,
};

export default Tooltip;
