const marked = window.marked;
const hljs = window.hljs;

function asset(path) {
    if (/^https?:\/\//i.test(path)) return path; 
    const p = path.startsWith('/') ? path : `/${path}`;
    const basePath = import.meta.env.BASE_URL || '/';
    const absBase = basePath.startsWith('http')
        ? basePath
        : window.location.origin + basePath;
    return new URL(p, absBase).toString();
}

export async function loadMarkdown(markdownPath) {
    const url = asset(markdownPath);
    console.log('[loadMarkdown] GET', url);

    const res = await fetch(url, { mode: 'cors' });
    console.log('[loadMarkdown] status', res.status, res.statusText);

    if (!res.ok) {
        throw new Error(`Failed to load Markdown: ${res.status} ${res.statusText}`);
    }

    const ct = (res.headers.get('content-type') || '').toLowerCase();
    if (ct.includes('text/html')) {
        console.warn('[loadMarkdown] got HTML instead of markdown → throwing to trigger fallback');
        throw new Error('Received HTML instead of Markdown');
    }

    const md = await res.text();
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = marked.parse(md);
    contentDiv.querySelectorAll('pre code').forEach(b => hljs.highlightElement(b));
    return md;
}

document.addEventListener("DOMContentLoaded", function() {
    const links = document.querySelectorAll(".header-item");

    links.forEach(link => {
        link.addEventListener("click", function() {
            links.forEach(item => item.classList.remove("active"));
            this.classList.add("active");
        });
    });

    const currentPath = window.location.pathname;
    links.forEach(link => {
        if (currentPath.includes(link.getAttribute("href"))) {
            link.classList.add("active");
        }
    });
});


