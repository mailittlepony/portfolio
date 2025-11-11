/*
 * utils.js
 * Copyright (C) 2025 mailitg <mailitg@maili-mba.local>
 *
 * Distributed under terms of the MIT license.
 */

import { renderMarkdown, renderMarkdownInto } from "./markdown.js";

export async function loadMarkdown(urlOrPath) {
    const res = await fetch(urlOrPath, {
        credentials: "omit",
        cache: "no-store",
        redirect: "follow",
        mode: "cors",
    });

    if (!res.ok) {
        throw new Error(`Failed to fetch ${urlOrPath}: ${res.status} ${res.statusText}`);
    }

    const text = await res.text();

    const sniff = text.slice(0, 200).toLowerCase().replace(/\s+/g, "");
    if (sniff.startsWith("<!doctypehtml") || sniff.startsWith("<html")) {
        throw new Error(
            `Expected markdown, got HTML document from ${urlOrPath}. ` +
                `This usually means the URL is wrong or was rewritten to your index.html.`
        );
    }

    const contentEl = document.getElementById("content");
    renderMarkdownInto(contentEl, text);
    return text;
}

export function renderMarkdownText(mdText) {
    const contentEl = document.getElementById("content");
    renderMarkdownInto(contentEl, mdText);
}

