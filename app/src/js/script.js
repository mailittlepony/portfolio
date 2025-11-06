import { loadMarkdown } from './utils.js';

async function loadHomePage () {
    const markdown = await loadMarkdown('markdown/sample.md');
    generateProjectCards(markdown);

    const ps = document.getElementById('content').querySelectorAll('p');
    for (const p of ps) {
        const imgs = p.querySelectorAll('img');
        if (imgs.length >= 2) {
            p.classList.add('selected-project');
            for (const img of imgs) {
                const repoName = img.alt.trim();
                const a = document.createElement('a');
                a.href = `pages/project.html?name=${encodeURIComponent(repoName)}`;

                const titleDiv = document.createElement('div');
                titleDiv.classList.add('title');
                a.style.position = 'relative';

                const title = document.createElement('h2');
                title.textContent = repoName;
                titleDiv.appendChild(title);

                p.appendChild(a);
                a.appendChild(img);
                a.appendChild(titleDiv);
            }
            break;
        }
    }
}
window.loadHomePage = loadHomePage;

function generateProjectCards(markdownText) {
    const projectSectionRegex = /## Other projects([\s\S]*?)(##|$)/;
    const projectRegex =
        /\*\*\[(.+?)\]\((.+?)\)\*\*\s+_([^_]+)_\s+-\s+\*\*Technologies\*\*: ([^\n]+)\s+-\s+\*\*License\*\*: ([^\n]+)\s+-\s+\*\*Last Updated\*\*: ([^\n]+)\s*(?:-\s+\*\*Image\*\*: ([^\n]+))?/g;

    const projectsSection = markdownText.match(projectSectionRegex);
    if (!projectsSection) {
        console.error('Projects section not found');
        return;
    }

    const projects = [];
    projectRegex.lastIndex = 0;
    let match;
    while ((match = projectRegex.exec(projectsSection[1])) !== null) {
        projects.push({
            title: match[1].trim(),          
            url: match[2].trim(),            
            description: match[3].trim(),
            technologies: match[4].split(',').map((t) => t.trim()),
            license: match[5].trim(),
            lastUpdated: match[6].trim(),
            imageUrl: match[7]?.trim() || '',
        });
    }

    if (!projects.length) {
        console.error('No projects parsed');
        return;
    }

    const contentDiv = document.getElementById('content');
    const projectSectionHeader = Array.from(contentDiv.querySelectorAll('h2')).find(
        (h) => h.textContent.trim().toLowerCase() === 'other projects'
    );
    if (!projectSectionHeader) {
        console.error('Projects section header not found in rendered HTML');
        return;
    }

    let node = projectSectionHeader.nextElementSibling;
    while (node && node.tagName !== 'H2') {
        const next = node.nextElementSibling;
        node.remove();
        node = next;
    }

    const languageColors = {
        JavaScript: 'yellow',
        Python: 'steelBlue',
        'C#': 'green',
        'C++': 'deepPink',
        GLSL: 'skyBlue',
    };

    const insertBeforeNode = projectSectionHeader.nextElementSibling;

    projects.forEach((project) => {
        const repoName = project.title; 
        const primaryTechnology = project.technologies[0] || '';
        const dotColor = languageColors[primaryTechnology] || '#586069';

        const card = document.createElement('div');
        card.classList.add('project-card');
        card.innerHTML = `
<div class="project-text">
    <div class="project-header">
        <a href="pages/project.html?name=${encodeURIComponent(repoName)}" class="project-title">${project.title}</a>
    </div>
    <p class="project-description">${project.description}</p>
    <ul class="project-tags">
        ${project.technologies.map((t) => `<li>${t}</li>`).join('')}
    </ul>
    <div class="project-meta">
        <span class="language">
            <span class="language-dot" style="background-color: ${dotColor};"></span> ${primaryTechnology}
        </span>
        <span>${project.license}</span>
        <span>Updated ${project.lastUpdated}</span>
    </div>
</div>
${project.imageUrl ? `<img src="${project.imageUrl}" alt="${project.title} image" class="project-image" />` : ''}
`;
        contentDiv.insertBefore(card, insertBeforeNode);
    });
}

