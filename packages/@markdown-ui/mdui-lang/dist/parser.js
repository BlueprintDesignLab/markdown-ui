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
                case 'chart-line':
                case 'chart-bar':
                case 'chart-pie':
                case 'chart-scatter':
                    return this.parseChart(tokens, input, widgetType);
                case 'multiple-choice-question':
                    return this.parseMultipleChoiceQuestion(tokens);
                case 'short-answer-question':
                    return this.parseShortAnswerQuestion(tokens);
                case 'quiz':
                    return this.parseQuiz(tokens, input);
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
            if ((char === ' ' || char === '\n') && !inQuotes && !inArray) {
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
        // Parse array content with support for quoted strings
        const items = [];
        let current = '';
        let inQuotes = false;
        let i = 0;
        while (i < content.length) {
            const char = content[i];
            if (char === '"') {
                inQuotes = !inQuotes;
                i++;
                continue;
            }
            if (char === ' ' && !inQuotes) {
                if (current.trim()) {
                    items.push(current.trim());
                    current = '';
                }
                i++;
                continue;
            }
            current += char;
            i++;
        }
        if (current.trim()) {
            items.push(current.trim());
        }
        return items;
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
    parseChart(tokens, fullInput, chartType) {
        const lines = fullInput.split('\n');
        if (lines.length < 2) {
            return { success: false, error: "chart requires CSV data" };
        }
        const widget = {
            type: chartType,
            labels: [],
            datasets: []
        };
        // Check if using old token-based format or new key-value format
        // Old format has multiple tokens on the first line: "chart-line id title"
        // New format has only widget type on first line: "chart-line"
        const firstLineTokens = this.tokenize(lines[0]);
        const isOldFormat = firstLineTokens.length > 1; // Old format: chart-line id title
        let csvStartIndex = 1;
        if (isOldFormat) {
            // Old format: chart-line chart_id "Chart Title"
            widget.id = firstLineTokens[1];
            if (firstLineTokens.length > 2) {
                widget.title = firstLineTokens[2];
            }
            // CSV starts at line 1
            csvStartIndex = 1;
        }
        else {
            // New format: key-value parameters before CSV
            for (let i = 1; i < lines.length; i++) {
                const line = lines[i].trim();
                if (!line)
                    continue;
                // Check if this line contains a key:value parameter
                if (line.includes(':')) {
                    const colonIndex = line.indexOf(':');
                    const key = line.substring(0, colonIndex).trim().toLowerCase();
                    if (['id', 'title', 'height'].includes(key)) {
                        const value = line.substring(colonIndex + 1).trim();
                        switch (key) {
                            case 'id':
                                widget.id = value;
                                break;
                            case 'title':
                                widget.title = value;
                                break;
                            case 'height':
                                const height = parseInt(value);
                                if (!isNaN(height)) {
                                    widget.height = height;
                                }
                                break;
                        }
                        csvStartIndex = i + 1;
                    }
                    else {
                        // This line has a colon but isn't a known parameter, treat as CSV data
                        csvStartIndex = i;
                        break;
                    }
                }
                else {
                    // This line doesn't contain a colon, start CSV parsing here
                    csvStartIndex = i;
                    break;
                }
            }
        }
        // Parse CSV data starting from csvStartIndex
        const csvLines = lines.slice(csvStartIndex);
        if (csvLines.length === 0) {
            return { success: false, error: "No CSV data provided" };
        }
        // Parse header row
        const headerLine = csvLines[0].trim();
        if (!headerLine) {
            return { success: false, error: "Empty CSV header" };
        }
        const headers = headerLine.split(',').map(h => h.trim());
        if (headers.length < 2) {
            return { success: false, error: "CSV must have at least 2 columns" };
        }
        // Initialize datasets for each data column (skip first column which is labels)
        for (let i = 1; i < headers.length; i++) {
            widget.datasets.push({
                label: headers[i],
                data: []
            });
        }
        // Parse data rows
        for (let i = 1; i < csvLines.length; i++) {
            const dataLine = csvLines[i].trim();
            if (!dataLine)
                continue; // Skip empty lines
            const values = dataLine.split(',').map(v => v.trim());
            if (values.length !== headers.length) {
                return { success: false, error: `Row ${i + 1} has ${values.length} columns, expected ${headers.length}` };
            }
            // First column is the label
            widget.labels.push(values[0]);
            // Remaining columns are data points
            for (let j = 1; j < values.length; j++) {
                const numValue = parseFloat(values[j]);
                if (isNaN(numValue)) {
                    return { success: false, error: `Invalid number "${values[j]}" in row ${i + 1}, column ${j + 1}` };
                }
                widget.datasets[j - 1].data.push(numValue);
            }
        }
        return { success: true, widget };
    }
    parseMultipleChoiceQuestion(tokens) {
        if (tokens.length < 4) {
            return { success: false, error: "multiple-choice-question requires id, question, and choices array" };
        }
        try {
            const choices = this.parseArray(tokens[3]);
            const widget = {
                type: "multiple-choice-question",
                id: tokens[1],
                question: tokens[2],
                choices
            };
            if (tokens.length > 4)
                widget.correctAnswer = tokens[4];
            if (tokens.length > 5)
                widget.showFeedback = tokens[5].toLowerCase() === 'true';
            return { success: true, widget };
        }
        catch (error) {
            return { success: false, error: `Invalid choices array: ${error}` };
        }
    }
    parseShortAnswerQuestion(tokens) {
        if (tokens.length < 3) {
            return { success: false, error: "short-answer-question requires id and question" };
        }
        const widget = {
            type: "short-answer-question",
            id: tokens[1],
            question: tokens[2]
        };
        if (tokens.length > 3)
            widget.placeholder = tokens[3];
        if (tokens.length > 4) {
            try {
                if (tokens[4].startsWith('[')) {
                    widget.correctAnswers = this.parseArray(tokens[4]);
                }
                else {
                    widget.correctAnswer = tokens[4];
                }
            }
            catch (error) {
                return { success: false, error: `Invalid answers value: ${error}` };
            }
        }
        if (tokens.length > 5)
            widget.showFeedback = tokens[5].toLowerCase() === 'true';
        return { success: true, widget };
    }
    parseQuiz(tokens, fullInput) {
        if (tokens.length < 3) {
            return { success: false, error: "quiz requires id and title" };
        }
        const lines = fullInput.split('\n');
        const firstLine = lines[0];
        const firstTokens = this.tokenize(firstLine);
        const widget = {
            type: "quiz",
            id: firstTokens[1],
            title: firstTokens[2],
            questions: [],
            showScore: true,
            showProgress: true
        };
        let i = 1;
        // Parse configuration lines (key: value format)
        while (i < lines.length) {
            const line = lines[i].trim();
            if (!line) {
                i++;
                continue;
            }
            // Check if this is a configuration line (contains colon)
            if (line.includes(':')) {
                const colonIndex = line.indexOf(':');
                const key = line.substring(0, colonIndex).trim().toLowerCase();
                const value = line.substring(colonIndex + 1).trim();
                switch (key) {
                    case 'showscore':
                        widget.showScore = value.toLowerCase() === 'true';
                        break;
                    case 'showprogress':
                        widget.showProgress = value.toLowerCase() === 'true';
                        break;
                    case 'passingscore':
                        const score = parseInt(value);
                        if (!isNaN(score)) {
                            widget.passingScore = score;
                        }
                        break;
                    default:
                        // Not a known config, might be start of questions
                        break;
                }
                i++;
            }
            else {
                // This line doesn't contain a colon, start parsing questions
                break;
            }
        }
        // Parse questions
        while (i < lines.length) {
            const line = lines[i].trim();
            if (!line) {
                i++;
                continue;
            }
            const questionTokens = this.tokenize(line);
            if (questionTokens.length === 0) {
                i++;
                continue;
            }
            const questionType = questionTokens[0];
            let question = {};
            if (questionType === 'mcq') {
                // mcq questionId "Question text" points ["choice1" "choice2"] "correctAnswer"
                if (questionTokens.length < 5) {
                    return { success: false, error: `MCQ question on line ${i + 1} requires: id, question, points, and choices` };
                }
                const points = parseInt(questionTokens[3]);
                if (isNaN(points)) {
                    return { success: false, error: `Invalid points value "${questionTokens[3]}" on line ${i + 1}` };
                }
                try {
                    const choices = this.parseArray(questionTokens[4]);
                    question = {
                        id: questionTokens[1],
                        type: "mcq",
                        question: questionTokens[2],
                        points: points,
                        choices: choices
                    };
                    if (questionTokens.length > 5) {
                        question.correctAnswer = questionTokens[5];
                    }
                }
                catch (error) {
                    return { success: false, error: `Invalid choices array on line ${i + 1}: ${error}` };
                }
            }
            else if (questionType === 'short-answer') {
                // short-answer questionId "Question text" points "placeholder" ["answer1" "answer2"]
                if (questionTokens.length < 4) {
                    return { success: false, error: `Short answer question on line ${i + 1} requires: id, question, and points` };
                }
                const points = parseInt(questionTokens[3]);
                if (isNaN(points)) {
                    return { success: false, error: `Invalid points value "${questionTokens[3]}" on line ${i + 1}` };
                }
                question = {
                    id: questionTokens[1],
                    type: "short-answer",
                    question: questionTokens[2],
                    points: points
                };
                if (questionTokens.length > 4) {
                    question.placeholder = questionTokens[4];
                }
                if (questionTokens.length > 5) {
                    try {
                        if (questionTokens[5].startsWith('[')) {
                            question.correctAnswers = this.parseArray(questionTokens[5]);
                        }
                        else {
                            question.correctAnswers = [questionTokens[5]];
                        }
                    }
                    catch (error) {
                        return { success: false, error: `Invalid answers value on line ${i + 1}: ${error}` };
                    }
                }
            }
            else {
                return { success: false, error: `Unknown question type "${questionType}" on line ${i + 1}` };
            }
            widget.questions.push(question);
            i++;
        }
        if (widget.questions.length === 0) {
            return { success: false, error: "Quiz must contain at least one question" };
        }
        return { success: true, widget };
    }
}
export function parseDSL(input) {
    const parser = new DSLParser();
    return parser.parse(input);
}
