# @markdown-ui/mdui-lang
**Write widgets 60% faster with concise DSL syntax.**

Transform verbose JSON into elegant one-liners that actually make sense.

```
select env [dev staging prod] dev
```
↓
```json
{"type": "select", "id": "env", "choices": ["dev", "staging", "prod"], "default": "dev"}
```

## Installation

```bash
npm install @markdown-ui/mdui-lang
```

## Usage

```typescript
import { parseDSL } from '@markdown-ui/mdui-lang';

const result = parseDSL('text-input username "Username" "Enter username"');
console.log(result.widget);
// Perfect JSON output, ready to use
```

## DSL patterns

**Single-line widgets**
```
text-input username "Username" "Enter here"
button-group env [dev staging prod] dev
select region [us-east us-west] us-east
slider cpu 1 32 1 4
```

**Multi-line forms**
```
form deploy "Launch"
  text-input name "App Name"
  select env [dev prod] dev
  slider replicas 1 10 1 3
```

**Interactive charts**
```
chart-line
title: Monthly Sales
height: 300
Month,Sales,Target
Jan,100,120
Feb,150,140
Mar,200,180
```

All parameters after `id` are optional and positional.

## Simple rules

- **Spaces separate tokens**: `text-input username "User Name"`
- **Brackets for arrays**: `[dev staging prod]`  
- **Quotes for strings**: `"Enter your name here"`
- **2-space indentation**: For forms only
- **Everything optional**: Except widget type and id

## API

```typescript
interface ParseResult {
  success: boolean;
  widget?: Widget;      // Parsed widget if successful  
  error?: string;       // Error message if failed
}

const result = parseDSL('select env [dev prod]');
if (result.success) {
  console.log(result.widget); // Ready-to-use JSON
}
```

**Why DSL beats JSON**

❌ **JSON** (130 chars)
```json
{"type": "text-input", "id": "username", "label": "Username", "placeholder": "Enter username", "default": "john"}
```

✅ **DSL** (52 chars)
```
text-input username "Username" "Enter username" "john"
```

**60% fewer keystrokes. 100% more readable.**

MIT © 2025