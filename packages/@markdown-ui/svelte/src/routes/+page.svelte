<script>
  import { MarkdownUI } from '$lib';

  import CodeMirror from 'svelte-codemirror-editor';
  import { markdown } from '@codemirror/lang-markdown';
  import { EditorView } from '@codemirror/view';

  import { Marked } from 'marked';
  import { markedUiExtension } from "@markdown-ui/marked-ext";
  
  const marked = new Marked();
  marked.use(markedUiExtension); 

  import "$lib/widgets.css";
  import { onMount } from 'svelte';
  
  let streamedContent = $state('');
  let isStreaming = $state(false);
  let events = $state([]);
  
  const fullContent = `# Server Configuration Assistant

I need to help you set up a new production server. Instead of asking you dozens of questions one by one, I'll create an interactive form that makes this process much faster.

## Server Deployment Configuration

Please fill out the following configuration form:

\`\`\`markdown-ui-widget
{
  "type": "form",
  "id": "server-config",
  "submitLabel": "Generate Configuration",
  "fields": [
    { "type": "textInput", "id": "project-name", "label": "Project Name", "placeholder": "my-awesome-app", "default": "" },
    { "type": "select", "id": "environment", "label": "Environment", "choices": ["development", "staging", "production"], "default": "production" },
    { "type": "buttonGroup", "id": "server-type", "label": "Server Type", "choices": ["Web Server", "API Server", "Database Server", "Full Stack"], "default": "Full Stack" },
    { "type": "selectMulti", "id": "services", "label": "Required Services", "choices": ["PostgreSQL", "Redis", "Nginx", "SSL Certificate", "Load Balancer", "CDN", "Monitoring"], "default": ["PostgreSQL", "Nginx"] },
    { "type": "slider", "id": "cpu-cores", "label": "CPU Cores", "min": 1, "max": 32, "step": 1, "default": 4 },
    { "type": "slider", "id": "memory-gb", "label": "Memory (GB)", "min": 1, "max": 128, "step": 1, "default": 8 },
    { "type": "select", "id": "region", "label": "AWS Region", "choices": ["us-east-1", "us-west-2", "eu-west-1", "ap-southeast-1"], "default": "us-east-1" }
  ]
}
\`\`\`

## Security Configuration

\`\`\`markdown-ui-widget
{ "type": "selectMulti", "id": "security", "label": "Security Features", "choices": ["WAF", "DDoS Protection", "VPC", "Private Subnets", "Bastian Host", "Multi-Factor Auth"], "default": ["WAF", "VPC"] }
\`\`\`

## Backup & Monitoring

\`\`\`markdown-ui-widget
{ "type": "buttonGroup", "id": "backup-schedule", "label": "Backup Schedule", "choices": ["Daily", "Every 6 hours", "Hourly"], "default": "Daily" }
\`\`\`

\`\`\`markdown-ui-widget
{ "type": "select", "id": "monitoring", "label": "Monitoring Solution", "choices": ["CloudWatch", "DataDog", "New Relic", "Grafana"], "default": "CloudWatch" }
\`\`\`

## Why This is Useful

Instead of a long conversation with many back-and-forth questions, this single form captures all the information needed to generate a complete server configuration. The LLM can now create:

- Terraform/CloudFormation templates  
- Docker compose files
- Nginx configurations  
- Database setup scripts
- Monitoring dashboards
- Security policies

**All from the structured data collected above.**

This demonstrates how LLMs can generate complex, interactive forms that would be tedious to build manually, making data collection much more efficient than traditional chat interfaces.`;

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
      const delay = Math.random() * 0.5 + 0.2; 
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
  
  const extensions = [
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
  ];

  onMount(() => {
    // Auto-start streaming on page load
    startStreaming();
  });
</script>

