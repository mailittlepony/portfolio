
async function loadPage () {
    const markdown = await loadMarkdown("./markdown/sample.md");
    generateProjectCards(markdown);
    const ps = document.getElementById("content").querySelectorAll("p");
    
    for (const p of ps) {
        if (p.querySelectorAll("img").length >= 2) {
            p.classList.add("selected-project");
            for (const img of p.querySelectorAll("img")) {
                const a = document.createElement('a');
                a.href = `pages/project.html?name=${img.alt}`;

                const titleDiv = document.createElement("div");
                titleDiv.classList.add("title");

                // temporary
                a.style.position = "relative";

                const title = document.createElement("h2");
                title.innerHTML = img.alt;
                titleDiv.appendChild(title);

                p.appendChild(a);
                a.appendChild(img);
                a.appendChild(titleDiv);
            }
            break;
        }
    }
}

function generateProjectCards(markdownText) {
    const projectSectionRegex = /## Other projects([\s\S]*?)(##|$)/;
    const projectRegex = /\*\*\[(.+?)\]\((.+?)\)\*\*\s+_([^_]+)_\s+-\s+\*\*Technologies\*\*: ([^\n]+)\s+-\s+\*\*License\*\*: ([^\n]+)\s+-\s+\*\*Last Updated\*\*: ([^\n]+)\s*(?:-\s+\*\*Image\*\*: ([^\n]+))?/g;
    const projects = [];
    const projectsSection = markdownText.match(projectSectionRegex);
    if (!projectsSection) {
        console.error("Projects section not found");
        return;
    }

    let match;
    projectRegex.lastIndex = 0; 
    while ((match = projectRegex.exec(projectsSection[1])) !== null) {
        projects.push({
            title: match[1].trim(),
            url: match[2].trim(), 
            description: match[3].trim(),
            technologies: match[4].split(",").map((tech) => tech.trim()),
            license: match[5].trim(),
            lastUpdated: match[6].trim(),
            imageUrl: match[7]?.trim() || "", 
        });

    }

    if (projects.length === 0) {
        console.error("No projects parsed");
        return;
    }

    const contentDiv = document.getElementById("content");
    const projectSectionHeader = Array.from(contentDiv.querySelectorAll("h2")).find(
        (header) => header.textContent.trim().toLowerCase() === "other projects"
    );

    if (!projectSectionHeader) {
        console.error("Projects section header not found in rendered HTML");
        return;
    }

    let projectSection = projectSectionHeader.nextElementSibling;
    while (projectSection && projectSection.tagName !== "H2") {
        const temp = projectSection.nextElementSibling;
        projectSection.remove();
        projectSection = temp;
    }
    // Define language-to-color mapping
    const languageColors = {
        JavaScript: "yellow",
        Python: "steelBlue",
        "C#": "green",
        "C++": "deepPink",
        GLSL: "skyBlue",
    };
    projects.forEach((project) => {
        const projectCard = document.createElement("div");
        projectCard.classList.add("project-card");
        const primaryTechnology = project.technologies[0];
        const dotColor = languageColors[primaryTechnology] || "#586069";
        projectCard.innerHTML = `
        <div class="project-text">
            <div class="project-header">
                <a href="pages/project.html?name=${formatString(project.title)}" class="project-title">${project.title}</a>
            </div>
            <p class="project-description">${project.description}</p>
            <ul class="project-tags">
                ${project.technologies.map((tech) => `<li>${tech}</li>`).join("")}
            </ul>
            <div class="project-meta">
                <span class="language">
                    <span class="language-dot" style="background-color: ${dotColor};"></span> ${primaryTechnology}
                </span>
                <span>${project.license}</span>
                <span>Updated ${project.lastUpdated}</span>
            </div>
        </div>
        ${project.imageUrl ? `<img src="${project.imageUrl}" alt="${project.title} image" class="project-image" />` : ""}
        `;


        contentDiv.insertBefore(projectCard, projectSectionHeader.nextElementSibling);
    });
}


