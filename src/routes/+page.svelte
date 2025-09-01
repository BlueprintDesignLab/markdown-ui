<script>
  import { MarkdownUI } from '$lib';
  import "$lib/widgets.css";
  
  let events = $state([]);
  
  function handleWidgetEvent(detail) {
    const timestamp = new Date().toLocaleTimeString();
    events = [{ timestamp, ...detail }, ...events].slice(0, 50); 
  }
  
  function clearEvents() {
    events = [];
  }
  
  const content = `# Markdown UI Widgets Demo

Welcome to the Markdown UI Widgets showcase! This demonstrates how interactive widgets can be embedded directly in markdown content.

> **Tip**: All widget interactions are captured and displayed in the events panel on the right!

## Individual Widgets

### Button Group
Choose your test mode:

\`\`\`markdown-ui-widget
{ "type": "buttonGroup", "id": "mode", "label": "Test Mode", "choices": ["Quick", "Full", "Stress"], "default": "Quick" }
\`\`\`

---

### Single Select
Select your environment:

\`\`\`markdown-ui-widget
{ "type": "select", "id": "env", "label": "Environment", "choices": ["dev", "staging", "prod"], "default": "dev" }
\`\`\`

---

### Multi Select (with checkboxes)
Choose multiple tags:

\`\`\`markdown-ui-widget
{ "type": "selectMulti", "id": "tags", "label": "Test Tags", "choices": ["performance", "accessibility", "visual", "unit", "e2e", "integration"], "default": ["unit", "e2e"] }
\`\`\`

---

### Sliders
Adjust settings:

\`\`\`markdown-ui-widget
{ "type": "slider", "id": "volume", "label": "Volume (%)", "min": 0, "max": 100, "step": 5, "default": 75 }
\`\`\`

\`\`\`markdown-ui-widget
{ "type": "slider", "id": "timeout", "label": "Timeout (s)", "min": 5, "max": 300, "default": 60 }
\`\`\`

---

### Text Input
Add your notes:

\`\`\`markdown-ui-widget
{ "type": "textInput", "id": "notes", "label": "Additional Notes", "placeholder": "Enter any additional information...", "default": "" }
\`\`\`

---

## Complete Form Example

Here's all widgets combined into a single form:

\`\`\`markdown-ui-widget
{
  "type": "form",
  "id": "demo-form",
  "submitLabel": "Submit Configuration",
  "fields": [
    { "type": "buttonGroup", "id": "mode", "label": "Test Mode", "choices": ["Quick", "Full", "Stress"], "default": "Quick" },
    { "type": "select", "id": "env", "label": "Environment", "choices": ["dev", "staging", "prod"], "default": "dev" },
    { "type": "selectMulti", "id": "tags", "label": "Test Tags", "choices": ["performance", "accessibility", "visual", "unit", "e2e", "integration"], "default": ["unit", "e2e"] },
    { "type": "slider", "id": "volume", "label": "Volume (%)", "min": 0, "max": 100, "step": 5, "default": 75 },
    { "type": "slider", "id": "timeout", "label": "Timeout (s)", "min": 5, "max": 300, "default": 60 },
    { "type": "textInput", "id": "notes", "label": "Additional Notes", "placeholder": "Enter any additional information...", "default": "" }
  ]
}
\`\`\`

`;
</script>

<div class="page-container">
  <div class="demo-container">
    <main class="demo-content">
      <MarkdownUI md={content} onwidgetevent={handleWidgetEvent} />
    </main>
  
  <aside class="demo-events">
    <div class="events-header">
      <h3>Widget Events</h3>
      <button onclick={clearEvents} class="clear-btn">Clear</button>
    </div>
    
    <div class="events-list">
      {#if events.length === 0}
        <p class="no-events">No events yet. Interact with widgets to see events here!</p>
      {/if}
      
      {#each events as event}
        <div class="event-item">
          <div class="event-header">
            <span class="event-id">ID: {event.id}</span>
            <span class="event-time">{event.timestamp}</span>
          </div>
          <div class="event-value">
            {JSON.stringify(event.value, null, 2)}
          </div>
        </div>
      {/each}
    </div>
  </aside>
  </div>
</div>

<style>
  .page-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }
  
  .demo-container {
    display: grid;
    grid-template-columns: 1fr 300px;
    gap: 2rem;
  }
  
  .demo-content {
    overflow-x: auto;
  }
  
  .demo-events {
    position: sticky;
    top: 2rem;
    height: fit-content;
    max-height: calc(100vh - 4rem);
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    overflow: hidden;
  }
  
  .events-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    border-bottom: 1px solid #e2e8f0;
    background: #ffffff;
  }
  
  .events-header h3 {
    margin: 0;
    font-size: 1rem;
    color: #374151;
  }
  
  .clear-btn {
    padding: 0.25rem 0.75rem;
    background: #ef4444;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 0.75rem;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .clear-btn:hover {
    background: #dc2626;
  }
  
  .events-list {
    padding: 1rem;
    max-height: calc(100vh - 10rem);
    overflow-y: auto;
  }
  
  .no-events {
    color: #6b7280;
    font-style: italic;
    text-align: center;
    margin: 2rem 0;
  }
  
  .event-item {
    margin-bottom: 0.75rem;
    padding: 0.75rem;
    background: #ffffff;
    border: 1px solid #e5e7eb;
    border-radius: 6px;
    font-size: 0.875rem;
  }
  
  .event-header {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    margin-bottom: 0.5rem;
  }
  
  .event-id {
    font-weight: 600;
    color: #3b82f6;
  }
  
  .event-time {
    font-size: 0.75rem;
    color: #6b7280;
  }
  
  .event-value {
    font-family: 'SF Mono', Monaco, 'Cascadia Code', monospace;
    background: #f1f5f9;
    padding: 0.5rem;
    border-radius: 4px;
    color: #475569;
    word-break: break-all;
  }
  
  @media (max-width: 768px) {
    .page-container {
      padding: 1rem;
    }
    
    .demo-container {
      grid-template-columns: 1fr;
    }
    
    .demo-events {
      position: static;
      max-height: 400px;
    }
  }
  
</style>