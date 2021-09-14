import './Button.scss';
import React from 'react';
import classNames from 'classnames';
import { ButtonProps } from './models';

const Button: React.FC<ButtonProps> = ({ children, color, size, id, className, disabled, active, submit, onClick }) => {
  const classes = classNames(
    {
      btn: true,
      [`btn_${color}`]: color,
      [`btn_${size}`]: size,
      btn_active: active,
      btn_disabled: disabled,
    },
    className,
  );
  return (
    <button id={id} className={classes} onClick={onClick} type={submit ? 'submit' : 'button'} disabled={disabled}>
      <span className='btn__container'>{children}</span>
    </button>
  );
};

Button.defaultProps = {
  color: undefined,
  size: undefined,
  id: undefined,
  className: undefined,
  disabled: false,
  active: false,
  submit: false,
  onClick: undefined,
};

export default Button;
