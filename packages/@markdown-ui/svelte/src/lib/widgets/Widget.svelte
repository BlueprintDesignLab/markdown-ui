<svelte:options
  customElement={{
    tag: 'markdown-ui-widget',
    shadow: 'none',            // use 'none' if you want light-DOM
    props: {
      id: {               // the prop you asked for
        type: 'String',        // treat incoming attribute as plain text
        attribute: 'id',  // <markdown-ui-widget content="…">
        reflect: true          // update the attribute if we change it
      },
      content: {               // the prop you asked for
        type: 'String',        // treat incoming attribute as plain text
        attribute: 'content',  // <markdown-ui-widget content="…">
        reflect: true          // update the attribute if we change it
      }
    }
  }}
/>

<script lang="ts">
  import * as widgets from './index.js';

  let { id, content } = $props();

  const parsed = JSON.parse(atob(content));
  const Cmp    = widgets[parsed.type as keyof typeof widgets];

  function dispatch(detail: any) {
		$host().dispatchEvent(
      new CustomEvent('widget-event', {
        detail: detail,
        bubbles: true,
        composed: true   // let it cross the shadow-root boundary
      })
    );
	}
</script>

<div class="widget">
  {#if Cmp}
    <Cmp {...parsed} onchange={(value) => dispatch({id: id, value: value})}/>
  {:else}
    <span style="color:red">Unknown widget “{parsed.type}”</span>
  {/if}
</div>
