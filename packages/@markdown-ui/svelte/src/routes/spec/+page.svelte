<script>
  import { MarkdownUI } from '$lib';
  import "$lib/widgets.css";

  import { Marked } from 'marked';
  import { markedUiExtension } from "@markdown-ui/marked-ext";
  
  const marked = new Marked();
  marked.use(markedUiExtension); 
  
  const specContent = `# Markdown UI Technical Specification
**Version:** 0.1
**Status:** Alpha  
**Date:** 10 August 2025

## Overview

Markdown UI is a specification for embedding interactive widgets within Markdown content using fenced code blocks with a standardized JSON payload. The specification defines a two-stage processing pipeline that separates parsing from rendering to enable maximum flexibility across different platforms and frameworks.

## Architecture

### 2.1 Processing Pipeline

The Markdown UI specification defines a two-stage processing pipeline:

1. **Parser Stage**: Converts \`markdown-ui-widget\` fenced code blocks into standardized XML tags
2. **Renderer Stage**: Transforms XML tags into framework-specific interactive components

### 2.2 Design Principles

- **Framework Agnostic**: Any Markdown parser can be combined with any UI renderer
- **Progressive Enhancement**: Graceful fallback to code blocks when rendering is unavailable
- **Security First**: JSON-only payloads prevent code injection attacks
- **Event Standardization**: Consistent event interface across all widget types

## Specification Format

### 3.1 Input Format

Widgets are declared using fenced code blocks with the language identifier \`markdown-ui-widget\`:

\`\`\`\`markdown
\`\`\`markdown-ui-widget
{ "type": "widgetType", "id": "uniqueId", ...properties }
\`\`\`
\`\`\`\`

### 3.2 JSON Schema Requirements

All widget declarations MUST:
- Be valid JSON (RFC 7159)
- Include a \`type\` property specifying the widget type
- Include an \`id\` property for event identification (optional, auto-generated if omitted)
- Use double quotes for all strings
- Not include trailing commas or comments

### 3.3 Intermediate XML Format

Parsers MUST transform widget declarations into the following XML format:

\`\`\`xml
<markdown-ui-widget id="generated_id" content="base64_encoded_json_payload"></markdown-ui-widget>
\`\`\`

**Attributes:**
- \`id\`: Unique identifier (generated if not provided in JSON)
- \`content\`: Base64-encoded original JSON payload

## Widget Event Interface

### 4.1 Event Structure

All widget interactions MUST emit events conforming to this interface:

\`\`\`typescript
interface WidgetEvent {
  id: string;       // Widget identifier
  value: unknown;   // Current widget value
}
\`\`\`

### 4.2 Event Emission

- Events MUST be emitted on user interaction
- Event values MUST reflect the current widget state
- Events SHOULD be emitted immediately upon value change

## Standard Widget Types

### 5.1 textInput

**Purpose**: Single-line text input

**Schema**:
\`\`\`typescript
{
  type: "textInput";
  id?: string;
  label?: string;
  placeholder?: string;
  default?: string;
}
\`\`\`

**Event Value**: \`string\`

**Example**:
\`\`\`json
{ "type": "textInput", "id": "username", "label": "Username", "placeholder": "Enter username", "default": "" }
\`\`\`

### 5.2 buttonGroup

**Purpose**: Single selection from predefined options

**Schema**:
\`\`\`typescript
{
  type: "buttonGroup";
  id?: string;
  label?: string;
  choices: string[];
  default?: string; // Must be one of choices
}
\`\`\`

**Event Value**: \`string\`

**Example**:
\`\`\`json
{ "type": "buttonGroup", "id": "env", "label": "Environment", "choices": ["dev", "staging", "prod"], "default": "dev" }
\`\`\`

### 5.3 select

**Purpose**: Dropdown selection

**Schema**:
\`\`\`typescript
{
  type: "select";
  id?: string;
  label?: string;
  choices: string[];
  default?: string; // Must be one of choices
}
\`\`\`

**Event Value**: \`string\`

**Example**:
\`\`\`json
{ "type": "select", "id": "region", "label": "AWS Region", "choices": ["us-east-1", "us-west-2", "eu-west-1"], "default": "us-east-1" }
\`\`\`

### 5.4 selectMulti

**Purpose**: Multiple selection from predefined options

**Schema**:
\`\`\`typescript
{
  type: "selectMulti";
  id?: string;
  label?: string;
  choices: string[];
  default?: string | string[]; // Must be subset of choices
}
\`\`\`

**Event Value**: \`string[]\`

**Example**:
\`\`\`json
{ "type": "selectMulti", "id": "services", "label": "Services", "choices": ["redis", "postgres", "nginx"], "default": ["redis"] }
\`\`\`

### 5.5 slider

**Purpose**: Numeric input with range constraints

**Schema**:
\`\`\`typescript
{
  type: "slider";
  id?: string;
  label?: string;
  min: number;
  max: number;
  step?: number; // Default: 1
  default?: number; // Must be within [min, max]
}
\`\`\`

**Event Value**: \`number\`

**Example**:
\`\`\`json
{ "type": "slider", "id": "cpu", "label": "CPU Cores", "min": 1, "max": 32, "step": 1, "default": 4 }
\`\`\`

### 5.6 form

**Purpose**: Composite widget containing multiple fields

**Schema**:
\`\`\`typescript
{
  type: "form";
  id?: string;
  submitLabel?: string;
  fields: Widget[]; // Array of other widget definitions
}
\`\`\`

**Event Value**: \`Record<string, unknown>\` (object with field IDs as keys)

**Example**:
\`\`\`json
{
  "type": "form",
  "id": "server-config",
  "submitLabel": "Deploy",
  "fields": [
    { "type": "select", "id": "env", "choices": ["dev", "prod"] },
    { "type": "slider", "id": "replicas", "min": 1, "max": 10, "default": 3 }
  ]
}
\`\`\`

## Implementation Guidelines

### 6.1 Parser Requirements

Parsers MUST:
- Detect \`markdown-ui-widget\` fenced code blocks
- Validate JSON syntax
- Generate unique IDs when not provided
- Encode payloads in Base64
- Convert to standardized XML format

### 6.2 Renderer Requirements

Renderers MUST:
- Parse Base64-encoded JSON payloads
- Implement all standard widget types
- Emit events conforming to the WidgetEvent interface
- Handle malformed payloads gracefully
- Provide fallback rendering for unsupported widget types

### 6.3 Error Handling

- Invalid JSON SHOULD be rendered as code blocks
- Unsupported widget types SHOULD be rendered as code blocks
- Missing required properties SHOULD be handled with sensible defaults

## Extension Points

### 7.1 Custom Widget Types

Implementations MAY support additional widget types by:
- Defining custom type strings (prefixed with implementation name recommended)
- Implementing renderer support
- Maintaining consistent event interface

### 7.2 Custom Properties

Standard widgets MAY accept implementation-specific properties that:
- Do not conflict with standard properties
- Are ignored by other implementations
- Maintain backward compatibility

## Security Considerations

- JSON payloads prevent code injection
- Base64 encoding ensures safe transport
- No executable code in widget definitions
- Event values should be sanitized by consuming applications

## Conformance

### 9.1 Parser Conformance

A conformant parser MUST:
- Support all standard widget types
- Generate valid XML output
- Handle edge cases gracefully

### 9.2 Renderer Conformance

A conformant renderer MUST:
- Implement all standard widget types
- Emit standard event format
- Provide graceful fallbacks

## Examples

See the [Home page](/) for interactive examples of all widget types.

## Reference Implementations

- **Parser**: [@markdown-ui/marked-ext](https://www.npmjs.com/package/@markdown-ui/marked-ext)
- **Svelte Renderer**: [@markdown-ui/svelte](https://www.npmjs.com/package/@markdown-ui/svelte)  
- **React Renderer**: [@markdown-ui/react](https://www.npmjs.com/package/@markdown-ui/react)

---

*This specification is maintained at [github.com/BlueprintDesignLab/markdown-ui](https://github.com/BlueprintDesignLab/markdown-ui)*
`;
</script>

