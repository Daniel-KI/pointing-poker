import './FileInput.scss';
import React, { useState } from 'react';
import classNames from 'classnames';
import { IoCloudUpload } from 'react-icons/io5';

import Color from '../../types/Color';
import Size from '../../types/Size';

interface FileInputProps {
  color?: Color;
  size?: Size;
  id?: string;
  className?: string;
  disabled?: boolean;
  name?: string;
  multiply?: boolean;
  accept?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileInput: React.FC<FileInputProps> = ({
  color,
  size,
  id,
  className,
  disabled,
  name,
  multiply,
  accept,
  onChange,
}) => {
  const [files, setFiles] = useState<FileList | null>(null);
  const label = `Choose file${multiply ? 's' : ''}`;
  const classes = classNames(
    {
      'file-input': true,
      [`file-input_${color}`]: color,
      [`file-input_${size}`]: size,
      'file-input_filled': files && files.length,
      'file-input_disabled': disabled,
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
          onChange={onInputChange}
          accept={accept}
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
  onChange: undefined,
};

export default FileInput;
