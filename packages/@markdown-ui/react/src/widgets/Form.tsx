import React, { useEffect, useMemo, useState } from 'react';
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
  const initialData = useMemo(() => {
    const acc: Record<string, unknown> = {};
    for (const f of fields) {
      if (f.type === 'button-group') {
        acc[f.id] = f.default ?? (Array.isArray(f.choices) && f.choices.length ? f.choices[0] : undefined);
      } else if (f.type === 'select') {
        acc[f.id] = f.default ?? (Array.isArray(f.choices) && f.choices.length ? f.choices[0] : undefined);
      } else if (f.type === 'select-multi') {
        const d = f.default;
        acc[f.id] = Array.isArray(d) ? d : (d ? [d] : []);
      } else if (f.type === 'slider') {
        acc[f.id] = f.default ?? (typeof f.min === 'number' ? f.min : 0);
      } else if (f.type === 'text-input') {
        acc[f.id] = f.default ?? '';
      }
    }
    return acc;
  }, [fields]);

  const [data, setData] = useState<Record<string, unknown>>(initialData);

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

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
      case 'button-group':
        return <ButtonGroup {...commonProps} choices={field.choices ?? []} />;
      case 'select':
        return <Select {...commonProps} choices={field.choices ?? []} />;
      case 'select-multi':
        return <SelectMulti {...commonProps} choices={field.choices ?? []} />;
      case 'slider':
        return (
          <Slider 
            {...commonProps} 
            min={field.min ?? 0} 
            max={field.max ?? 100} 
          />
        );
      case 'text-input':
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