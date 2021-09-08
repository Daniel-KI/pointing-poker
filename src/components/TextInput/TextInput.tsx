import './TextInput.scss';
import React, { useState } from 'react';
import classNames from 'classnames';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';

type InputSize = 'large' | 'small';
type InputAutocomplete = 'on' | 'off';
type InputType = 'text' | 'password';

interface TextInputProps {
  size?: InputSize;
  className?: string;
  bordered?: boolean;
  hidden?: boolean;
  showButton?: boolean;
  disabled?: boolean;
  autocomplete?: InputAutocomplete;
  placeholder?: string;
  maxlength?: number;
  value?: string;
  onChange?: (value: string) => void;
  inputValidation?: (value: string) => string;
}

const TextInput: React.FC<TextInputProps> = props => {
  const {
    bordered,
    size,
    className,
    hidden,
    showButton,
    disabled,
    autocomplete,
    placeholder,
    maxlength,
    value,
    onChange,
    inputValidation,
  } = props;
  const getTextInputType = (): InputType => {
    if (hidden) {
      return 'password';
    }
    return 'text';
  };
  const [inputType, setInputType] = useState<InputType>(getTextInputType());
  const [inputValue, setInputValue] = useState<string>(value || '');
  const classes = classNames(
    {
      'text-input': true,
      [`text-input_${size}`]: size,
      'text-input_bordered': bordered,
      [`text-input_controlled`]: showButton,
      'text-input_disabled': disabled,
    },
    className,
  );
  const toggleVisibility = () => {
    if (inputType === 'password') {
      setInputType('text');
      return;
    }
    setInputType('password');
  };
  const showValidationMessage = (input: HTMLInputElement) => {
    const message = inputValidation ? inputValidation(input.value) : '';
    input.setCustomValidity(message);
    input.reportValidity();
  };
  const onTextInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!disabled) {
      setInputValue(event.currentTarget.value);
      if (onChange) onChange(event.currentTarget.value);
      showValidationMessage(event.currentTarget);
    }
  };

  return (
    <div className={classes}>
      <div className='text-input__container'>
        <input
          className='text-input__field'
          type={inputType}
          autoComplete={autocomplete}
          disabled={disabled}
          onChange={onTextInputChange}
          value={inputValue}
          placeholder={placeholder}
          maxLength={maxlength}
          onKeyUp={(event: React.KeyboardEvent<HTMLInputElement>) => {
            showValidationMessage(event.currentTarget);
          }}
          onClick={(event: React.MouseEvent<HTMLInputElement>) => {
            showValidationMessage(event.currentTarget);
          }}
        />
        {showButton && hidden ? (
          <button className='text-input__btn' type='button' onClick={toggleVisibility}>
            {inputType === 'text' ? (
              <IoEyeOffOutline className='text-input__btn-icon' />
            ) : (
              <IoEyeOutline className='text-input__btn-icon' />
            )}
          </button>
        ) : null}
      </div>
    </div>
  );
};

TextInput.defaultProps = {
  bordered: false,
  size: undefined,
  className: undefined,
  hidden: false,
  showButton: false,
  disabled: false,
  autocomplete: 'off',
  placeholder: '',
  maxlength: undefined,
  value: '',
  onChange: undefined,
  inputValidation: undefined,
};

export default TextInput;
