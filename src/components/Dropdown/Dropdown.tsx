import React, { useState } from 'react';
import './Dropdown.scss';
import { IoCaretDown, IoCaretUp } from 'react-icons/io5';
import { DropdownProps } from './models';

const Dropdown: React.FC<DropdownProps> = ({ options, selected, setSelected }) => {
  const [isActive, setActive] = useState(false);

  const toggleClass = () => {
    setActive(!isActive);
  };

  const selectChoose = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const val = (event.target as HTMLElement).dataset.value;
    if (val) setSelected(val);
  };

  const optionOnKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !isActive) {
      setActive(isActive);
      toggleClass();
    }
    if (event.key === 'Enter' && isActive) {
      const val = (event.target as HTMLElement).dataset.value;
      if (val) setSelected(val);
      setActive(!isActive);
    }
  };

  return (
    <div className='dropdown'>
      {/*
          Данные для списка элементов поступают в виде массива через пропсы.
          В родительском компоненте это выглядит следующим образом:
          const [priority, setPriority] = useState<string | undefined>(undefined);
          <Dropdown options={['low', 'medium', 'hight']} selected={priority} setSelected={setPriority} />
      */}
      <div
        className={isActive ? 'select  is-active' : 'select'}
        onClick={toggleClass}
        onKeyPress={optionOnKeyPress}
        role='listbox'
        tabIndex={0}
      >
        <div className='select__header'>
          <span className='select__current'>{!selected ? 'Select option' : selected}</span>
          <div className='select__icon'>{isActive ? <IoCaretUp /> : <IoCaretDown />}</div>
        </div>

        <div className='select__body'>
          {options.map((element: string) => (
            <div
              key={element}
              className='select__item'
              data-value={element}
              onClick={selectChoose}
              onKeyPress={optionOnKeyPress}
              role='option'
              aria-selected
              tabIndex={0}
            >
              {element}
            </div>
          ))}

          {/* Фон ховера при наведении на элемент селекта */}
          <span className='select__item-bg' />
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
