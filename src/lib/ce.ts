// src/ce.ts
import MarkdownUI from './MarkdownUI.svelte';

// Avoid redefining if script is loaded twice
if (!customElements.get('markdown-ui-widget')) {
  customElements.define('markdown-ui-widget', MarkdownUI.element!);
}

export {};