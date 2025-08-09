import "clsx";
import { B as pop, z as push } from "../../../chunks/index2.js";
import { M as MarkdownUI } from "../../../chunks/MarkdownUI.js";
/* empty css                      */
import { Marked } from "marked";
import { markedUiExtension } from "@markdown-ui/marked-ext";
function _page($$payload, $$props) {
  push();
  const marked = new Marked();
  marked.use(markedUiExtension);
  const specContent = `# Markdown UI Specification

## Overview

Markdown UI is an micro-spec for embedding interactive widgets directly within markdown content. 
The system consists of two main components that work together to transform markdown with special code blocks into interactive user interfaces.

## Workflow

### 1. Parser
**Responsibility**: Convert \`\`\`markdown-ui-widget\` code blocks into standardized XML tags

The parser transforms this:
\`\`\`
\`\`\`markdown-ui-widget
{ "type": "select", "id": "env", "choices": ["dev", "prod"] }
\`\`\`
\`\`\`

Into this:
\`\`\`xml
<markdown-ui-widget id="unique_generated_id" content="base64_encoded_payload"></markdown-ui-widget>
\`\`\`

### 2. Renderer  
**Responsibility**: Convert XML tags into interactive UI components and handle user interactions

The renderer:
- Parses the XML tags
- Decodes the base64 payload back to the original widget configuration
- Creates interactive UI components based on the widget specification
- Emits standardized events when users interact with widgets

## Implementation Details

### Parser Process
1. **Detection**: Find \`\`\`markdown-ui-widget code blocks in markdown
2. **Validation**: Parse and validate JSON widget specifications
3. **ID Generation**: Generate unique IDs for each widget instance
4. **Encoding**: Base64 encode the widget configuration
5. **Transformation**: Replace code blocks with standardized XML tags

### Renderer Process  
1. **XML Parsing**: Find and parse \`<markdown-ui-widget>\` tags
2. **Payload Decoding**: Decode base64 content back to widget config
3. **Component Creation**: Instantiate appropriate UI components
4. **Event Binding**: Set up event handlers for user interactions
5. **Event Emission**: Emit standardized \`{id, value}\` events

Note: the renderer can store internal states and emit events however it likes.

## Implementation Examples

### Current Implementations

- **Parser**: \`@markdown-ui/marked-ext\` (marked.js extension)
- **Renderer**: \`@markdown-ui/svelte\` (Svelte components)

### Alternative Implementations

The micro-spec supports any parser/renderer combination:

- **remarkable** parser with **React** renderer  
- **markdown-it** parser with **Vue** renderer
- **unified/remark** parser with **Angular** renderer
- Custom parsers with native mobile renderers

## Use Cases

### LLM Integration
The primary use case is enabling LLMs to generate interactive UIs instead of plain text responses:

1. **LLM Response**: LLM generates markdown with \`markdown-ui-widget\` blocks
2. **Parser**: Converts to standardized XML format  
3. **Renderer**: Creates interactive UI
4. **User Interaction**: User interacts with widgets, generating events
5. **Application**: Handles events and sends appropriate responses back to LLM

### Example Workflow
LLM: "Please configure your deployment settings:"

\`\`\`markdown-ui-widget
{ "type": "form", "id": "deploy", "fields": [...] }
\`\`\`

→ User interacts with form
→ Event: {id: "deploy", value: {env: "prod", replicas: 3}}
→ Application sends to LLM: "User selected prod environment with 3 replicas"

## Extensibility

### Adding New Widget Types
1. Define widget specification schema
2. Update parser to recognize new widget types
3. Implement renderer components for new widgets
4. Ensure consistent event emission format

## Benefits

- **Separation of Concerns**: Parser and renderer are independent
- **Cross-Platform**: Any markdown parser can work with any UI renderer
- **Standardized Events**: Consistent event format across implementations  
- **LLM-Friendly**: Enables rich interactive experiences from AI-generated content
- **Progressive Enhancement**: Falls back to code blocks in non-supporting renderers

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
  $$payload.out.push(`<div class="spec-container svelte-1rudi91"><div class="spec-content svelte-1rudi91">`);
  MarkdownUI($$payload, { html: marked.parse(specContent) });
  $$payload.out.push(`<!----></div></div>`);
  pop();
}
export {
  _page as default
};
