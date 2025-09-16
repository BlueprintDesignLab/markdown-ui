<script lang="ts">
	import { onMount } from 'svelte';
	import { EditorView, basicSetup } from 'codemirror';
	import { markdown } from '@codemirror/lang-markdown';
	import { EditorState } from '@codemirror/state';
	
	import { MarkdownUI } from '@markdown-ui/svelte';
	import '@markdown-ui/svelte/widgets.css';
	
	import { Marked } from 'marked';
	import { markedUiExtension } from '@markdown-ui/marked-ext';

	import { Pane, PaneGroup, PaneResizer } from 'paneforge';

	// Setup marked with the markdown-ui extension
	const marked = new Marked();
	marked.use(markedUiExtension);

	let mobileEditorContainer: HTMLDivElement;
	let desktopEditorContainer: HTMLDivElement;
	let editorView: EditorView;
	
	let events = $state<Array<{id: string, value: unknown, timestamp: string}>>([]);
	let charCount = $state(0);
	let activeTab = $state<'editor' | 'preview' | 'events'>('preview');

	import { demoMarkdown } from '../data/demoMarkdown';

	let currentMarkdown = $state(demoMarkdown);
	let renderedHtml = $state('');

	// Re-render when markdown changes
	$effect(() => {
		try {
			renderedHtml = marked.parse(currentMarkdown) as string;
		} catch (error) {
			console.warn('Failed to parse markdown:', error);
			renderedHtml = '<p>Error parsing markdown</p>';
		}
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

		// Create editor in desktop container initially
		if (desktopEditorContainer) {
			editorView = new EditorView({
				state,
				parent: desktopEditorContainer
			});
		}

		return () => {
			editorView?.destroy();
		};
	});

	// Effect to handle mobile editor display
	$effect(() => {
		if (activeTab === 'editor' && mobileEditorContainer && editorView) {
			const isMobile = window.innerWidth <= 768;
			if (isMobile) {
				// Move the editor to mobile container
				mobileEditorContainer.appendChild(editorView.dom);
			}
		}
	});
</script>

<style>
	:global(.cm-editor) {
		height: 100% !important;
		font-size: 14px !important;
	}
	:global(.cm-scroller) {
		overflow: auto !important;
		font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace !important;
		font-size: 14px !important;
	}

	@media (max-width: 768px) {
		:global(.cm-editor) {
			font-size: 14px !important;
		}
		:global(.cm-scroller) {
			font-size: 14px !important;
		}
	}

	.mobile-tab {
		padding: 0.75rem 1rem;
		font-size: 0.875rem;
		font-weight: 500;
		border-bottom: 2px solid transparent;
		transition: all 0.2s;
		cursor: pointer;
		color: #6b7280;
	}
	
	.mobile-tab.active {
		color: #2563eb;
		border-bottom-color: #2563eb;
		background-color: #eff6ff;
	}
	
	.mobile-tab.inactive:hover {
		color: #374151;
		border-bottom-color: #e5e7eb;
	}

	.desktop-layout {
		display: flex;
		flex-direction: column;
		height: 100%;
	}

	.mobile-layout {
		display: flex;
		flex-direction: column;
		height: 100%;
	}

	@media (min-width: 769px) {
		.mobile-layout {
			display: none;
		}
	}

	@media (max-width: 768px) {
		.desktop-layout {
			display: none;
		}
	}
</style>

