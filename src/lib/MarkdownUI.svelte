<script lang="ts">
    import { Marked } from 'marked';
    import { markedUiExtension } from "@markdown-ui/marked-ext";
    import Widget from './widgets/Widget.svelte';

    import { onMount, tick } from 'svelte';

    let { md, onwidgetevent } = $props();

    const marked = new Marked();
    marked.use(markedUiExtension); 

    let compiledMD = $derived(marked.parse(md));

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
        console.log(e.detail);
        onwidgetevent(e.detail);
    }
</script>

<div bind:this={container} class="widget-container">
    {@html compiledMD}
</div>