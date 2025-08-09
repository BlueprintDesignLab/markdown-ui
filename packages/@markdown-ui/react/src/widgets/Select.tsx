import React, { useState } from 'react';

export interface SelectProps {
  choices: string[];
  label?: string;
  default?: string;
  onchange: (value: string | string[]) => void;
}

export const Select: React.FC<SelectProps> = ({ 
  choices, 
  label = '', 
  default: initial, 
  onchange 
}) => {
  const [value, setValue] = useState(initial ?? choices[0]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    onchange(newValue);
  };

  return (
    <div className="selector">
      {label && <label>{label}</label>}
      <select value={value} onChange={handleChange}>
        {choices.map((choice) => (
          <option key={choice} value={choice}>
            {choice}
          </option>
        ))}
      </select>
    </div>
  );
};