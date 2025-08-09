<script lang="ts">
    import { onMount, tick } from 'svelte';
    
    // Import Widget to register the custom element
    import './widgets/Widget.svelte';

    let { onwidgetevent, html } = $props();

    let container: HTMLElement | undefined = $state();

    onMount(() => {
        tick().then(() => {
            container?.addEventListener('widget-event', handleChange as EventListener);
        });

        return () => {
            container?.removeEventListener('widget-event', handleChange as EventListener);
        };
    });

    function handleChange(e: CustomEvent<string>) {
        onwidgetevent(e.detail);
    }
</script>

<div bind:this={container} class="widget-container">
    {@html html}
</div>