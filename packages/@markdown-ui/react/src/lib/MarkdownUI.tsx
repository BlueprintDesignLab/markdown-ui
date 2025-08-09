import React, { useRef, useEffect } from 'react';
import { createRoot, Root } from 'react-dom/client';
import { Widget } from '../widgets/Widget';

export interface MarkdownUIProps {
  html: string;
  onWidgetEvent?: (data: any) => void;
}

// Custom element definition for markdown-ui-widget
class MarkdownUIWidgetElement extends HTMLElement {
  private reactRoot: Root | null = null;

  connectedCallback() {
    const id = this.getAttribute('id') || '';
    const content = this.getAttribute('content') || '';
    
    // Create a React component instance
    this.innerHTML = '';
    const div = document.createElement('div');
    this.appendChild(div);
    
    // Use React 18+ createRoot API
    this.reactRoot = createRoot(div);
    this.reactRoot.render(React.createElement(Widget, { id, content }));
  }

  disconnectedCallback() {
    if (this.reactRoot) {
      this.reactRoot.unmount();
      this.reactRoot = null;
    }
  }
}

// Register the custom element if not already registered
if (typeof window !== 'undefined' && !customElements.get('markdown-ui-widget')) {
  customElements.define('markdown-ui-widget', MarkdownUIWidgetElement);
}

export const MarkdownUI: React.FC<MarkdownUIProps> = ({ html, onWidgetEvent }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleWidgetEvent = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (onWidgetEvent) {
        onWidgetEvent(customEvent.detail);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('widget-event', handleWidgetEvent);
      
      return () => {
        container.removeEventListener('widget-event', handleWidgetEvent);
      };
    }
  }, [onWidgetEvent]);

  return (
    <div ref={containerRef} className="widget-container">
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
};