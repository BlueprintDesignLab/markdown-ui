<script>
  import { MarkdownUI } from '$lib';

  import { Marked } from 'marked';
  import { markedUiExtension } from "@markdown-ui/marked-ext";
  
  const marked = new Marked();
  marked.use(markedUiExtension); 
  
  import "$lib/widgets.css";
  import CodeMirror from 'svelte-codemirror-editor';
  import { markdown } from '@codemirror/lang-markdown';
  import { EditorView } from '@codemirror/view';
  import WidgetEvents from '$lib/WidgetEvents.svelte';
  
  let events = $state([]);
  
  let markdownContent = $state(`# Interactive Markdown Editor

Welcome to the interactive markdown editor! Type your markdown in the editor on the left and see the UI render in real-time on the right.

## Try Some Widgets

Edit this markdown to experiment with different widgets:

### Button Group Example

\`\`\`markdown-ui-widget
{ "type": "button-group", "id": "example-buttons", "label": "Choose Option", "choices": ["Option A", "Option B", "Option C"], "default": "Option A" }
\`\`\`

Or with DSL syntax:

\`\`\`markdown-ui-widget
button-group example-buttons-dsl [OptionA OptionB OptionC] OptionA
\`\`\`

### Form Example

\`\`\`markdown-ui-widget
{
  "type": "form",
  "id": "sample-form",
  "submitLabel": "Submit Form",
  "fields": [
    { "type": "select", "id": "priority", "label": "Priority", "choices": ["Low", "Medium", "High"], "default": "Medium" },
    { "type": "slider", "id": "urgency", "label": "Urgency Level", "min": 1, "max": 10, "default": 5 },
    { "type": "text-input", "id": "description", "label": "Description", "placeholder": "Describe your request..." }
  ]
}
\`\`\`

Or with DSL syntax:

\`\`\`markdown-ui-widget
form sample-form-dsl "Submit Form"
  select priority [Low Medium High] Medium
  slider urgency 1 10 1 5
  text-input description "Description" "Describe your request..."
\`\`\`

### Multi-Select Example

\`\`\`markdown-ui-widget
{ "type": "select-multi", "id": "features", "label": "Select Features", "choices": ["Auto-save", "Live Preview", "Export PDF", "Collaboration"], "default": ["Live Preview"] }
\`\`\`

Or with DSL syntax:

\`\`\`markdown-ui-widget
select-multi features [Auto-save "Live Preview" "Export PDF" Collaboration] ["Live Preview"]
\`\`\`

## Markdown Tips

- Use **bold** and *italic* text
- Create [links](https://example.com)
- Add \`inline code\`
- Use > for blockquotes
- Create lists with - or 1.

### Code Blocks

\`\`\`javascript
function hello(name) {
  return \`Hello, \${name}!\`;
}
\`\`\`

### Tables

| Feature | Supported | Notes |
|---------|-----------|--------|
| Widgets | ✅ | Full support |
| Tables | ✅ | Standard markdown |
| Code | ✅ | Syntax highlighting |

---

**Happy editing!** Try modifying this content or creating your own widgets.
`);
  
  function handleWidgetEvent(detail) {
    const timestamp = new Date().toLocaleTimeString();
    events = [{ timestamp, ...detail }, ...events].slice(0, 50);
  }
  
  function clearEvents() {
    events = [];
  }
  
  
  function loadExample(example) {
    switch(example) {
      case 'widgets':
        markdownContent = `# Widget Showcase

This example demonstrates various interactive widgets.

## Individual Widgets

### JSON Format

\`\`\`markdown-ui-widget
{ "type": "text-input", "id": "username", "label": "Username", "placeholder": "Enter username" }
\`\`\`

\`\`\`markdown-ui-widget
{ "type": "button-group", "id": "size", "label": "Size", "choices": ["Small", "Medium", "Large"], "default": "Medium" }
\`\`\`

\`\`\`markdown-ui-widget
{ "type": "slider", "id": "quantity", "label": "Quantity", "min": 1, "max": 100, "step": 1, "default": 10 }
\`\`\`

### DSL Format (Same Widgets)

\`\`\`markdown-ui-widget
text-input username2 "Username" "Enter username"
\`\`\`

\`\`\`markdown-ui-widget
button-group size2 [Small Medium Large] Medium
\`\`\`

\`\`\`markdown-ui-widget
slider quantity2 1 100 1 10
\`\`\`

## Complex Form

\`\`\`markdown-ui-widget
form showcase-form "Process Form"
  button-group size [Small Medium Large] Medium
  select color [Red Green Blue Purple] Blue
  select-multi options [Option1 Option2 Option3 Option4] [Option1]
  slider quantity 1 100 1 10
  text-input name "Item Name" "Enter name..."
\`\`\``;
        break;
      case 'minimal':
        markdownContent = `# Simple Example

Just some basic markdown with a single widget.

\`\`\`markdown-ui-widget
{ "type": "button-group", "id": "simple", "label": "Pick One", "choices": ["Yes", "No", "Maybe"], "default": "Maybe" }
\`\`\`

That's it! Simple and clean.`;
        break;
      case 'complex':
        markdownContent = `# Complex Document

This is a more complex example with multiple sections and widgets.

## Configuration

\`\`\`markdown-ui-widget
{ "type": "select", "id": "env", "label": "Environment", "choices": ["development", "staging", "production"], "default": "development" }
\`\`\`

## Settings

\`\`\`markdown-ui-widget
{ "type": "slider", "id": "timeout", "label": "Timeout (seconds)", "min": 5, "max": 300, "step": 5, "default": 30 }
\`\`\`

\`\`\`markdown-ui-widget
{ "type": "select-multi", "id": "flags", "label": "Feature Flags", "choices": ["debug", "verbose", "profile", "trace"], "default": ["debug"] }
\`\`\`

## Advanced Form

\`\`\`markdown-ui-widget
{
  "type": "form",
  "id": "advanced-config",
  "submitLabel": "Apply Configuration",
  "fields": [
    { "type": "text-input", "id": "name", "label": "Configuration Name", "placeholder": "Enter configuration name..." },
    { "type": "button-group", "id": "mode", "label": "Mode", "choices": ["Development", "Testing", "Production"], "default": "Development" },
    { "type": "slider", "id": "workers", "label": "Worker Threads", "min": 1, "max": 16, "step": 1, "default": 4 }
  ]
}
\`\`\`

## Documentation

This configuration system allows you to:

1. **Select Environment**: Choose your target environment
2. **Set Timeout**: Configure request timeout
3. **Enable Flags**: Toggle debugging features
4. **Advanced Config**: Set up complex configurations

> **Note**: Changes are applied immediately when you interact with the widgets.`;
        break;
    }
  }
  
  const extensions = $derived([
    markdown(),
    EditorView.lineWrapping,
    EditorView.theme({
      '&': {
        height: 'calc(100vh - 180px)', // Account for header + controls
        maxHeight: 'calc(100vh - 180px)'
      },
      '.cm-scroller': {
        fontFamily: '"SF Mono", Monaco, "Cascadia Code", monospace',
        fontSize: '13px',
        maxHeight: 'calc(100vh - 180px)',
        overflowY: 'auto'
      },
      '.cm-content': {
        padding: '12px'
      },
      '.cm-focused': {
        outline: 'none'
      }
    })
  ]);
