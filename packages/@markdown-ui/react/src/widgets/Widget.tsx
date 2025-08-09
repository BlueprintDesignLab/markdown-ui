import React, { useEffect } from 'react';
import * as widgets from './index';

export interface WidgetProps {
  id: string;
  content: string;
}

type WidgetType = keyof typeof widgets;

export const Widget: React.FC<WidgetProps> = ({ id, content }) => {
  const parsed = JSON.parse(atob(content));
  const WidgetComponent = widgets[parsed.type as WidgetType];

  const dispatch = (detail: any) => {
    const event = new CustomEvent('widget-event', {
      detail: detail,
      bubbles: true,
      composed: true
    });
    
    // Find the closest widget container and dispatch from there
    const container = document.querySelector('.widget-container');
    if (container) {
      container.dispatchEvent(event);
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