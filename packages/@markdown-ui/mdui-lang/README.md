# @markdown-ui/mdui-lang

A concise DSL parser for markdown-ui widgets that converts ergonomic syntax to JSON format.

## Installation

```bash
npm install @markdown-ui/mdui-lang
```

## Usage

```typescript
import { parseDSL } from '@markdown-ui/mdui-lang';

// Parse simple widgets
const result = parseDSL('text-input username "Username" "Enter username"');
console.log(result.widget);
// {
//   type: 'textInput',
//   id: 'username', 
//   label: 'Username',
//   placeholder: 'Enter username'
// }
```

## DSL Syntax

### Atomic Widgets (single line)

```
text-input id label placeholder default
button-group id [choice1 choice2 ...] default
select id [choice1 choice2 ...] default  
select-multi id [choice1 choice2 ...] default
slider id min max step default
```

*All parameters after `id` are optional unless noted*

### Form Widget (header + indented fields)

```
form id submitLabel
  text-input id label placeholder default
  select id [choice1 choice2 ...] default
  ...
```

## Examples

### Text Input
```
text-input username "Username" "Enter username" "john"
text-input email                                        // minimal
```

### Button Group
```
button-group env [dev staging prod] dev
button-group confirm [yes no]                           // no default
```

### Select Dropdown
```
select region [us-east-1 us-west-2 eu-west-1] us-east-1
select size [small medium large]                        // no default
```

### Multi-Select
```
select-multi services [redis postgres nginx] redis      // single default
select-multi services [redis postgres nginx] [redis postgres]  // array default
select-multi tags [urgent bug feature]                  // no default
```

### Slider
```
slider cpu 1 32 1 4                                     // with default
slider memory 0 128 8                                   // no default
```

### Form
```
form server-config "Deploy"
  select env [dev prod] dev
  slider replicas 1 10 1 3
  text-input name "Server Name"
```

## Rules

- Tokens separated by **one or more spaces**
- Arrays wrapped in `[]`; items separated by **spaces**  
- Strings containing spaces or brackets must be **double-quoted**
- Form fields indented **2 spaces**
- Parameters after `id` are positional and optional

## API

### `parseDSL(input: string): ParseResult`

Parses DSL input and returns a result object:

```typescript
interface ParseResult {
  success: boolean;
  widget?: Widget;      // Parsed widget if successful
  error?: string;       // Error message if failed
}
```

## Comparison

**Traditional JSON:**
```json
{ "type": "textInput", "id": "username", "label": "Username", "placeholder": "Enter username", "default": "john" }
```

**DSL:**
```
text-input username "Username" "Enter username" "john"
```

The DSL is **60-70% more concise** than equivalent JSON!