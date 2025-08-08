<script>
  import { MarkdownUI } from '$lib';

  import { Marked } from 'marked';
  import { markedUiExtension } from "@markdown-ui/marked-ext";
  
  const marked = new Marked();
  marked.use(markedUiExtension); 

  import "$lib/widgets.css";
  import { onMount } from 'svelte';
  
  let streamedContent = $state('');
  let isStreaming = $state(false);
  let events = $state([]);
  
  const fullContent = `# Streaming Markdown UI Demo
Welcome to the streaming demonstration! This page simulates how markdown content would be received from an LLM in real-time, with the UI updating as new content arrives.


Watch as interactive widgets are rendered as soon as their complete markup arrives:

### Selectors

\`\`\`markdown-ui-widget
{ "type": "select", "id": "streaming-env", "label": "Environment", "choices": ["development", "staging", "production"], "default": "development" }
\`\`\`

### Buttons

\`\`\`markdown-ui-widget
{ "type": "buttonGroup", "id": "mode", "label": "Test Mode", "choices": ["Quick", "Full", "Stress"], "default": "Quick" }
\`\`\`

### And more...

### Normal Code Blocks with Syntax Highlighting

Your other markdown works as expected.

\`\`\`javascript
// This code appears gradually as the stream progresses
function simulateStreaming(content, delay = 50) {
  let index = 0;
  return index
}
\`\`\`

## Streaming Behavior

- **Progressive Rendering**: UI elements render as soon as complete
- **Markdown Parsing**: Real-time markdown parsing and rendering
- **Event Handling**: Widget events work after streaming is complete

**Stream completed!** 🎉`;

  function handleWidgetEvent(detail) {
    const timestamp = new Date().toLocaleTimeString();
    events = [{ timestamp, ...detail }, ...events].slice(0, 50);
  }
  
  function clearEvents() {
    events = [];
  }
  
  async function startStreaming() {
    if (isStreaming) return;
    
    streamedContent = '';
    events = [];
    isStreaming = true;
    
    // Simulate character-by-character streaming
    for (let i = 0; i < fullContent.length; i++) {
      streamedContent = fullContent.slice(0, i + 1);
      
      // Variable delay to simulate more realistic streaming
      const delay = Math.random() * 3 + 1; // 10-40ms delay
      await new Promise(resolve => setTimeout(resolve, delay));
      
      if (!isStreaming) break; // Allow stopping mid-stream
    }
    
    isStreaming = false;
  }
  
  function stopStreaming() {
    isStreaming = false;
  }
  
  function resetStream() {
    stopStreaming();
    streamedContent = '';
    events = [];
  }
  
  onMount(() => {
    // Auto-start streaming on page load
    startStreaming();
  });
</script>

<div class="streaming-container">
  <div class="streaming-controls">
    <button onclick={startStreaming} disabled={isStreaming} class="start-btn">
      {isStreaming ? 'Streaming...' : 'Start Stream'}
    </button>
    <button onclick={stopStreaming} disabled={!isStreaming} class="stop-btn">
      Stop Stream
    </button>
    <button onclick={resetStream} class="reset-btn">
      Reset
    </button>
    <div class="streaming-status">
      {#if isStreaming}
        <span class="status-indicator streaming"></span>
        Streaming... ({streamedContent.length} characters)
      {:else if streamedContent}
        <span class="status-indicator complete"></span>
        Stream complete ({streamedContent.length} characters)
      {:else}
        <span class="status-indicator idle"></span>
        Ready to stream
      {/if}
    </div>
  </div>

  <div class="demo-container">
    <main class="demo-content">
      {#if streamedContent}
        <MarkdownUI html={marked.parse(streamedContent)} onwidgetevent={handleWidgetEvent} />
      {:else}
        <div class="empty-state">
          <p>Click "Start Stream" to begin the streaming demo...</p>
        </div>
      {/if}
    </main>
    
    <aside class="demo-events">
      <div class="events-header">
        <h3>Stream Events</h3>
        <button onclick={clearEvents} class="clear-btn">Clear</button>
      </div>
      
      <div class="events-list">
        {#if events.length === 0}
          <p class="no-events">No widget events yet. Interact with widgets during streaming!</p>
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
  .streaming-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }
  
  .streaming-controls {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 2rem;
    padding: 1rem;
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    flex-wrap: wrap;
  }
  
  .streaming-controls button {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 6px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    font-size: 0.875rem;
  }
  
  .start-btn {
    background: #10b981;
    color: white;
  }
  
  .start-btn:hover:not(:disabled) {
    background: #059669;
  }
  
  .start-btn:disabled {
    background: #6b7280;
    cursor: not-allowed;
  }
  
  .stop-btn {
    background: #ef4444;
    color: white;
  }
  
  .stop-btn:hover:not(:disabled) {
    background: #dc2626;
  }
  
  .stop-btn:disabled {
    background: #9ca3af;
    cursor: not-allowed;
  }
  
  .reset-btn {
    background: #6b7280;
    color: white;
  }
  
  .reset-btn:hover {
    background: #4b5563;
  }
  
  .streaming-status {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    color: #374151;
    margin-left: auto;
  }
  
  .status-indicator {
    width: 8px;
    height: 8px;
    border-radius: 50%;
  }
  
  .status-indicator.idle {
    background: #6b7280;
  }
  
  .status-indicator.streaming {
    background: #10b981;
    animation: pulse 2s infinite;
  }
  
  .status-indicator.complete {
    background: #3b82f6;
  }
  
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
  
  .demo-container {
    display: grid;
    grid-template-columns: 1fr 300px;
    gap: 2rem;
  }
  
  .demo-content {
    overflow-x: auto;
  }
  
  .empty-state {
    text-align: center;
    padding: 4rem 2rem;
    color: #6b7280;
    background: #f9fafb;
    border: 2px dashed #d1d5db;
    border-radius: 8px;
  }
  
  .demo-events {
    position: sticky;
    top: 6rem;
    height: fit-content;
    max-height: calc(100vh - 8rem);
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
    max-height: calc(100vh - 12rem);
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
    .streaming-container {
      padding: 1rem;
    }
    
    .streaming-controls {
      flex-direction: column;
      align-items: stretch;
    }
    
    .streaming-status {
      margin-left: 0;
      justify-content: center;
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