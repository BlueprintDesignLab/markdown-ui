<script lang="ts">
	import OpenAI from 'openai';
	import { onMount, tick } from 'svelte';

    import { MarkdownUI } from '@markdown-ui/svelte';
    import '@markdown-ui/svelte/widgets.css'; // Optional styling

    import { Marked } from 'marked';
    import { markedUiExtension } from "@markdown-ui/marked-ext";

    // Setup marked with the markdown-ui extension
    const marked = new Marked();
    marked.use(markedUiExtension);

    function handleWidgetEvent(event: CustomEvent<{id: string, value: unknown}>) {
        inputMessage = JSON.stringify(event.detail);
        sendMessage();
    }

	interface ChatMessage {
		id: string;
		role: 'user' | 'assistant' | 'system';
		content: string;
		timestamp: Date;
		parsedHtml?: string;
	}

    const initSystemMessage = `
Always use exactly one markdown-ui widget in your response.

Start with interactive charts to showcase the new chart capabilities.
Then show simple widgets and forms.
Your interaction style is always concise. 
Max 3 sentences.

You can embed interactive UI widgets in Markdown using fenced code blocks with language "markdown-ui-widget". 

**DSL Format Examples:**

1. Interactive Charts (NEW!)
\`\`\`markdown-ui-widget
chart-line
id: crypto_trends
title: Bitcoin vs Ethereum (Last 6 Months)
height: 320
Month,Bitcoin,Ethereum
Jul,65000,3200
Aug,62000,3100
Sep,66000,3400
Oct,69000,3600
Nov,71000,3800
Dec,74000,4000
\`\`\`

\`\`\`markdown-ui-widget
chart-bar
id: startup_growth
title: Startup User Growth (Exponential!)
height: 300
Month,Users,Revenue
Jan,1000,5000
Feb,2500,12000
Mar,6000,28000
Apr,15000,65000
May,35000,140000
Jun,80000,320000
\`\`\`

\`\`\`markdown-ui-widget
chart-pie
id: mars_mission
title: Mars Mission Budget Allocation
height: 280
Category,Budget
Rocket Development,45
Life Support,25
Communication,15
Scientific Equipment,10
Emergency Fund,5
\`\`\`

2. Other Interactive Widgets
\`\`\`markdown-ui-widget
text-input spaceship_name "Spaceship Name" "Enter your Mars vessel name" "Starship Alpha"
\`\`\`

\`\`\`markdown-ui-widget
button-group coffee_size [Small Medium Large XL] Medium
\`\`\`

\`\`\`markdown-ui-widget
select launch_site ["Cape Canaveral" Vandenberg "Boca Chica" "Kennedy Space Center"] Boca_Chica
\`\`\`

\`\`\`markdown-ui-widget
slider warp_speed 1 10 1 7
\`\`\`

\`\`\`markdown-ui-widget
form mission_config "Launch Mission"
  select destination [Mars Jupiter Europa Titan]
  slider crew_size 3 12 1
  text-input mission_name "Mission Name" "Operation Red Planet"
\`\`\`

Output rules:
- Use one widget per fenced code block. 
- Only one widget per response.
- Keep all surrounding content as normal Markdown prose outside the widget code fences.
- Prioritize showing chart examples first to demonstrate the new capabilities.
`

	let messages = $state<ChatMessage[]>([
        {
            id: crypto.randomUUID(),
            role: "system",
            content: initSystemMessage,
            timestamp: new Date(),
        },
    ]);
    
	let inputMessage = $state('');
	let isLoading = $state(false);
	let isStreaming = $state(false);
	let showSystemMessage = $state(false);
	let openai: OpenAI;
	let streamingMessageId = $state('');
	let messagesContainer: HTMLDivElement | undefined = $state();
	let showSuggestions = $state(true);
	let hasUserInteracted = $state(false);

	// Ensure messages have parsed HTML without creating new objects
	$effect(() => {
		messages.forEach((msg) => {
			if (!msg.parsedHtml) {
				msg.parsedHtml = marked.parse(msg.content) as string;
			}
		});
	});

	function scrollToBottom() {
		if (messagesContainer) {
			tick().then(() => {
                // console.log("scrolling", {
                //     scrollHeight: messagesContainer!.scrollHeight,
                //     offsetHeight: messagesContainer!.offsetHeight,
                //     scrollTop: messagesContainer!.scrollTop
                // });
				messagesContainer!.scrollTo({
					top: messagesContainer!.scrollHeight,
					behavior: 'smooth'
				});
			});
		}
	}


	function getSystemMessage(): string {
		return messages.find(msg => msg.role === 'system')?.content || '';
	}

	function initializeOpenAI() {
		openai = new OpenAI({
			apiKey: 'dummy-key',
			// baseURL: 'http://localhost:3010',
			baseURL: 'https://llm-proxy-735482512776.us-west1.run.app',
			dangerouslyAllowBrowser: true
		});
	}

	async function sendMessage() {
		if (!inputMessage.trim() || isLoading || isStreaming) return;

		if (!hasUserInteracted) {
			hasUserInteracted = true;
			showSuggestions = false;
		}

		const userMessage: ChatMessage = {
			id: crypto.randomUUID(),
			role: 'user',
			content: inputMessage.trim(),
			timestamp: new Date()
		};

		messages.push(userMessage);
		inputMessage = '';
		isLoading = true;
		scrollToBottom();

		// Create a placeholder message for the streaming response
		const assistantMessageId = crypto.randomUUID();
		const assistantMessage: ChatMessage = {
			id: assistantMessageId,
			role: 'assistant',
			content: '',
			timestamp: new Date()
		};

		messages.push(assistantMessage);
		streamingMessageId = assistantMessageId;
		isLoading = false;
		isStreaming = true;
		scrollToBottom();

		try {
			const stream = await openai.chat.completions.create({
				model: 'gpt-4.1-mini',
				messages: messages.filter(m => m.id !== assistantMessageId).map(m => ({
					role: m.role,
					content: m.content
				})),
				stream: true
			});

			let streamedContent = '';

			for await (const chunk of stream) {
				const delta = chunk.choices[0]?.delta?.content || '';
				if (delta) {
					streamedContent += delta;
                    scrollToBottom();
					
					// Update the message in the messages array
					const streamingMsg = messages.find(msg => msg.id === assistantMessageId);
					if (streamingMsg) {
						streamingMsg.content = streamedContent;
						streamingMsg.parsedHtml = undefined; // Clear cache to force re-parse during streaming
					}
				}
			}

		} catch (error) {
			console.error('Error sending message:', error);
			const errorContent = `Error: ${error instanceof Error ? error.message : 'Failed to send message'}`;
			
			// Update the streaming message with error content
			const errorMsg = messages.find(msg => msg.id === assistantMessageId);
			if (errorMsg) {
				errorMsg.content = errorContent;
				errorMsg.parsedHtml = undefined; // Clear cache
			}
		} finally {
			isStreaming = false;
			streamingMessageId = '';
		}
	}

	function handleKeyPress(event: KeyboardEvent) {
		if (event.key === 'Enter' && !event.shiftKey) {
			event.preventDefault();
			sendMessage();
		}
	}


	function clearChat() {
		// Remove non-system messages by mutating the array
		for (let i = messages.length - 1; i >= 0; i--) {
			if (messages[i].role !== 'system') {
				messages.splice(i, 1);
			}
		}
		showSuggestions = true;
		hasUserInteracted = false;
	}

	function handleSuggestionClick(suggestion: string) {
		inputMessage = suggestion;
		sendMessage();
	}

	// Initialize OpenAI client on mount
	onMount(() => {
		initializeOpenAI();
	});
