<script lang="ts">
  // Component for when widget is still streaming/loading
</script>

<div class="incomplete-widget">
  <div class="loading-indicator">
    <span class="loading-text">Loading...</span>
  </div>
</div>

<style>
  .incomplete-widget {
    display: flex;
    align-items: center;
    padding: 8px 12px;
    background-color: #f5f5f5;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-family: system-ui, -apple-system, sans-serif;
    font-size: 14px;
    color: #666;
  }

  .loading-indicator {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .loading-text {
    opacity: 0.7;
  }

  .loading-text::after {
    content: '';
    animation: dots 1.5s infinite;
  }

  @keyframes dots {
    0%, 20% { content: ''; }
    40% { content: '.'; }
    60% { content: '..'; }
    80%, 100% { content: '...'; }
  }
</style>