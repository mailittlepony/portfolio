/*
 * project.js
 * Copyright (C) 2025 mailitg <mailitg@maili-mba.local>
 *
 * Distributed under terms of the MIT license.
 */

import { loadMarkdown } from './utils.js';

export async function loadProjectPage() {
    const params = new URLSearchParams(window.location.search);
    const repoName = params.get('name');
    console.log('[project] repoName =', repoName);  

    if (!repoName) {
        document.getElementById('content').innerHTML =
            `<p>Missing <code>?name=</code> in URL.</p>`;
        return;
    }

    const user = 'mailittlepony';

    const basePath = import.meta.env.BASE_URL || '/';
    const siteBaseAbs = basePath.startsWith('http')
        ? basePath
        : window.location.origin + basePath;

    const content = document.getElementById('content');

    try {
        console.log('[project] try local:', `markdown/${repoName}.md`);
        await loadMarkdown(`markdown/${repoName}.md`);
        rewriteRelativeUrls('#content', siteBaseAbs); 
        return;
    } catch (e) {
        console.warn('[project] local markdown missing → fallback to GitHub README:', e);
    }

    for (const branch of ['main', 'master']) {
        const rawBase = `https://raw.githubusercontent.com/${user}/${encodeURIComponent(repoName)}/${branch}/`;
        const url = `${rawBase}README.md`;
        console.log('[project] try GitHub:', url);
        try {
            await loadMarkdown(url);
            rewriteRelativeUrls('#content', rawBase);   
            return;
        } catch (e) {
            console.warn(`[project] README not found on ${branch}:`, e);
        }
    }

    content.innerHTML = `<p>Could not load README for <code>${repoName}</code>. Check repository name/case or branch.</p>`;
}

function rewriteRelativeUrls(containerSelector, base) {
    const container = document.querySelector(containerSelector);
    if (!container) return;
    container.querySelectorAll('img, a, video, source').forEach((el) => {
        for (const attr of ['src', 'href']) {
            const val = el.getAttribute(attr);
            if (!val || /^https?:\/\//i.test(val)) continue;
            try { el.setAttribute(attr, new URL(val, base).toString()); } catch {}
        }
    });
}