</script>

<div class="editor-container">
  <div class="editor-controls">
    <div class="control-group">
      <button onclick={() => loadExample('minimal')} class="example-btn">
        Load Minimal Example
      </button>
      <button onclick={() => loadExample('widgets')} class="example-btn">
        Load Widget Showcase
      </button>
      <button onclick={() => loadExample('complex')} class="example-btn">
        Load Complex Example
      </button>
    </div>
    
    <div class="control-group">
      <button onclick={clearEvents} class="clear-btn">
        Clear Events
      </button>
    </div>
  </div>

  <div class="editor-layout">
    <div class="editor-panel">
      <div class="panel-header">
        <h3>Markdown Editor</h3>
        <div class="editor-info">
          {markdownContent.length} characters
        </div>
      </div>
      <div class="editor-wrapper">
        <CodeMirror 
          bind:value={markdownContent}
          {extensions}
        />
      </div>
    </div>

    <div class="preview-panel">
      <div class="panel-header">
        <h3>Live Preview</h3>
        <div class="preview-info">
          Real-time rendering
        </div>
      </div>
      <div class="preview-content">
        <MarkdownUI html={marked.parse(markdownContent)} onwidgetevent={handleWidgetEvent} />
      </div>
    </div>

    <WidgetEvents {events} />
  </div>
