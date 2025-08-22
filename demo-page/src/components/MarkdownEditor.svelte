<script lang="ts">
	import { onMount } from 'svelte';
	import { EditorView, basicSetup } from 'codemirror';
	import { markdown } from '@codemirror/lang-markdown';
	import { EditorState } from '@codemirror/state';
	
	import { MarkdownUI } from '@markdown-ui/svelte';
	import '@markdown-ui/svelte/widgets.css';
	
	import { Marked } from 'marked';
	import { markedUiExtension } from '@markdown-ui/marked-ext';

	// Setup marked with the markdown-ui extension
	const marked = new Marked();
	marked.use(markedUiExtension);

	let editorContainer: HTMLDivElement;
	let editorView: EditorView;
	
	let events = $state<Array<{id: string, value: unknown, timestamp: string}>>([]);
	let charCount = $state(0);

	import { demoMarkdown } from '../data/demoMarkdown';

	let currentMarkdown = $state(demoMarkdown);
	let renderedHtml = $state('');

	// Re-render when markdown changes
	$effect(() => {
		renderedHtml = marked.parse(currentMarkdown) as string;
		charCount = currentMarkdown.length;
	});

	function handleWidgetEvent(event: CustomEvent<{id: string, value: unknown}>) {
		const timestamp = new Date().toLocaleTimeString();
		events = [{ id: event.detail.id, value: event.detail.value, timestamp }, ...events].slice(0, 50);
	}

	onMount(() => {
		const state = EditorState.create({
			doc: demoMarkdown,
			extensions: [
				basicSetup,
				markdown(),
				EditorView.updateListener.of((update) => {
					if (update.docChanged) {
						currentMarkdown = update.state.doc.toString();
					}
				})
			]
		});

		editorView = new EditorView({
			state,
			parent: editorContainer
		});

		return () => {
			editorView?.destroy();
		};
	});
</script>

<div class="min-h-0 flex flex-col h-screen">
	<div class="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_320px] h-screen overflow-hidden overflow-x-hidden">
		<div class="flex flex-col min-h-0 border-b xl:border-b-0 xl:border-r border-neutral-200 overflow-x-hidden overflow-y-auto">
			<div class="flex items-center justify-between px-4 py-3 bg-white border-b border-neutral-200">
				<h3 class="m-0 text-[15px] font-medium text-neutral-800">Markdown Editor</h3>
				<div class="text-xs text-neutral-500">{charCount} characters</div>
			</div>
			<div class="flex-1 min-h-0">
				<div bind:this={editorContainer} class="h-full font-mono"></div>
			</div>
		</div>

		<div class="flex flex-col min-h-0 border-b xl:border-b-0 xl:border-r border-neutral-200 overflow-x-hidden overflow-y-auto">
			<div class="flex items-center justify-between px-4 py-3 bg-white border-b border-neutral-200">
				<h3 class="m-0 text-[15px] font-medium text-neutral-800">Live Preview</h3>
				<div class="text-xs text-neutral-500">Real-time rendering</div>
			</div>
			<div class="flex-1 overflow-y-auto p-4 bg-white prose">
				<MarkdownUI html={renderedHtml} onwidgetevent={handleWidgetEvent} />
			</div>
		</div>

		<div class="flex flex-col min-h-0 bg-white overflow-y-auto">
			<div class="flex items-center justify-between px-4 py-3 border-b border-neutral-200">
				<h3 class="m-0 text-[15px] font-medium text-neutral-800">Widget Events</h3>
				<div class="px-2 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-medium">{events.length}</div>
			</div>
			<div class="flex-1 p-4 overflow-y-auto min-h-0">
				{#if events.length === 0}
					<div class="flex flex-col items-center justify-center h-[200px] text-neutral-500 text-center bg-neutral-50 border border-neutral-200 rounded-md p-4">
						<p class="m-1 text-sm"><strong>No events yet</strong></p>
						<p class="m-1 text-sm">Interact with widgets to see events logged here.</p>
					</div>
				{:else}
					{#each events as event (event.id + event.timestamp)}
						<div class="mb-3 p-3 bg-white border border-neutral-200 rounded-md text-sm shadow-sm">
							<div class="flex justify-between items-center mb-2">
								<span class="font-semibold text-blue-600">{event.id}</span>
								<span class="text-xs text-neutral-500">{event.timestamp}</span>
							</div>
							<div class="font-mono bg-neutral-50 p-2 rounded text-neutral-600 text-xs whitespace-pre-wrap break-words">
								{JSON.stringify(event.value, null, 2)}
							</div>
						</div>
					{/each}
				{/if}
			</div>
		</div>
	</div>
</div>

