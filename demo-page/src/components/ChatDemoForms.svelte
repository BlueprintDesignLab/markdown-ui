<script lang="ts">
	import OpenAI from 'openai';
	import { onMount, tick } from 'svelte';

    import { MarkdownUI } from '@markdown-ui/svelte';
    import '@markdown-ui/svelte/widgets.css';

    import { Marked } from 'marked';
    import { markedUiExtension } from "@markdown-ui/marked-ext";

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
You are TravelBot, an expert trip planning assistant that uses interactive forms to gather user preferences and create personalized travel recommendations.

ALWAYS use exactly one markdown-ui widget in your response. Focus on form-based interactions with buttons, selects, sliders, and multi-step forms.

Your personality: Enthusiastic, knowledgeable, and detail-oriented. You love helping people discover amazing destinations!

**Available Widget Types:**

1. **Button Groups** - For quick selections:
\`\`\`markdown-ui-widget
button-group travel_type [Adventure Relaxation Cultural Foodie Business] Cultural
\`\`\`

2. **Dropdowns** - For location and category selections:
\`\`\`markdown-ui-widget
select destination ["Tokyo, Japan" "Paris, France" "Bali, Indonesia" "Iceland" "New York, USA" "Marrakech, Morocco"] "Tokyo, Japan"
\`\`\`

3. **Sliders** - For budget, duration, group size:
\`\`\`markdown-ui-widget
slider budget 500 10000 250 2500
\`\`\`

4. **Text Input** - For specific requirements:
\`\`\`markdown-ui-widget
text-input special_requirements "Special Requirements" "Any dietary restrictions, accessibility needs, or specific interests?" ""
\`\`\`

5. **Multi-step Forms** - For comprehensive planning:
\`\`\`markdown-ui-widget
form trip_details "Plan Your Dream Trip ✈️"
  select destination ["Tokyo, Japan" "Paris, France" "Bali, Indonesia" "Iceland" "New York, USA" "Marrakech, Morocco" "Custom Location"] "Tokyo, Japan"
  button-group travel_style [Luxury Budget Backpacking Family Business Adventure] Family
  slider duration 3 30 1 7
  slider group_size 1 10 1 2
  text-input interests "Main Interests" "beaches, museums, food, nightlife, hiking..."
\`\`\`

**Conversation Flow:**
1. Start with basic travel preferences (type, destination ideas)
2. Gather specifics (budget, dates, group details) 
3. Collect preferences (activities, accommodation, dining)
4. Create personalized recommendations
5. Offer booking assistance or additional planning

**Response Style:**
- Always enthusiastic about travel
- Provide helpful context for form options
- Use emojis sparingly but effectively
- Keep responses concise (2-3 sentences max)
- Reference user's previous inputs to build on their trip plan

**Never:**
- Show charts or data visualizations 
- Use multiple widgets in one response
- Provide generic travel advice without gathering preferences first
`;

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
					
					const streamingMsg = messages.find(msg => msg.id === assistantMessageId);
					if (streamingMsg) {
						streamingMsg.content = streamedContent;
						streamingMsg.parsedHtml = undefined;
					}
				}
			}

		} catch (error) {
			console.error('Error sending message:', error);
			const errorContent = `Error: ${error instanceof Error ? error.message : 'Failed to send message'}`;
			
			const errorMsg = messages.find(msg => msg.id === assistantMessageId);
			if (errorMsg) {
				errorMsg.content = errorContent;
				errorMsg.parsedHtml = undefined;
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

	onMount(() => {
		initializeOpenAI();
	});
</script>

<div class="h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col overflow-hidden">
	<!-- System Message Modal -->
	{#if showSystemMessage}
		<div class="fixed inset-0 z-50 flex items-center justify-center p-4">
			<button 
				class="absolute inset-0 bg-black/20 backdrop-blur-md cursor-default" 
				onclick={() => showSystemMessage = false}
				aria-label="Close modal"
			></button>
			
			<div class="relative bg-white/90 backdrop-blur-xl rounded-3xl p-8 w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl border border-white/20">
				<div class="flex items-center justify-between mb-8">
					<div>
						<h2 class="text-2xl font-semibold text-gray-900 mb-1">System Prompt</h2>
						<p class="text-sm text-gray-600">TravelBot's personality and behavior settings</p>
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
				
				<div class="flex-1 overflow-y-auto mb-8">
					<div class="bg-gray-50/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50">
						<pre class="whitespace-pre-wrap break-words overflow-x-auto font-mono text-[13px] leading-5 text-gray-800">
							{getSystemMessage() || "No system prompt configured"}
						</pre>
					</div>
				</div>
				
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
	<div class="flex-shrink-0 bg-white/80 backdrop-blur-xl border-b border-white/20 px-4 sm:px-6 py-4 shadow-sm">
		<div class="max-w-3xl mx-auto flex items-center justify-between">
			<div>
				<h1 class="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
					✈️ TravelBot
				</h1>
				<p class="text-sm text-gray-600 mt-1 hidden sm:block">Your AI trip planning assistant</p>
			</div>
			<div class="flex items-center gap-2 sm:gap-3">
				<button
					onclick={() => showSystemMessage = true}
					class="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/70 hover:bg-white/90 active:bg-white flex items-center justify-center transition-all backdrop-blur-sm"
					aria-label="Open system prompt"
				>
					<svg class="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
					</svg>
				</button>
				<button
					onclick={clearChat}
					class="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/70 hover:bg-white/90 active:bg-white flex items-center justify-center transition-all backdrop-blur-sm"
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
					<div class="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
						<span class="text-2xl">🗺️</span>
					</div>
					<h2 class="text-2xl font-bold text-gray-900 mb-3">Ready to Plan Your Next Adventure?</h2>
					<p class="text-gray-600 mb-8 max-w-md mx-auto">I'll help you create the perfect trip using interactive forms to understand your preferences!</p>
					
					{#if showSuggestions}
						<div class="flex flex-wrap gap-3 justify-center max-w-lg mx-auto">
							<button 
								onclick={() => handleSuggestionClick("I want to plan a romantic getaway")}
								class="px-5 py-3 bg-pink-100 hover:bg-pink-200 text-pink-800 rounded-full text-sm font-medium transition-all transform hover:scale-105"
							>
								💕 Romantic Getaway
							</button>
							<button 
								onclick={() => handleSuggestionClick("Plan a family vacation with kids")}
								class="px-5 py-3 bg-green-100 hover:bg-green-200 text-green-800 rounded-full text-sm font-medium transition-all transform hover:scale-105"
							>
								👨‍👩‍👧‍👦 Family Trip
							</button>
							<button 
								onclick={() => handleSuggestionClick("I'm looking for an adventure travel experience")}
								class="px-5 py-3 bg-orange-100 hover:bg-orange-200 text-orange-800 rounded-full text-sm font-medium transition-all transform hover:scale-105"
							>
								🏔️ Adventure Travel
							</button>
							<button 
								onclick={() => handleSuggestionClick("Help me plan a solo backpacking trip")}
								class="px-5 py-3 bg-purple-100 hover:bg-purple-200 text-purple-800 rounded-full text-sm font-medium transition-all transform hover:scale-105"
							>
								🎒 Solo Adventure
							</button>
						</div>
					{/if}
				</div>
			{/if}

			{#each messages.filter(m => m.role !== 'system') as message (message.id)}
				<div class="flex gap-3 sm:gap-4 {message.role === 'user' ? 'flex-row-reverse' : ''}">
					<div class="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-semibold text-xs sm:text-sm shadow-md {message.role === 'user' ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white' : 'bg-gradient-to-br from-orange-400 to-red-500 text-white'}">
						{message.role === 'user' ? '👤' : '✈️'}
					</div>
					
					<div class="flex-1 max-w-2xl">
						<div class="mb-2">
							<span class="text-sm font-semibold text-gray-900">
								{message.role === 'user' ? 'You' : 'TravelBot'}
							</span>
							<span class="text-xs text-gray-500 ml-2">
								{message.timestamp.toLocaleTimeString()}
							</span>
						</div>
						
						<div class="rounded-2xl px-3 py-2 sm:px-4 sm:py-3 shadow-sm {message.role === 'user' ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white' : 'bg-white/90 backdrop-blur-sm text-gray-900 border border-white/20'} prose prose-sm max-w-none">
							<MarkdownUI 
								html={message.parsedHtml || marked.parse(message.content)} 
								onwidgetevent={handleWidgetEvent} 
							/>
							
							{#if isStreaming && message.id === streamingMessageId}
								<div class="flex items-center gap-2 mt-3 pt-3 border-t {message.role === 'user' ? 'border-blue-400' : 'border-gray-200/50'}">
									<div class="flex gap-1">
										<div class="w-2 h-2 bg-orange-500 rounded-full animate-bounce"></div>
										<div class="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
										<div class="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
									</div>
									<span class="text-sm {message.role === 'user' ? 'text-blue-100' : 'text-gray-600'}">Planning your trip...</span>
								</div>
							{/if}
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>

	<!-- Input Area -->
	<div class="flex-shrink-0 bg-white/80 backdrop-blur-xl border-t border-white/20 px-4 sm:px-6 py-4 safe-area-inset-bottom">
		<div class="max-w-3xl mx-auto">
			<div class="flex gap-2 sm:gap-3 items-end">
				<div class="flex-1 relative">
					<textarea
						bind:value={inputMessage}
						onkeydown={handleKeyPress}
						placeholder="Tell me about your dream trip..."
						class="w-full px-3 py-3 sm:px-4 bg-white/70 backdrop-blur-sm rounded-2xl border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white/90 resize-none text-base transition-all max-h-32 min-h-[48px] sm:min-h-[52px] shadow-sm"
						rows="1"
						disabled={isLoading || isStreaming}
					></textarea>
				</div>
				<button
					onclick={sendMessage}
					disabled={!inputMessage.trim() || isLoading || isStreaming}
					class="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 active:from-blue-700 active:to-indigo-800 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white rounded-full flex items-center justify-center transition-all active:scale-95 flex-shrink-0 shadow-lg"
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