<!-- Mobile Layout -->
<div class="mobile-layout">
	<!-- Mobile Tab Bar -->
	<div class="flex border-b border-neutral-200 bg-white">
		<button 
			class="mobile-tab flex-1 {activeTab === 'editor' ? 'active' : 'inactive'}"
			onclick={() => activeTab = 'editor'}
		>
			Editor
			<span class="ml-1 text-xs opacity-70">({charCount})</span>
		</button>
		<button 
			class="mobile-tab flex-1 {activeTab === 'preview' ? 'active' : 'inactive'}"
			onclick={() => activeTab = 'preview'}
		>
			Preview
		</button>
		<button 
			class="mobile-tab flex-1 {activeTab === 'events' ? 'active' : 'inactive'}"
			onclick={() => activeTab = 'events'}
		>
			Events
			{#if events.length > 0}
				<span class="ml-1 px-1.5 py-0.5 text-xs bg-blue-600 text-white rounded-full">{events.length}</span>
			{/if}
		</button>
	</div>

	<!-- Mobile Content Area -->
	<div class="flex-1 min-h-0 overflow-hidden bg-white">
		{#if activeTab === 'editor'}
			<div class="h-full flex flex-col">
				<div bind:this={mobileEditorContainer} class="flex-1 min-h-0"></div>
			</div>
		{:else if activeTab === 'preview'}
			<div class="h-full overflow-y-auto p-4 prose prose-sm max-w-none">
				<MarkdownUI html={renderedHtml} onwidgetevent={handleWidgetEvent} />
			</div>
		{:else if activeTab === 'events'}
			<div class="h-full p-4 overflow-y-auto">
				{#if events.length === 0}
					<div class="flex flex-col items-center justify-center h-64 text-neutral-500 text-center bg-neutral-50 border-2 border-dashed border-neutral-200 rounded-lg p-6">
						<div class="text-4xl mb-4">🔧</div>
						<p class="text-base font-medium mb-2">No widget events yet</p>
						<p class="text-sm">Switch to Preview and interact with widgets to see events here.</p>
					</div>
				{:else}
					<div class="space-y-3">
						{#each events as event}
							<div class="p-4 bg-white border border-neutral-200 rounded-lg shadow-sm">
								<div class="flex justify-between items-center mb-3">
									<span class="font-semibold text-blue-600 text-base">{event.id}</span>
									<span class="text-sm text-neutral-500">{event.timestamp}</span>
								</div>
								<pre class="font-mono bg-neutral-50 p-3 rounded text-neutral-600 text-sm overflow-x-auto whitespace-pre-wrap break-words">{JSON.stringify(event.value, null, 2)}</pre>
							</div>
						{/each}
					</div>
				{/if}
			</div>
		{/if}
	</div>
</div>

<!-- Desktop Layout -->
<div class="desktop-layout">
	<PaneGroup direction="horizontal" class="h-full">
		<Pane defaultSize={40} minSize={20} class="flex flex-col min-h-0 border-r border-neutral-200">
			<div class="flex items-center justify-between px-4 py-3 bg-white border-b border-neutral-200">
				<h3 class="m-0 text-[15px] font-medium text-neutral-800">Markdown Editor</h3>
				<div class="text-xs text-neutral-500">{charCount} characters</div>
			</div>
			<div class="flex-1 min-h-0 overflow-hidden">
				<div bind:this={desktopEditorContainer} class="h-full w-full"></div>
			</div>
		</Pane>

		<PaneResizer class="w-2 bg-neutral-100 hover:bg-neutral-200 transition-colors" />

		<Pane defaultSize={40} minSize={20} class="flex flex-col min-h-0 border-r border-neutral-200">
			<div class="flex items-center justify-between px-4 py-3 bg-white border-b border-neutral-200">
				<h3 class="m-0 text-[15px] font-medium text-neutral-800">Live Preview</h3>
				<div class="text-xs text-neutral-500">Real-time rendering</div>
			</div>
			<div class="flex-1 overflow-y-auto p-4 bg-white prose">
				<MarkdownUI html={renderedHtml} onwidgetevent={handleWidgetEvent} />
			</div>
		</Pane>

		<PaneResizer class="w-2 bg-neutral-100 hover:bg-neutral-200 transition-colors" />

		<Pane defaultSize={20} minSize={10} class="flex flex-col min-h-0 bg-white">
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
					{#each events as event}
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
		</Pane>
	</PaneGroup>
</div>

