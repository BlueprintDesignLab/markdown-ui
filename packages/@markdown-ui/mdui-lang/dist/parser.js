export class DSLParser {
    parse(input) {
        try {
            const tokens = this.tokenize(input.trim());
            if (tokens.length === 0) {
                return { success: false, error: "Empty input" };
            }
            const widgetType = tokens[0];
            switch (widgetType) {
                case 'text-input':
                    return this.parseTextInput(tokens);
                case 'button-group':
                    return this.parseButtonGroup(tokens);
                case 'select':
                    return this.parseSelect(tokens);
                case 'select-multi':
                    return this.parseSelectMulti(tokens);
                case 'slider':
                    return this.parseSlider(tokens);
                case 'form':
                    return this.parseForm(tokens, input);
                default:
                    return { success: false, error: `Unknown widget type: ${widgetType}` };
            }
        }
        catch (error) {
            return { success: false, error: error instanceof Error ? error.message : String(error) };
        }
    }
    tokenize(input) {
        const tokens = [];
        let current = '';
        let inQuotes = false;
        let inArray = false;
        let i = 0;
        while (i < input.length) {
            const char = input[i];
            if (char === '"' && !inArray) {
                inQuotes = !inQuotes;
                i++;
                continue;
            }
            if (char === '[' && !inQuotes) {
                inArray = true;
                i++;
                continue;
            }
            if (char === ']' && !inQuotes && inArray) {
                inArray = false;
                tokens.push(`[${current.trim()}]`);
                current = '';
                i++;
                continue;
            }
            if (char === ' ' && !inQuotes && !inArray) {
                if (current.trim()) {
                    tokens.push(current.trim());
                    current = '';
                }
                i++;
                continue;
            }
            current += char;
            i++;
        }
        if (current.trim()) {
            tokens.push(current.trim());
        }
        return tokens;
    }
    parseArray(arrayToken) {
        if (!arrayToken.startsWith('[') || !arrayToken.endsWith(']')) {
            throw new Error('Invalid array format');
        }
        const content = arrayToken.slice(1, -1).trim();
        if (!content)
            return [];
        return content.split(/\s+/);
    }
    parseTextInput(tokens) {
        if (tokens.length < 2) {
            return { success: false, error: "text-input requires at least an id" };
        }
        const widget = {
            type: "text-input",
            id: tokens[1]
        };
        if (tokens.length > 2)
            widget.label = tokens[2];
        if (tokens.length > 3)
            widget.placeholder = tokens[3];
        if (tokens.length > 4)
            widget.default = tokens[4];
        return { success: true, widget };
    }
    parseButtonGroup(tokens) {
        if (tokens.length < 3) {
            return { success: false, error: "button-group requires id and choices array" };
        }
        try {
            const choices = this.parseArray(tokens[2]);
            const widget = {
                type: "button-group",
                id: tokens[1],
                choices
            };
            if (tokens.length > 3)
                widget.default = tokens[3];
            return { success: true, widget };
        }
        catch (error) {
            return { success: false, error: `Invalid choices array: ${error}` };
        }
    }
    parseSelect(tokens) {
        if (tokens.length < 3) {
            return { success: false, error: "select requires id and choices array" };
        }
        try {
            const choices = this.parseArray(tokens[2]);
            const widget = {
                type: "select",
                id: tokens[1],
                choices
            };
            if (tokens.length > 3)
                widget.default = tokens[3];
            return { success: true, widget };
        }
        catch (error) {
            return { success: false, error: `Invalid choices array: ${error}` };
        }
    }
    parseSelectMulti(tokens) {
        if (tokens.length < 3) {
            return { success: false, error: "select-multi requires id and choices array" };
        }
        try {
            const choices = this.parseArray(tokens[2]);
            const widget = {
                type: "select-multi",
                id: tokens[1],
                choices
            };
            if (tokens.length > 3) {
                if (tokens[3].startsWith('[')) {
                    widget.default = this.parseArray(tokens[3]);
                }
                else {
                    widget.default = tokens[3];
                }
            }
            return { success: true, widget };
        }
        catch (error) {
            return { success: false, error: `Invalid format: ${error}` };
        }
    }
    parseSlider(tokens) {
        if (tokens.length < 5) {
            return { success: false, error: "slider requires id, min, max, step" };
        }
        const min = parseFloat(tokens[2]);
        const max = parseFloat(tokens[3]);
        const step = parseFloat(tokens[4]);
        if (isNaN(min) || isNaN(max) || isNaN(step)) {
            return { success: false, error: "min, max, and step must be numbers" };
        }
        const widget = {
            type: "slider",
            id: tokens[1],
            min,
            max,
            step
        };
        if (tokens.length > 5) {
            const defaultVal = parseFloat(tokens[5]);
            if (!isNaN(defaultVal)) {
                widget.default = defaultVal;
            }
        }
        return { success: true, widget };
    }
    parseForm(tokens, fullInput) {
        if (tokens.length < 2) {
            return { success: false, error: "form requires at least an id" };
        }
        const lines = fullInput.split('\n');
        const firstLine = lines[0];
        const firstTokens = this.tokenize(firstLine);
        const widget = {
            type: "form",
            id: firstTokens[1],
            fields: []
        };
        if (firstTokens.length > 2) {
            widget.submitLabel = firstTokens[2];
        }
        for (let i = 1; i < lines.length; i++) {
            const line = lines[i];
            if (line.startsWith('  ')) {
                const fieldLine = line.slice(2);
                const fieldResult = this.parse(fieldLine);
                if (fieldResult.success && fieldResult.widget) {
                    widget.fields.push(fieldResult.widget);
                }
            }
        }
        return { success: true, widget };
    }
}
export function parseDSL(input) {
    const parser = new DSLParser();
    return parser.parse(input);
}
