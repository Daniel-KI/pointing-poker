import './TextInput.scss';
import React, { useState } from 'react';
import classNames from 'classnames';
import { TextInputProps } from './models';

const TextInput: React.FC<TextInputProps> = ({
  color,
  size,
  id,
  className,
  bordered,
  disabled,
  autocomplete,
  placeholder,
  maxlength,
  value,
  required,
  name,
  onChange,
  onInvalid,
}) => {
  const [inputValue, setInputValue] = useState<string>(value || '');
  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.currentTarget.value);
    if (onChange) onChange(event);
  };
  const classes = classNames(
    {
      'text-input': true,
      [`text-input--${size}`]: size,
      'text-input--bordered': bordered,
      [`text-input--${color}`]: color && bordered,
      'text-input--disabled': disabled,
    },
    className,
  );

  return (
    <input
      id={id}
      className={classes}
      type='text'
      autoComplete={autocomplete}
      disabled={disabled}
      onChange={onInputChange}
      onInvalid={onInvalid}
      placeholder={placeholder}
      maxLength={maxlength}
      value={inputValue}
      required={required}
      name={name}
    />
  );
};

TextInput.defaultProps = {
  color: undefined,
  size: undefined,
  id: undefined,
  className: undefined,
  bordered: false,
  disabled: false,
  autocomplete: 'off',
  placeholder: '',
  maxlength: undefined,
  value: '',
  required: false,
  name: '',
  onChange: undefined,
  onInvalid: undefined,
};

export default TextInput;
