import { nanoid } from 'nanoid';
export const markedUiExtension = {
    renderer: {
        code(token) {
            const lang = token.lang;
            if (lang === "markdown-ui-widget") {
                const payload = btoa(token.text);
                const id = nanoid();
                return `<markdown-ui-widget id="${id}" content="${payload}"></markdown-ui-widget>\n`;
            }
            // fall back to default rendering
            return false; // tells marked to use its default renderer for other languages
        },
    },
};
