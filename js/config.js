const isGitHubPages = location.hostname === 'mailittlepony.github.io';
const basePath = isGitHubPages ? '/Portfolio/' : '/';

const baseTag = document.querySelector('base');
if (baseTag) {
    baseTag.setAttribute('href', basePath);
}

document.querySelectorAll('script[src], link[href], img[src]').forEach((el) => {
    const attr = el.tagName === 'LINK' ? 'href' : 'src';
    const currentPath = el.getAttribute(attr);
    if (currentPath && !currentPath.startsWith('http') && !currentPath.startsWith(basePath)) {
        el.setAttribute(attr, basePath + currentPath);
    }
});

