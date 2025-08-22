import React, { useState } from 'react';

export interface SliderProps {
  min: number;
  max: number;
  step?: number;
  label?: string;
  default?: number;
  onchange: (value: number) => void;
}

export const Slider: React.FC<SliderProps> = ({ 
  min, 
  max, 
  step = 1, 
  label = '', 
  default: initial = min, 
  onchange 
}) => {
  const [value, setValue] = useState(initial);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setValue(newValue);
  };

  const handleComplete = () => {
    onchange(value);
  };

  return (
    <div className="widget-slider">
      {label && <label>{label}</label>}
      <div className="slider-container">
        <div className="slider-values">
          <span className="min-value">{min}</span>
          <span className="current-value">{value}</span>
          <span className="max-value">{max}</span>
        </div>
        <input
          type="range"
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={handleChange}
          onMouseUp={handleComplete}
          onTouchEnd={handleComplete}
        />
      </div>
    </div>
  );
};