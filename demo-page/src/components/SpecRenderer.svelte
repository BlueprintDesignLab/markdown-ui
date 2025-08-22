<script lang="ts">
  import { MarkdownUI } from '@markdown-ui/svelte';
  import '@markdown-ui/svelte/widgets.css';
  import { Marked } from 'marked';
  import { markedUiExtension } from '@markdown-ui/marked-ext';

  export let markdown: string;

  const marked = new Marked();
  marked.use(markedUiExtension);

  $: html = marked.parse(markdown) as string;
</script>

<div class="prose prose-neutral max-w-none">
  <MarkdownUI {html} onwidgetevent={() => {}}/>
</div>
