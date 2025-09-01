import { type MarkedExtension } from 'marked';
import { nanoid } from 'nanoid';
import { parseDSL } from '@markdown-ui/mdui-lang';

export const markedUiExtension: MarkedExtension = {
    renderer: {
        code(token) {
            const lang = token.lang;

            if (lang === "markdown-ui-widget") {
                const text = token.text.trim();
                let payloadJson: any = {};
                let finalPayload: string;
                
                // Try JSON first
                try {
                    payloadJson = JSON.parse(text);
                    finalPayload = text; // Use original JSON
                } catch (e) {
                    // Not JSON, try DSL
                    const result = parseDSL(text);
                    if (result.success && result.widget) {
                        payloadJson = result.widget;
                        finalPayload = JSON.stringify(result.widget);
                    } else {
                        // Failed to parse both, render as code block
                        return false;
                    }
                }

                console.log(finalPayload);
                
                const payload = btoa(finalPayload);
                const id = payloadJson.id || nanoid();

                return `<markdown-ui-widget id="${id}" content="${payload}"></markdown-ui-widget>\n`;
            }

            // fall back to default rendering
            return false; // tells marked to use its default renderer for other languages
        },
    },
};