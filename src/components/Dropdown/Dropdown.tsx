import React, { useState } from 'react';
import './Dropdown.scss';
import '../../utils/colors.scss';
import { IoCaretDown, IoCaretUp } from 'react-icons/io5';

const Dropdown: React.FC = () => {
  const [isActive, setActive] = useState(false);
  const [selectValue, setSelectValue] = useState<string | undefined>(undefined);

  const toggleClass = () => {
    setActive(!isActive);
  };

  const selectChoose = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const val = (event.target as HTMLElement).dataset.value;
    setSelectValue(val);
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !isActive) {
      setActive(isActive);
      toggleClass();
    }
    if (event.key === 'Enter' && isActive) {
      setSelectValue((event.target as HTMLElement).dataset.value);
      setActive(!isActive);
    }
  };

  return (
    <div className='dropdown'>
      {/*
      Так как возможности для стилизации селекта сильно ограничены, добавила селект, невидимый на странице,
      который, возможно, понадобится для обработки данных. Если это лишнее, то данный селект можно удалить,
      оставив лишь основной с дизайном.
      */}
      <select name='' id='dropdownSelect' className='dropdown__select'>
        <option value={selectValue}>{selectValue}</option>
      </select>

      {/* Селект с выпадающим списком, стилизованный в соответствии с дизайном в фигме */}
      <div
        className={isActive ? 'select  is-active' : 'select'}
        onClick={toggleClass}
        onKeyPress={handleKeyPress}
        role='listbox'
        tabIndex={0}
      >
        <div className='select__header'>
          <span className='select__current'>{selectValue === undefined ? 'Select priority' : selectValue}</span>
          <div className='select__icon'>{isActive ? <IoCaretUp /> : <IoCaretDown />}</div>
        </div>

        <div className='select__body'>
          <div
            className='select__item'
            data-value='Low'
            onClick={selectChoose}
            onKeyPress={handleKeyPress}
            role='option'
            aria-selected
            tabIndex={0}
          >
            Low
          </div>
          <div
            className='select__item'
            data-value='Medium'
            onClick={selectChoose}
            onKeyPress={handleKeyPress}
            role='option'
            aria-selected
            tabIndex={0}
          >
            Medium
          </div>
          <div
            className='select__item'
            data-value='Hight'
            onClick={selectChoose}
            onKeyPress={handleKeyPress}
            role='option'
            aria-selected
            tabIndex={0}
          >
            Hight
          </div>

          {/* Фон ховера при наведении на элемент селекта */}
          <div className='select__item-bg' />
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
