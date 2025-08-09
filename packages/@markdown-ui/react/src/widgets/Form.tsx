import React, { useState } from 'react';
import { ButtonGroup } from './ButtonGroup';
import { Select } from './Select';
import { SelectMulti } from './SelectMulti';
import { Slider } from './Slider';
import { TextInput } from './TextInput';

export interface Field {
  type: string;
  id: string;
  [key: string]: any;
}

export interface FormProps {
  fields: Field[];
  submitLabel?: string;
  onchange: (values: Record<string, unknown>) => void;
}

export const Form: React.FC<FormProps> = ({ 
  fields, 
  submitLabel = 'Submit', 
  onchange 
}) => {
  const [data, setData] = useState<Record<string, unknown>>({});

  const setValue = (id: string, value: unknown) => {
    setData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = () => {
    onchange({ ...data });
  };

  const renderField = (field: Field) => {
    const commonProps = {
      ...field,
      onchange: (value: any) => setValue(field.id, value)
    };

    switch (field.type) {
      case 'buttonGroup':
        return <ButtonGroup {...commonProps} choices={field.choices ?? []} />;
      case 'select':
        return <Select {...commonProps} choices={field.choices ?? []} />;
      case 'selectMulti':
        return <SelectMulti {...commonProps} choices={field.choices ?? []} />;
      case 'slider':
        return (
          <Slider 
            {...commonProps} 
            min={field.min ?? 0} 
            max={field.max ?? 100} 
          />
        );
      case 'textInput':
        return <TextInput {...commonProps} />;
      default:
        return null;
    }
  };

  return (
    <div className="widget-form">
      {fields.map((field) => (
        <div key={field.id}>
          {renderField(field)}
        </div>
      ))}
      <button type="button" onClick={handleSubmit}>
        {submitLabel}
      </button>
    </div>
  );
};