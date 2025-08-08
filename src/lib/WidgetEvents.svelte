<script>
  let { events = [], onClear = null, showClearButton = false } = $props();
</script>

<div class="events-panel">
  <div class="panel-header">
    <h3>Widget Events</h3>
    <div class="header-controls">
      <div class="events-count">
        {events.length} events
      </div>
      {#if showClearButton && onClear}
        <button class="clear-btn" onclick={onClear}>
          Clear Events
        </button>
      {/if}
    </div>
  </div>
  <div class="events-list">
    {#if events.length === 0}
      <p class="no-events">No events yet. Interact with widgets in the preview!</p>
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
</div>

<style>
  .events-panel {
    display: flex;
    flex-direction: column;
    border-right: 1px solid #e2e8f0;
    min-height: 0;
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
  
  .header-controls {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  
  .panel-header h3 {
    margin: 0;
    font-size: 1rem;
    color: #374151;
  }
  
  .events-count {
    font-size: 0.75rem;
    color: #6b7280;
  }
  
  .events-list {
    flex: 1;
    overflow-y: auto;
    padding: 1rem;
  }
  
  .no-events {
    color: #6b7280;
    font-style: italic;
    text-align: center;
    margin: 2rem 0;
    font-size: 0.875rem;
  }
  
  .event-item {
    margin-bottom: 0.75rem;
    padding: 0.75rem;
    background: #f9fafb;
    border: 1px solid #e5e7eb;
    border-radius: 6px;
    font-size: 0.75rem;
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
    font-size: 0.7rem;
    color: #6b7280;
  }
  
  .event-value {
    font-family: 'SF Mono', Monaco, 'Cascadia Code', monospace;
    background: #f1f5f9;
    padding: 0.5rem;
    border-radius: 4px;
    color: #475569;
    word-break: break-all;
    font-size: 0.7rem;
    line-height: 1.4;
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
</style>