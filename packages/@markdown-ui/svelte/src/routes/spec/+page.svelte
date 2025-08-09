<script>
  import { MarkdownUI } from '$lib';
  import "$lib/widgets.css";

  import { Marked } from 'marked';
  import { markedUiExtension } from "@markdown-ui/marked-ext";
  
  const marked = new Marked();
  marked.use(markedUiExtension); 
  
  const specContent = `# Markdown UI: Where Static Text Meets Interactive Magic ✨

## Transform Your Content Experience

Imagine turning any piece of markdown text into a dynamic, interactive experience with just a few lines of code. Markdown UI makes this reality by seamlessly embedding live widgets directly within your content—no complex setups, no framework lock-in, just pure interactive power.

## How It Works: Simple Yet Powerful

Markdown UI uses a brilliant two-stage approach that gives you maximum flexibility:

### 🔄 Stage 1: The Smart Parser
Your parser spots special \`markdown-ui-widget\` code blocks and transforms them into clean, standardized XML tags.

**From this human-readable format:**
\`\`\`\`
\`\`\`markdown-ui-widget
{ "type": "select", "id": "env", "choices": ["dev", "prod"] }
\`\`\`
\`\`\`\`

**To this optimized format:**
\`\`\`xml
<markdown-ui-widget id="unique_generated_id" content="base64_encoded_payload"></markdown-ui-widget>
\`\`\`

### 🎨 Stage 2: The Interactive Renderer  
Your renderer brings widgets to life by:
- Converting XML tags into beautiful, interactive components
- Managing widget state and user interactions  
- Emitting clean, predictable events when users engage
- Handling complex interactions with ease

The renderer has complete freedom to manage internal state and emit events in the most effective way possible.

## Ready-to-Use Implementations

### 🚀 Production-Ready Stack

- **Parser**: \`@markdown-ui/marked-ext\` (seamlessly integrates with marked.js)
- **Renderer**: \`@markdown-ui/svelte\` (lightning-fast Svelte components)

Explore the full codebase on [GitHub](https://github.com/BlueprintDesignLab/markdown-ui/)!

### 🔧 Build Your Own Stack

The beauty of Markdown UI is its flexibility—mix and match any combination:

- **remarkable** + **React** for component-rich applications  
- **markdown-it** + **Vue** for progressive web apps
- **unified/remark** + **Angular** for enterprise solutions
- Custom parsers + native mobile renderers for cross-platform apps

## Game-Changing Use Cases

### 🤖 Supercharge Your AI Applications

**The Problem**: LLMs generate static text responses that can't capture user input or preferences.

**The Solution**: LLMs can now generate fully interactive interfaces on-demand!

**The Magic Workflow:**
1. **AI Generates**: Your LLM creates markdown with embedded widgets
2. **Parser Processes**: Converts to standardized format  
3. **UI Renders**: Beautiful, interactive components appear instantly
4. **User Engages**: Real interactions generate meaningful data
5. **AI Responds**: Your application feeds user choices back to the LLM

**Real Example:**
*LLM Output*: "Let's configure your deployment pipeline:"

\`\`\`markdown-ui-widget
{ "type": "form", "id": "deploy", "fields": [...] }
\`\`\`

*User Experience*: Instantly interactive form appears
*Result*: Event {id: "deploy", value: {env: "prod", replicas: 3}}
*AI Context*: "Perfect! User chose production environment with 3 replicas"

### 💼 Revolutionary Non-AI Applications

**Interactive Documentation**: Transform boring API docs into hands-on experiences
- Live code examples users can modify and test
- Interactive configuration builders
- Real-time parameter adjustments

**Dynamic Content Management**: Empower content creators with interactive elements
- Live polls and surveys within articles
- Interactive tutorials and learning paths
- Data visualization widgets that respond to user input

**Enhanced User Experiences**: Build richer interfaces without complex frameworks
- Progressive forms that adapt based on user choices
- Interactive dashboards embedded in content
- Real-time collaboration tools within static sites

## Endless Extensibility

### Adding New Widget Types is Effortless:
1. **Design**: Define your widget's behavior and data schema
2. **Parse**: No work needs to be done here!
3. **Render**: Create the interactive component
4. **Connect**: Ensure consistent event handling

## Why Developers Love Markdown UI

### 🎯 **Separation of Concerns**
Parsers and renderers work independently—swap components without breaking your system

### 🌍 **Universal Compatibility**  
Any markdown parser works with any UI framework—build once, use everywhere

### 📡 **Predictable Events**
Standardized event format means reliable, debuggable interactions across all widgets

### 🚀 **AI-Native Design**
Built from the ground up to enable rich interactive experiences from AI-generated content

### 💪 **Progressive Enhancement**
Gracefully falls back to readable code blocks in environments that don't support rendering

### ⚡ **Zero Vendor Lock-in**
Switch parsers, renderers, or frameworks anytime without rewriting your content

## Widget Event Format

All widget interactions emit events in this standardized format:

\`\`\`typescript
interface WidgetEvent {
  id: string;    // The unique widget identifier
  value: any;    // The current value of the widget
}
\`\`\`

## Supported Widget Types

### Basic Widgets

#### Button Group
\`\`\`markdown-ui-widget
{ "type": "buttonGroup", "id": "mode", "label": "Mode", "choices": ["A", "B", "C"], "default": "A" }
\`\`\`

#### Select Dropdown
\`\`\`markdown-ui-widget
{ "type": "select", "id": "env", "label": "Environment", "choices": ["dev", "staging", "prod"], "default": "dev" }
\`\`\`

#### Multi-Select
\`\`\`markdown-ui-widget
{ "type": "selectMulti", "id": "tags", "label": "Tags", "choices": ["tag1", "tag2", "tag3"], "default": ["tag1"] }
\`\`\`

#### Slider
\`\`\`markdown-ui-widget
{ "type": "slider", "id": "volume", "label": "Volume", "min": 0, "max": 100, "step": 5, "default": 50 }
\`\`\`

#### Text Input
\`\`\`markdown-ui-widget
{ "type": "textInput", "id": "name", "label": "Name", "placeholder": "Enter name...", "default": "" }
\`\`\`

### Composite Widgets

#### Form
\`\`\`markdown-ui-widget
{
  "type": "form",
  "id": "config-form",
  "submitLabel": "Submit",
  "fields": [
    { "type": "select", "id": "env", "label": "Environment", "choices": ["dev", "prod"] },
    { "type": "slider", "id": "timeout", "label": "Timeout", "min": 1, "max": 60, "default": 30 }
  ]
}
\`\`\`


`;
</script>

<div class="spec-container">
  <div class="spec-content">
    <MarkdownUI html={marked.parse(specContent)} />
  </div>
</div>

<style>
  .spec-container {
    max-width: 1000px;
    margin: 0 auto;
    padding: 2rem;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }
  
  .spec-content {
    line-height: 1.6;
  }
  
  @media (max-width: 768px) {
    .spec-container {
      padding: 1rem;
    }
  }
  
</style>