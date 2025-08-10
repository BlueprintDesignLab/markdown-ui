import { type MarkedExtension } from 'marked';
import { nanoid } from 'nanoid';

export const markedUiExtension: MarkedExtension = {
    renderer: {
        code(token) {
            const lang = token.lang;

            if (lang === "markdown-ui-widget") {
                let payloadJson: any = {};
                try {
                    payloadJson = JSON.parse(token.text);
                } catch (e) {
                    // invalid json, render loading widget
                }
                const payload = btoa(token.text);
                const id = nanoid();

                return `<markdown-ui-widget id="${payloadJson.id ? payloadJson.id : id}" content="${payload}"></markdown-ui-widget>\n`;
            }
            // fall back to default rendering
            return false; // tells marked to use its default renderer for other languages
        },
    },
};