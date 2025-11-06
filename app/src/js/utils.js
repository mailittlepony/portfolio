const marked = window.marked;
const hljs   = window.hljs;

function resolveBase() {
  // Prefer Vite's configured base when it's non-root.
  const viteBase =
    (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.BASE_URL)
      ? import.meta.env.BASE_URL
      : '/';

  if (viteBase && viteBase !== '/' && viteBase !== '') {
    return viteBase.endsWith('/') ? viteBase : viteBase + '/';
  }

  // If we're on GitHub Pages (hostname ends with github.io), derive /<repo>/
  const host = window.location.hostname.toLowerCase();
  if (host.endsWith('github.io')) {
    const segs = window.location.pathname.split('/').filter(Boolean);
    // project sites are /<repo>/..., user sites are '/'
    return segs.length > 0 ? `/${segs[0]}/` : '/';
  }

  // Local dev (localhost/127.0.0.1) or any other host → root
  return '/';
}

function asset(path) {
  if (/^https?:\/\//i.test(path)) return path;

  const base = resolveBase(); // e.g. '/' locally, '/portfolio/' on GH Pages
  const absBase = window.location.origin + (base.endsWith('/') ? base : base + '/');

  const rel = path.startsWith('/') ? path.slice(1) : path;
  return new URL(rel, absBase).toString();
}

export async function loadMarkdown(markdownPath) {
    const url = asset(markdownPath);
    console.log('[loadMarkdown] GET', url);

    const res = await fetch(url, { mode: 'cors' });
    console.log('[loadMarkdown] status', res.status, res.statusText);

    if (!res.ok) throw new Error(`Failed to load Markdown: ${res.status} ${res.statusText}`);

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

