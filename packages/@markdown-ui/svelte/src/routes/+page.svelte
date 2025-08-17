<script>
  import { MarkdownUI } from '$lib';
  import { Marked } from 'marked';
  import { markedUiExtension } from "@markdown-ui/marked-ext";
  import "$lib/widgets.css";

  const marked = new Marked();
  marked.use(markedUiExtension);

  let events = $state([]);

  function handleWidgetEvent(detail) {
    const timestamp = new Date().toLocaleTimeString();
    events = [{ timestamp, ...detail }, ...events].slice(0, 10);
  }

  const demoMarkdown = `# Welcome to Markdown UI

**Micro-spec for interactive widgets inside Markdown.**

If your renderer supports it -> live UI. If not -> graceful fallback.

## What is Markdown UI?

Markdown UI allows you to embed interactive widgets directly in Markdown using simple JSON configurations. Perfect for AI-generated content that needs user interaction.

- **LLM-Native**: Designed for AI to generate interactive experiences
- **Zero Dependencies**: Pure specification, bring your own parser/renderer
- **Cross-Platform**: Works with any Markdown parser + any UI framework
- **Secure**: JSON-only, no code execution
- **Progressive**: Graceful fallback to code blocks

## Try it now!

Here's a simple example - pick your environment:

\`\`\`markdown-ui-widget
{ "type": "buttonGroup", "id": "env", "label": "Environment", "choices": ["development", "staging", "production"], "default": "development" }
\`\`\`

Or use the new concise **DSL syntax** (60-70% shorter):

\`\`\`markdown-ui-widget
button-group env2 [development staging production] development
\`\`\`

Configure some server settings:

\`\`\`markdown-ui-widget
{ "type": "slider", "id": "cpu", "label": "CPU Cores", "min": 1, "max": 16, "step": 1, "default": 4 }
\`\`\`

\`\`\`markdown-ui-widget
select region [us-east-1 us-west-2 eu-west-1 ap-southeast-1] us-east-1
\`\`\`

## How it works

1. **Write**: Standard Markdown with \`markdown-ui-widget\` code blocks
2. **Parse**: Our extension converts widgets to standardized XML
3. **Render**: Framework-specific components handle the UI
4. **Interact**: Get \`{id, value}\` events from user interactions

## Supported Widgets

| Widget | Purpose | Demo |
|--------|---------|------|
| **buttonGroup** | A/B choices, yes/no |  Above |
| **select** | Dropdown selection |  Above |
| **slider** | Numeric input |  Above |
| **textInput** | Free text input | [Editor Demo](/editor) |
| **selectMulti** | Tag selection | [Editor Demo](/editor) |
| **form** | Composite widgets | [Streaming Demo](/streaming) |

## Next Steps

- **[Streaming Demo](/streaming)** - See widgets rendered in real-time
- **[Editor Demo](/editor)** - Try all widget types interactively  
- **[Specification](/spec)** - Full technical documentation
- **[GitHub](https://github.com/BlueprintDesignLab/markdown-ui)** - Source code and examples

Perfect for chatbots, forms, configuration UIs, and any AI-generated content that needs user input!`;
</script>

