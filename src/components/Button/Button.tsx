import './Button.scss';
import '../../utils/colors.scss';

import React, { ReactNode } from 'react';
import classNames from 'classnames';

type ButtonColor = 'primary' | 'warning' | 'danger' | 'success' | 'dark' | 'light';
type ButtonSize = 'large' | 'small';
type ButtonEvent = React.MouseEvent<HTMLButtonElement, MouseEvent>;

interface ButtonProps {
  children: ReactNode | undefined;
  color?: ButtonColor;
  size?: ButtonSize;
  className?: string;
  disabled?: boolean;
  active?: boolean;
  submit?: boolean;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = props => {
  const { children, color, size, className, disabled, active, submit, onClick } = props;
  const classes = classNames(
    {
      btn: true,
      [`btn_${color}`]: color,
      [`btn_${size}`]: size,
      btn_disabled: disabled,
      btn_active: active,
    },
    className,
  );
  const onClickAction = (event: ButtonEvent) => {
    if (disabled) {
      event.preventDefault();
      return;
    }
    if (onClick) {
      onClick();
    }
  };
  return (
    <button className={classes} onClick={onClickAction} type={submit ? 'submit' : 'button'}>
      <span className='btn__container'>{children}</span>
    </button>
  );
};

Button.defaultProps = {
  color: undefined,
  size: undefined,
  className: undefined,
  disabled: false,
  active: false,
  submit: false,
  onClick: undefined,
};

export default Button;
