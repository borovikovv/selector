import { useCallback, useEffect, useState } from 'react';
import { Option } from './components/Selector/types';
import SelectedOptionsList from './components/SelectedOptionList/SelectedOptionsList';
import Selector from './components/Selector/Selector';
import logo from './assets/done.svg'
import { getRandomWord } from './util';

import './App.css'

function App() {
  const [options, setOptions] = useState<Option[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);

  useEffect(() => {
    setOptions(
      Array.from({ length: 10000 }, (_, idx) => ({
        icon: logo,
        label: `${getRandomWord(idx)} ${idx + 1}`,
        id: String(idx + 1),
        isActive: false,
      }))
    );
  }, []);

  const handleDelete = useCallback((id: string) => {
    setSelectedOptions(selectedOptions.filter(item => item.id !== id));
  }, [selectedOptions]);

  const handleSelect = useCallback((option: Option) => {
    const isOptionExist = selectedOptions.some(opt => opt.id === option.id);
    if(isOptionExist) return;
    setSelectedOptions([...selectedOptions, option]);
  }, [selectedOptions]);

  return (
    <div className='main'>
      <Selector data={options} onDelete={handleDelete} onSelect={handleSelect} />
      <SelectedOptionsList options={selectedOptions} />
    </div>
  )
}

export default App;