<div class="home-container">
  <div class="content-wrapper">
    <main class="main-content">
      <MarkdownUI html={marked.parse(demoMarkdown)} onwidgetevent={handleWidgetEvent} />
    </main>
    
    {#if events.length > 0}
      <aside class="events-sidebar">
        <div class="events-header">
          <h3>Live Events</h3>
          <div class="event-count">{events.length}</div>
        </div>
        
        <div class="events-list">
          {#each events as event}
            <div class="event-item">
              <div class="event-meta">
                <span class="event-id">{event.id}</span>
                <span class="event-time">{event.timestamp}</span>
              </div>
              <div class="event-value">
                {JSON.stringify(event.value)}
              </div>
            </div>
          {/each}
        </div>
      </aside>
    {/if}
  </div>
</div>

<style>
  .home-container {
    min-height: calc(100vh - 4rem);
    background: #f8fafc;
  }
  
  .content-wrapper {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
    padding: 2rem;
    min-height: calc(100vh - 8rem);
  }
  
  .content-wrapper:has(.events-sidebar) {
    grid-template-columns: 1fr 300px;
  }
  
  .main-content {
    background: #ffffff;
    border-radius: 12px;
    padding: 2rem;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
    border: 1px solid #e2e8f0;
    overflow-x: auto;
  }
  
  .events-sidebar {
    background: #ffffff;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
    border: 1px solid #e2e8f0;
    height: fit-content;
    position: sticky;
    top: 6rem;
  }
  
  .events-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    padding-bottom: 0.75rem;
    border-bottom: 1px solid #e2e8f0;
  }
  
  .events-header h3 {
    margin: 0;
    font-size: 1rem;
    color: #374151;
    font-weight: 600;
  }
  
  .event-count {
    background: #dbeafe;
    color: #3b82f6;
    padding: 0.25rem 0.5rem;
    border-radius: 12px;
    font-size: 0.75rem;
    font-weight: 600;
    min-width: 1.5rem;
    text-align: center;
  }
  
  .events-list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    max-height: 400px;
    overflow-y: auto;
  }
  
  .event-item {
    padding: 0.75rem;
    background: #f8fafc;
    border: 1px solid #e5e7eb;
    border-radius: 6px;
    font-size: 0.875rem;
  }
  
  .event-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
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
    font-size: 0.8rem;
  }
  
  /* Typography improvements for main content */
  :global(.main-content h1) {
    color: #1f2937;
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    line-height: 1.2;
  }
  
  :global(.main-content h2) {
    color: #374151;
    font-size: 1.5rem;
    font-weight: 600;
    margin: 2rem 0 1rem 0;
    line-height: 1.3;
  }
  
  :global(.main-content p) {
    color: #4b5563;
    line-height: 1.7;
    margin-bottom: 1rem;
  }
  
  :global(.main-content ul) {
    color: #4b5563;
    line-height: 1.6;
    margin-left: 1.5rem;
  }
  
  :global(.main-content table) {
    width: 100%;
    border-collapse: collapse;
    margin: 1.5rem 0;
    font-size: 0.875rem;
  }
  
  :global(.main-content th),
  :global(.main-content td) {
    padding: 0.75rem;
    text-align: left;
    border-bottom: 1px solid #e5e7eb;
  }
  
  :global(.main-content th) {
    background: #f9fafb;
    font-weight: 600;
    color: #374151;
  }
  
  :global(.main-content td) {
    color: #4b5563;
  }
  
  :global(.main-content code) {
    background: #f1f5f9;
    padding: 0.25rem 0.5rem;
    border-radius: 3px;
    font-size: 0.875em;
    color: #475569;
  }
  
  :global(.main-content a) {
    color: #3b82f6;
    text-decoration: none;
  }
  
  :global(.main-content a:hover) {
    text-decoration: underline;
  }
  
  @media (max-width: 1024px) {
    .content-wrapper {
      grid-template-columns: 1fr !important;
      padding: 1.5rem;
    }
    
    .events-sidebar {
      order: -1;
      position: relative;
      top: unset;
    }
  }
  
  @media (max-width: 768px) {
    .content-wrapper {
      padding: 1rem;
      gap: 1rem;
    }
    
    .main-content {
      padding: 1.5rem;
    }
    
    .events-sidebar {
      padding: 1rem;
    }
    
    :global(.main-content h1) {
      font-size: 2rem;
    }
    
    :global(.main-content h2) {
      font-size: 1.25rem;
    }
  }
  
  @media (max-width: 480px) {
    .content-wrapper {
      padding: 0.75rem;
    }
    
    .main-content {
      padding: 1rem;
    }
    
    .events-sidebar {
      padding: 0.75rem;
    }
  }
</style>