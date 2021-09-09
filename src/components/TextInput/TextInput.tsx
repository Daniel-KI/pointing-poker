import './TextInput.scss';
import React, { useState } from 'react';
import classNames from 'classnames';

type InputSize = 'large' | 'small';
type InputColor = 'primary' | 'warning' | 'danger' | 'success' | 'dark' | 'light';
type InputAutocomplete = 'on' | 'off';

interface TextInputProps {
  color?: InputColor;
  size?: InputSize;
  id?: string;
  className?: string;
  bordered?: boolean;
  disabled?: boolean;
  autocomplete?: InputAutocomplete;
  placeholder?: string;
  maxlength?: number;
  value?: string;
  required?: boolean;
  name?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInput: React.FC<TextInputProps> = props => {
  const {
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
  } = props;
  const [inputValue, setInputValue] = useState<string>(value || '');
  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.currentTarget.value);
    if (onChange) onChange(event);
  };
  const classes = classNames(
    {
      'text-input': true,
      [`text-input_${color}`]: color && bordered,
      [`text-input_${size}`]: size,
      'text-input_bordered': bordered,
      'text-input_disabled': disabled,
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
};

export default TextInput;