<div class="streaming-container">
  <div class="streaming-controls">
    <div class="control-group">
      <button onclick={startStreaming} disabled={isStreaming} class="start-btn">
        {isStreaming ? 'Streaming...' : 'Start Demo'}
      </button>
      <button onclick={stopStreaming} disabled={!isStreaming} class="stop-btn">
        Stop
      </button>
      <button onclick={resetStream} class="reset-btn">
        Reset
      </button>
    </div>
    
    <div class="streaming-status">
      {#if isStreaming}
        <span class="status-indicator streaming"></span>
        Streaming ({streamedContent.length} characters)
      {:else if streamedContent}
        <span class="status-indicator complete"></span>
        Complete ({streamedContent.length} characters)
      {:else}
        <span class="status-indicator idle"></span>
        Ready to stream
      {/if}
    </div>
  </div>

  <div class="demo-layout">
    <div class="markdown-panel">
      <div class="panel-header">
        <h3>Markdown Source</h3>
        <div class="panel-info">Raw streaming content</div>
      </div>
      <div class="markdown-editor">
        <CodeMirror 
          value={streamedContent || '# Ready to start...\n\nClick "Start Demo" to see markdown streaming in real-time!'}
          {extensions}
          readonly={true}
        />
      </div>
    </div>

    <div class="preview-panel">
      <div class="panel-header">
        <h3>Rendered Output</h3>
        <div class="panel-info">Interactive widgets rendered in real-time</div>
      </div>
      <div class="preview-content">
        {#if streamedContent}
          <MarkdownUI html={marked.parse(streamedContent)} onwidgetevent={handleWidgetEvent} />
        {:else}
          <div class="empty-state">
            <h3>Streaming Demo</h3>
            <p>Click <strong>"Start Demo"</strong> to watch markdown content stream in and render interactive UI components in real-time.</p>
            <div class="feature-hints">
              <div class="hint">Real-time rendering</div>
              <div class="hint">Interactive widgets</div>
              <div class="hint">Live event handling</div>
            </div>
          </div>
        {/if}
      </div>
    </div>
    
    <div class="events-panel">
      <div class="panel-header">
        <h3>Widget Events</h3>
        <button onclick={clearEvents} class="clear-btn">Clear</button>
      </div>
      
      <div class="events-list">
        {#if events.length === 0}
          <div class="no-events">
            <p><strong>No events yet</strong></p>
            <p>Interact with widgets as they appear to see events logged here.</p>
          </div>
        {/if}
        
        {#each events as event}
          <div class="event-item">
            <div class="event-header">
              <span class="event-id">{event.id}</span>
              <span class="event-time">{event.timestamp}</span>
            </div>
            <div class="event-value">
              {JSON.stringify(event.value, null, 2)}
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
</div>

<style>
  .streaming-container {
    height: calc(100vh - 4rem);
    display: flex;
    flex-direction: column;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }
  
  .streaming-controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    background: #f8fafc;
    border-bottom: 1px solid #e2e8f0;
    gap: 1rem;
    flex-wrap: wrap;
    flex-shrink: 0;
  }
  
  .control-group {
    display: flex;
    gap: 0.75rem;
    align-items: center;
  }
  
  .streaming-controls button {
    padding: 0.5rem 1rem;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    font-size: 0.875rem;
    color: black;
    background: white;
  }
  
  .start-btn {
    background: #10b981;
    color: white;
    border-color: #10b981;
  }
  
  .start-btn:hover:not(:disabled) {
    background: #059669;
    border-color: #059669;
  }
  
  .start-btn:disabled {
    background: #9ca3af;
    border-color: #9ca3af;
    cursor: not-allowed;
  }
  
  .stop-btn {
    background: #ef4444;
    color: white;
    border-color: #ef4444;
  }
  
  .stop-btn:hover:not(:disabled) {
    background: #dc2626;
    border-color: #dc2626;
  }
  
  .stop-btn:disabled {
    background: #9ca3af;
    border-color: #9ca3af;
    cursor: not-allowed;
  }
  
  .reset-btn {
    background: #6b7280;
    color: white;
    border-color: #6b7280;
  }
  
  .reset-btn:hover {
    background: #4b5563;
    border-color: #4b5563;
  }
  
  .streaming-status {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    color: #374151;
    font-weight: 500;
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
  
  .demo-layout {
    flex: 1;
    display: grid;
    grid-template-columns: 1fr 1fr 320px;
    min-height: 0;
  }
  
  .markdown-panel, .preview-panel, .events-panel {
    display: flex;
    flex-direction: column;
    border-right: 1px solid #e2e8f0;
    min-height: 0;
  }
  
  .events-panel {
    border-right: none;
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
    font-weight: 600;
  }
  
  .panel-info {
    font-size: 0.75rem;
    color: #6b7280;
    font-style: italic;
  }
  
  .markdown-editor {
    flex: 1;
    min-height: 0;
  }
  
  .preview-content {
    flex: 1;
    overflow-y: auto;
    padding: 1rem;
  }
  
  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 4rem 2rem;
    height: 100%;
    background: #f9fafb;
    border: 2px dashed #d1d5db;
    border-radius: 8px;
    margin: 1rem;
  }
  
  .empty-state h3 {
    color: #374151;
    margin-bottom: 1rem;
    font-size: 1.5rem;
  }
  
  .empty-state p {
    color: #6b7280;
    margin-bottom: 2rem;
    max-width: 300px;
    line-height: 1.6;
  }
  
  .feature-hints {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .hint {
    padding: 0.5rem 1rem;
    background: #f1f5f9;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    color: #374151;
    font-size: 0.875rem;
    font-weight: 500;
  }
  
  .clear-btn {
    padding: 0.25rem 0.75rem;
    background: #ef4444;
    color: white;
    border: none;
    border-radius: 12px;
    font-size: 0.75rem;
    cursor: pointer;
    transition: all 0.2s;
    font-weight: 500;
  }
  
  .clear-btn:hover {
    background: #dc2626;
    transform: translateY(-1px);
  }
  
  .events-list {
    flex: 1;
    padding: 1rem;
    overflow-y: auto;
    min-height: 0;
  }
  
  .no-events {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 200px;
    color: #6b7280;
    text-align: center;
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 1rem;
  }
  
  .no-events p {
    margin: 0.5rem 0;
    line-height: 1.5;
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
  
  @media (max-width: 1200px) {
    .demo-layout {
      grid-template-columns: 1fr;
      grid-template-rows: 1fr 1fr 300px;
    }
    
    .markdown-panel, .preview-panel, .events-panel {
      border-right: none;
      border-bottom: 1px solid #e2e8f0;
    }
    
    .events-panel {
      border-bottom: none;
    }
  }
  
  @media (max-width: 768px) {
    .streaming-container {
      height: calc(100vh - 6rem);
    }
    
    .streaming-controls {
      padding: 1rem;
      flex-direction: column;
      align-items: stretch;
    }
    
    .control-group {
      justify-content: center;
    }
    
    .streaming-status {
      text-align: center;
    }
  }
  
</style>