</script>

<div class="h-screen bg-white flex flex-col overflow-hidden">
	<!-- System Message Modal -->
	{#if showSystemMessage}
		<div class="fixed inset-0 z-50 flex items-center justify-center p-4">
			<!-- Glassmorphism backdrop -->
			<button 
				class="absolute inset-0 bg-black/20 backdrop-blur-md cursor-default" 
				onclick={() => showSystemMessage = false}
				aria-label="Close modal"
			></button>
			
			<!-- Modal content -->
			<div class="relative bg-white/90 backdrop-blur-xl rounded-3xl p-8 w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl border border-white/20">
				<!-- Header -->
				<div class="flex items-center justify-between mb-8">
					<div>
						<h2 class="text-2xl font-semibold text-gray-900 mb-1">System Prompt</h2>
						<p class="text-sm text-gray-600">Define how the AI should behave and respond</p>
					</div>
					<button
						onclick={() => showSystemMessage = false}
						class="w-10 h-10 rounded-full bg-gray-100/80 hover:bg-gray-200/80 backdrop-blur-sm flex items-center justify-center transition-all active:scale-95"
						aria-label="Close system prompt"
					>
						<svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
						</svg>
					</button>
				</div>
				
				<!-- Content Display -->
				<div class="flex-1 overflow-y-auto mb-8">
					<div class="bg-gray-50/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50">
						<pre class="whitespace-pre-wrap break-words overflow-x-auto font-mono text-[13px] leading-5 text-gray-800">
							{getSystemMessage() || "No system prompt configured"}
						</pre>
					</div>
				</div>
				
				<!-- Actions -->
				<div class="flex gap-4">
					<button
						onclick={() => showSystemMessage = false}
						class="flex-1 px-6 py-4 bg-blue-500/90 hover:bg-blue-600/90 backdrop-blur-sm text-white rounded-2xl font-medium transition-all active:scale-95 shadow-lg"
					>
						Close
					</button>
				</div>
			</div>
		</div>
	{/if}

	<!-- Header -->
	<div class="flex-shrink-0 bg-white border-b border-gray-100 px-4 sm:px-6 py-4">
		<div class="max-w-3xl mx-auto flex items-center justify-between">
			<div>
				<h1 class="text-xl sm:text-2xl font-semibold text-gray-900">Chat</h1>
				<p class="text-sm text-gray-600 mt-1 hidden sm:block">Powered by MarkdownUI</p>
			</div>
			<div class="flex items-center gap-2 sm:gap-3">
				<button
					onclick={() => showSystemMessage = true}
					class="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gray-100 hover:bg-gray-200 active:bg-gray-300 flex items-center justify-center transition-colors"
					aria-label="Open system prompt"
				>
					<svg class="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
					</svg>
				</button>
				<button
					onclick={clearChat}
					class="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gray-100 hover:bg-gray-200 active:bg-gray-300 flex items-center justify-center transition-colors"
					aria-label="Clear chat history"
				>
					<svg class="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
					</svg>
				</button>
			</div>
		</div>
	</div>

	<!-- Messages Container -->
	<div class="flex-1 overflow-y-auto">
		<div bind:this={messagesContainer} class="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-4 sm:space-y-6">
			{#if messages.filter(m => m.role !== 'system').length === 0}
				<div class="text-center py-12">
					<div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
						<svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
						</svg>
					</div>
					<h2 class="text-xl font-semibold text-gray-900 mb-2">Welcome to MarkdownUI Chat</h2>
					<p class="text-gray-600 mb-8">Start a conversation and see interactive widgets come to life!</p>
					
					<!-- Suggestion Buttons -->
					{#if showSuggestions}
						<div class="flex flex-wrap gap-3 justify-center max-w-lg mx-auto">
							<button 
								onclick={() => handleSuggestionClick("Show me Bitcoin vs Ethereum price trends")}
								class="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-full text-sm font-medium transition-colors"
							>
								📊 Crypto Trends
							</button>
							<button 
								onclick={() => handleSuggestionClick("Create a startup growth dashboard")}
								class="px-4 py-2 bg-green-50 hover:bg-green-100 text-green-700 rounded-full text-sm font-medium transition-colors"
							>
								📈 Growth Dashboard
							</button>
							<button 
								onclick={() => handleSuggestionClick("Design a coffee shop menu configurator")}
								class="px-4 py-2 bg-amber-50 hover:bg-amber-100 text-amber-700 rounded-full text-sm font-medium transition-colors"
							>
								☕ Menu Builder
							</button>
							<button 
								onclick={() => handleSuggestionClick("Build a Mars mission control panel")}
								class="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-700 rounded-full text-sm font-medium transition-colors"
							>
								🚀 Mission Control
							</button>
						</div>
					{/if}
				</div>
			{/if}

			{#each messages.filter(m => m.role !== 'system') as message (message.id)}
				<div class="flex gap-3 sm:gap-4 {message.role === 'user' ? 'flex-row-reverse' : ''}">
					<!-- Avatar -->
					<div class="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center {message.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} font-medium text-xs sm:text-sm">
						{message.role === 'user' ? 'Y' : 'AI'}
					</div>
					
					<!-- Message Content -->
					<div class="flex-1 max-w-2xl">
						<div class="mb-2">
							<span class="text-sm font-medium text-gray-900">
								{message.role === 'user' ? 'You' : 'Assistant'}
							</span>
							<span class="text-xs text-gray-500 ml-2">
								{message.timestamp.toLocaleTimeString()}
							</span>
						</div>
						
						<div class="rounded-2xl px-3 py-2 sm:px-4 sm:py-3 {message.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-50 text-gray-900'} prose prose-sm max-w-none">
							<MarkdownUI 
								html={message.parsedHtml || marked.parse(message.content)} 
								onwidgetevent={handleWidgetEvent} 
							/>
							
							<!-- Streaming indicator -->
							{#if isStreaming && message.id === streamingMessageId}
								<div class="flex items-center gap-2 mt-3 pt-3 border-t {message.role === 'user' ? 'border-blue-400' : 'border-gray-200'}">
									<div class="flex gap-1">
										<div class="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
										<div class="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
										<div class="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
									</div>
									<span class="text-sm {message.role === 'user' ? 'text-blue-100' : 'text-gray-600'}">AI is thinking...</span>
								</div>
							{/if}
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>

	<!-- Input Area -->
	<div class="flex-shrink-0 bg-white border-t border-gray-100 px-4 sm:px-6 py-4 safe-area-inset-bottom">
		<div class="max-w-3xl mx-auto">
			<div class="flex gap-2 sm:gap-3 items-end">
				<div class="flex-1 relative">
					<textarea
						bind:value={inputMessage}
						onkeydown={handleKeyPress}
						placeholder="Message..."
						class="w-full px-3 py-3 sm:px-4 bg-gray-50 rounded-2xl border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white resize-none text-base transition-all max-h-32 min-h-[48px] sm:min-h-[52px]"
						rows="1"
						disabled={isLoading || isStreaming}
					></textarea>
				</div>
				<button
					onclick={sendMessage}
					disabled={!inputMessage.trim() || isLoading || isStreaming}
					class="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-full flex items-center justify-center transition-all active:scale-95 flex-shrink-0"
				>
					{#if isLoading || isStreaming}
						<div class="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
					{:else}
						<svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
						</svg>
					{/if}
				</button>
			</div>
		</div>
	</div>
</div>
