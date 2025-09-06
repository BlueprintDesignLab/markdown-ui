import React, { useEffect } from 'react';
import * as widgets from './index';

export interface WidgetProps {
  id: string;
  content: string;
}

type WidgetType = keyof typeof widgets;

// Map camelCase JSON types to PascalCase component names
const typeMapping: Record<string, WidgetType> = {
  'button-group': 'ButtonGroup',
  'chart-line': 'Chart',
  'chart-bar': 'Chart',
  'chart-pie': 'Chart',
  'chart-scatter': 'Chart',
  'form': 'Form',
  'incomplete': 'Incomplete',
  'multiple-choice-question': 'MultipleChoiceQuestion',
  'select': 'Select',
  'select-multi': 'SelectMulti',
  'short-answer-question': 'ShortAnswerQuestion',
  'slider': 'Slider',
  'text-input': 'TextInput'
};

export const Widget: React.FC<WidgetProps> = ({ id, content }) => {
  const parsed = JSON.parse(atob(content));
  const componentType = typeMapping[parsed.type] || parsed.type;
  const WidgetComponent = widgets[componentType as WidgetType];

  const dispatch = (detail: any) => {
    console.log('🔥 Widget dispatch called', { id, detail });
    
    const event = new CustomEvent('widget-event', {
      detail: detail,
      bubbles: true,
      composed: true
    });
    
    // Find the custom element and bubble up to find the closest widget container
    const customElement = document.querySelector(`markdown-ui-widget[id="${id}"]`);
    console.log('🔍 Custom element found:', customElement);
    
    if (customElement) {
      const container = customElement.closest('.widget-container');
      console.log('📦 Container found:', container);
      if (container) {
        console.log('📤 Dispatching event on container');
        container.dispatchEvent(event);
      }
    } else {
      console.log('❌ No custom element found for id:', id);
    }
  };

  if (!WidgetComponent) {
    return (
      <div className="widget">
        <span style={{ color: 'red' }}>
          Unknown widget "{parsed.type}"
        </span>
      </div>
    );
  }

  return (
    <div className="widget">
      <WidgetComponent 
        {...parsed} 
        onchange={(value: any) => dispatch({ id, value })} 
      />
    </div>
  );
};