<div class="spec-container">
  <div class="spec-content">
    <MarkdownUI html={marked.parse(specContent)} />
  </div>
</div>

<style>
  .spec-container {
    max-width: 1100px;
    margin: 0 auto;
    padding: 2rem;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background: #ffffff;
    min-height: calc(100vh - 4rem);
  }
  
  .spec-content {
    line-height: 1.7;
    font-size: 1rem;
  }
  
  /* Enhanced typography for technical spec */
  :global(.spec-content h1) {
    color: #1f2937;
    font-size: 2.25rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    padding-bottom: 0.75rem;
    border-bottom: 2px solid #e5e7eb;
  }
  
  :global(.spec-content h2) {
    color: #374151;
    font-size: 1.75rem;
    font-weight: 600;
    margin: 3rem 0 1.5rem 0;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid #e5e7eb;
  }
  
  :global(.spec-content h3) {
    color: #4b5563;
    font-size: 1.25rem;
    font-weight: 600;
    margin: 2rem 0 1rem 0;
  }
  
  :global(.spec-content p) {
    color: #374151;
    margin-bottom: 1.25rem;
    text-align: justify;
  }
  
  :global(.spec-content strong) {
    color: #1f2937;
    font-weight: 600;
  }
  
  :global(.spec-content ul) {
    margin: 1rem 0 1.5rem 1.5rem;
    color: #4b5563;
  }
  
  :global(.spec-content li) {
    margin-bottom: 0.5rem;
    line-height: 1.6;
  }
  
  :global(.spec-content code) {
    background: #f1f5f9;
    color: #475569;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-size: 0.9em;
    font-family: 'SF Mono', Monaco, 'Cascadia Code', monospace;
    font-weight: 500;
  }
  
  :global(.spec-content pre) {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 1rem;
    margin: 1.5rem 0;
    overflow-x: auto;
    font-size: 0.875rem;
    line-height: 1.5;
  }
  
  :global(.spec-content pre code) {
    background: transparent;
    padding: 0;
    color: #475569;
    font-size: inherit;
  }
  
  :global(.spec-content a) {
    color: #3b82f6;
    text-decoration: none;
    font-weight: 500;
  }
  
  :global(.spec-content a:hover) {
    text-decoration: underline;
    color: #2563eb;
  }
  
  /* Table of contents style numbering */
  :global(.spec-content h2::before) {
    content: counter(h2-counter) ". ";
    counter-increment: h2-counter;
    color: #6b7280;
    font-weight: 400;
  }
  
  :global(.spec-content) {
    counter-reset: h2-counter;
  }
  
  /* Special styling for metadata at the top */
  :global(.spec-content p:first-of-type),
  :global(.spec-content p:nth-of-type(2)),
  :global(.spec-content p:nth-of-type(3)) {
    font-family: 'SF Mono', Monaco, monospace;
    font-size: 0.9rem;
    color: #6b7280;
    margin-bottom: 0.5rem;
  }
  
  /* Horizontal rule styling */
  :global(.spec-content hr) {
    border: none;
    height: 1px;
    background: #e5e7eb;
    margin: 3rem 0;
  }
  
  @media (max-width: 768px) {
    .spec-container {
      padding: 1.5rem;
      max-width: 100%;
    }
    
    .spec-content {
      font-size: 0.95rem;
      line-height: 1.6;
    }
    
    :global(.spec-content h1) {
      font-size: 1.875rem;
    }
    
    :global(.spec-content h2) {
      font-size: 1.5rem;
      margin: 2.5rem 0 1.25rem 0;
    }
    
    :global(.spec-content h3) {
      font-size: 1.125rem;
      margin: 1.5rem 0 0.75rem 0;
    }
  }
  
  @media (max-width: 480px) {
    .spec-container {
      padding: 1rem;
    }
    
    .spec-content {
      font-size: 0.9rem;
      line-height: 1.5;
    }
    
    :global(.spec-content h1) {
      font-size: 1.625rem;
    }
    
    :global(.spec-content h2) {
      font-size: 1.25rem;
    }
    
    :global(.spec-content pre) {
      padding: 0.75rem;
      font-size: 0.8rem;
    }
  }
  
</style>