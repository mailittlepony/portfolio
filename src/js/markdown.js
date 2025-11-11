/*
 * markdown.js
 * Copyright (C) 2025 mailitg <mailitg@maili-mba.local>
 *
 * Distributed under terms of the MIT license.
 */

import MarkdownIt from "markdown-it";
import DOMPurify from "dompurify";
import markdownItHighlight from "markdown-it-highlightjs";
import markdownItMedia from "@gotfeedback/markdown-it-media";

const md = new MarkdownIt({
    html: true,          
    linkify: true,
    breaks: true,
})
.use(markdownItHighlight, { inline: true })
.use(markdownItMedia, {
    controls: true,    
    attrs: {
        image: {},
        audio: { controls: "", preload: "metadata" },
        video: {
            controls: "", autoplay: "", loop: "", muted: "", playsinline: "",
            preload: "metadata", style: "max-width:100%;height:auto;",
        },
    },
});

const defaultLinkOpen =
    md.renderer.rules.link_open ??
        ((tokens, idx, options, env, self) => self.renderToken(tokens, idx, options));
md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
    const t = tokens[idx].attrIndex("target");
    if (t < 0) tokens[idx].attrPush(["target", "_blank"]);
        else tokens[idx].attrs[t][1] = "_blank";
    const r = tokens[idx].attrIndex("rel");
    if (r < 0) tokens[idx].attrPush(["rel", "noopener noreferrer"]);
        else tokens[idx].attrs[r][1] = "noopener noreferrer";
    return defaultLinkOpen(tokens, idx, options, env, self);
};

export function renderMarkdown(mdText = "") {
    const raw = md.render(mdText);
    return DOMPurify.sanitize(raw, {
        ADD_TAGS: ["video", "audio", "source"],
        ADD_ATTR: [
            "controls", "autoplay", "loop", "muted", "playsinline",
            "preload", "poster", "src", "type", "style", "width", "height", "aria-label",
        ],
    });
}

export function renderMarkdownInto(el, mdText = "") {
    if (!el) return;
    el.innerHTML = renderMarkdown(mdText);
}

