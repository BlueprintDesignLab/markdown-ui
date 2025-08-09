import React, { useState } from 'react';

export interface ButtonGroupProps {
  choices: string[];
  label?: string;
  default?: string;
  onchange: (value: string) => void;
}

export const ButtonGroup: React.FC<ButtonGroupProps> = ({ 
  choices, 
  label = '', 
  default: initial, 
  onchange 
}) => {
  const [selected, setSelected] = useState(initial ?? choices[0]);

  const handleClick = (choice: string) => {
    setSelected(choice);
    onchange(choice);
  };

  return (
    <div className="widget-button-group">
      {label && <label>{label}</label>}
      <div role="group" aria-label={label}>
        {choices.map((choice) => (
          <button
            key={choice}
            type="button"
            aria-pressed={selected === choice}
            onClick={() => handleClick(choice)}
          >
            {choice}
          </button>
        ))}
      </div>
    </div>
  );
};