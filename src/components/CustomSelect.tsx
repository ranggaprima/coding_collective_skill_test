import React, { useCallback, useEffect, useState } from 'react';
import Select, { SingleValue, InputActionMeta } from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { debounce } from 'lodash';
import { fetchMedicineOptions } from '../actions/medicineAction';
import { OptionType, MedicineState } from '../types/obatType';

interface CustomSelectProps {
  placeholder: string;
  id: string;
  onChange: (selectedOption: SingleValue<OptionType>) => void;
  onInputChange?: (inputValue: string, actionMeta: InputActionMeta) => void;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ placeholder, id, onChange, onInputChange }) => {
  const dispatch = useDispatch();
  const { options = [], loading } = useSelector((state: { medicine: MedicineState }) => state.medicine);
  const [inputValue, setInputValue] = useState('');

  const debouncedFetchMedicineOptions = useCallback(
    debounce((inputValue: string) => {
      dispatch(fetchMedicineOptions(inputValue));
    }, 300),
    [dispatch]
  );

  const handleInputChange = (inputValue: string, actionMeta: InputActionMeta) => {
    setInputValue(inputValue); // Update the input value state
    if (onInputChange) {
      onInputChange(inputValue, actionMeta);
    }
  };

  // Function to handle key down event
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.shiftKey) {
      debouncedFetchMedicineOptions(inputValue); // Make the API request when Shift key is pressed
    }
  };

  useEffect(() => {
    // Initial fetch to populate options
    dispatch(fetchMedicineOptions(''));
  }, [dispatch]);

  return (
    <Select
      className="w-full text-xs"
      id={id}
      options={Array.isArray(options) ? options : []} // Ensure options is an array
      placeholder={loading ? 'Loading...' : placeholder}
      onChange={onChange}
      onInputChange={handleInputChange}
      onKeyDown={handleKeyDown} // Attach the key down event listener
      isLoading={loading}
    />
  );
};

export default CustomSelect;
