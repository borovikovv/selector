import { useState, useRef, useCallback } from 'react'
import { useClickOutside } from '../../hooks/useClickOutside';

import styles from './Selector.module.css';
import { Option, SelectorProps } from './types';
import OptionsList from './OptionsList';

export default function Selector({ data, onSelect, onDelete }: SelectorProps) {
  const [searchValue, setSearchValue] = useState('');
  const [isOptionsVisible, setOptionsVisible] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, boolean>>({});

  const optionsRef = useRef(null);

  const handleVisibleOptions = (value: boolean) => {
    setOptionsVisible(value);
  }

  useClickOutside(optionsRef, () => handleVisibleOptions(false));

  const handleChangeSearchValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchValue(value);
  };

  const handleSelect = useCallback((event: React.MouseEvent<HTMLLIElement>, option: Option) => {
    event.stopPropagation();
    onSelect(option);
    setSelectedOptions({
      ...selectedOptions,
      [option.id]: true,
    });
  }, [selectedOptions, onSelect])
  
  const handleDelete = useCallback((event: React.MouseEvent<HTMLImageElement>, id: string) => {
    event.stopPropagation();
    onDelete(id);
    
    const opt = Object.assign({}, selectedOptions);
    delete opt[id];

    setSelectedOptions({...opt});
  }, [selectedOptions, onDelete]);

  return (
    <div className={styles.select}>
      <p className={styles.header}>Select</p>
      <input
        onClick={() => handleVisibleOptions(true)}
        className={styles.input}
        value={searchValue}
        onChange={handleChangeSearchValue}
        placeholder="Type for searching..."
      />
      <OptionsList
        ref={optionsRef}
        isVisible={isOptionsVisible}
        handleDeleteOption={handleDelete}
        selectedOptions={selectedOptions}
        searchValue={searchValue}
        data={data}
        onSelect={handleSelect}
      />
    </div>
  );
}