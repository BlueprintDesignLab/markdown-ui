import React, { useState } from 'react';

export interface SelectMultiProps {
  choices: string[];
  label?: string;
  default?: string | string[];
  onchange: (value: string | string[]) => void;
}

export const SelectMulti: React.FC<SelectMultiProps> = ({ 
  choices, 
  label = '', 
  default: initial, 
  onchange 
}) => {
  const [value, setValue] = useState<string[]>(
    Array.isArray(initial) ? initial : (initial ? [initial] : [])
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const choice = e.target.value;
    let newValue: string[];
    
    if (e.target.checked) {
      newValue = [...value, choice];
    } else {
      newValue = value.filter(v => v !== choice);
    }
    
    setValue(newValue);
    onchange(newValue);
  };

  return (
    <div className="selector-multi">
      {label && <div className="selector-multi-label">{label}</div>}
      <div className="checkbox-group">
        {choices.map((choice) => (
          <label key={choice} className="checkbox-item">
            <input
              type="checkbox"
              value={choice}
              checked={value.includes(choice)}
              onChange={handleChange}
            />
            <span>{choice}</span>
          </label>
        ))}
      </div>
    </div>
  );
};