import React, { useState } from 'react';

export interface TextInputProps {
  placeholder?: string;
  label?: string;
  default?: string;
  onchange: (value: string) => void;
}

export const TextInput: React.FC<TextInputProps> = ({ 
  placeholder = '', 
  label = '', 
  default: initial = '', 
  onchange 
}) => {
  const [value, setValue] = useState(initial);

  const handleBlur = () => {
    onchange(value);
  };

  return (
    <div className="widget-button">
      {label && <label>{label}</label>}
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={handleBlur}
        placeholder={placeholder}
      />
    </div>
  );
};