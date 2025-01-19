async function loadPage() {
    const url = new URL(window.location.href);
    const urlParams = new URLSearchParams(url.search);
    const projectName = urlParams.get('name');

    const githubUrl = `https://raw.githubusercontent.com/mailittlepony/${projectName}/main`;

    const localMarkdownPath = `markdown/${projectName}.md`;

    try {
        console.log(`Loading local Markdown file: ${localMarkdownPath}`);
        if(await loadMarkdown(localMarkdownPath) == "") {
            throw new Error();
        }
    } catch (error) {
        console.warn(`Local Markdown file not available. Falling back to GitHub. Error: ${error.message}`);
        await loadMarkdown(`${githubUrl}/README.md`);

        document.getElementById("content").querySelectorAll("[src]").forEach((elmt) => {
            const src = elmt.getAttribute("src");
            elmt.setAttribute("src", `${githubUrl}/${src}`);
        });
    }
}
