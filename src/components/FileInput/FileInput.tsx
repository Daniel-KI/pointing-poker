import './FileInput.scss';
import React, { useState } from 'react';
import classNames from 'classnames';
import { IoCloudUpload } from 'react-icons/io5';
import { FileInputProps } from './models';

const FileInput: React.FC<FileInputProps> = ({
  color,
  size,
  id,
  className,
  disabled,
  name,
  multiply,
  accept,
  required,
  onChange,
}) => {
  const [files, setFiles] = useState<FileList | null>(null);
  const label = `Choose file${multiply ? 's' : ''}`;
  const classes = classNames(
    {
      'file-input': true,
      [`file-input--${color}`]: color,
      [`file-input--${size}`]: size,
      'file-input--filled': files && files.length,
      'file-input--disabled': disabled,
    },
    className,
  );

  const getFilesNamesLabel = (): string => {
    if (!files || !files.length) return label;
    let namesList = '';
    for (let i = 0; i < files.length; i += 1) {
      const fileName = files[i].name;
      if (namesList) {
        namesList = namesList.concat(', ');
      }
      namesList = namesList.concat(fileName);
    }
    return namesList;
  };

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.currentTarget.blur();
    setFiles(event.currentTarget.files);
    if (onChange) onChange(event);
  };

  return (
    <label className={classes} id={id} htmlFor={name}>
      <span className='file-input__container'>
        <span className='file-input__label'>{getFilesNamesLabel()}</span>
        <IoCloudUpload className='file-input__icon' />
        <input
          className='file-input__field'
          id={name}
          name={name}
          type='file'
          disabled={disabled}
          multiple={multiply}
          accept={accept}
          required={required}
          onChange={onInputChange}
        />
      </span>
    </label>
  );
};

FileInput.defaultProps = {
  color: undefined,
  size: undefined,
  id: undefined,
  className: undefined,
  disabled: false,
  multiply: false,
  name: undefined,
  accept: undefined,
  required: false,
  onChange: undefined,
};

export default FileInput;
