const isGitHubPages = location.hostname === 'mailittlepony.github.io';
const basePath = isGitHubPages ? '/Portfolio/' : '/';
document.querySelectorAll('script[src], link[href], img[src]').forEach((el) => {
  const attr = el.tagName === 'LINK' || el.tagName === 'SCRIPT' ? 'src' : 'href';
  if (el.getAttribute(attr).startsWith('/')) {
    el.setAttribute(attr, basePath + el.getAttribute(attr).slice(1));
  }
});