</div>

<style>
  .editor-container {
    height: calc(100vh - 4rem);
    display: flex;
    flex-direction: column;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }
  
  .editor-controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    background: #f8fafc;
    border-bottom: 1px solid #e2e8f0;
    gap: 1rem;
    flex-wrap: wrap;
  }
  
  .control-group {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }
  
  .example-btn, .clear-btn {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 6px;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .example-btn {
    background: #3b82f6;
    color: white;
  }
  
  .example-btn:hover {
    background: #2563eb;
  }
  
  
  .clear-btn {
    background: #ef4444;
    color: white;
  }
  
  .clear-btn:hover {
    background: #dc2626;
  }
  
  .editor-layout {
    flex: 1;
    display: grid;
    grid-template-columns: 1fr 1fr 300px;
    min-height: 0;
    gap: 0;
    overflow: hidden;
  }
  
  .editor-panel, .preview-panel {
    display: flex;
    flex-direction: column;
    border-right: 1px solid #e2e8f0;
    min-height: 0;
    min-width: 0;
    overflow: hidden;
  }
  
  .panel-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background: #ffffff;
    border-bottom: 1px solid #e2e8f0;
    flex-shrink: 0;
  }
  
  .panel-header h3 {
    margin: 0;
    font-size: 1rem;
    color: #374151;
  }
  
  .editor-info, .preview-info {
    font-size: 0.75rem;
    color: #6b7280;
  }
  
  .editor-wrapper {
    flex: 1;
    min-height: 0;
  }
  
  .preview-content {
    flex: 1;
    overflow-y: auto;
    padding: 1rem;
  }
  
  
  
  @media (max-width: 1024px) {
    .editor-layout {
      grid-template-columns: 1fr;
      grid-template-rows: 400px 1fr 300px;
      gap: 0;
      height: 100%;
    }
    
    .editor-panel, .preview-panel {
      border-right: none;
      border-bottom: 1px solid #e2e8f0;
      min-height: 250px;
      overflow: auto;
    }
  }
  
  @media (max-width: 768px) {
    .editor-container {
      height: calc(100vh - 2rem);
    }
    
    .editor-controls {
      padding: 0.75rem;
      flex-direction: column;
      align-items: stretch;
      gap: 0.75rem;
    }
    
    .control-group {
      justify-content: center;
      flex-wrap: wrap;
    }
    
    .example-btn, .clear-btn {
      padding: 0.75rem 1rem;
      font-size: 0.8rem;
      min-width: 120px;
    }
    
    .editor-layout {
      grid-template-rows: 300px 350px 200px;
      height: calc(100vh - 10rem);
    }
    
    .panel-header {
      padding: 0.75rem;
    }
    
    .panel-header h3 {
      font-size: 0.9rem;
    }
    
    .editor-info, .preview-info {
      font-size: 0.7rem;
    }
    
    .preview-content {
      padding: 0.75rem;
    }
  }
  
  @media (max-width: 480px) {
    .editor-container {
      height: calc(100vh - 1rem);
    }
    
    .editor-controls {
      padding: 0.5rem;
      gap: 0.5rem;
    }
    
    .control-group {
      gap: 0.5rem;
    }
    
    .example-btn, .clear-btn {
      padding: 0.625rem 0.75rem;
      font-size: 0.75rem;
      min-width: 100px;
    }
    
    .editor-layout {
      grid-template-rows: 250px 300px 180px;
      height: calc(100vh - 8rem);
    }
    
    .panel-header {
      padding: 0.5rem;
    }
    
    .panel-header h3 {
      font-size: 0.85rem;
    }
    
    .editor-info, .preview-info {
      font-size: 0.65rem;
    }
    
    .preview-content {
      padding: 0.5rem;
    }
  }
</style>