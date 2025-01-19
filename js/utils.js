async function loadMarkdown(markdown_text) {
    const contentDiv = document.getElementById("content"); 

    try {
        const response = await fetch(markdown_text);
        if (!response.ok) {
            throw new Error(`Failed to load Markdown file: ${response.statusText}`);
        }

        const markdown = await response.text();

        const htmlContent = marked.parse(markdown);
        contentDiv.innerHTML = htmlContent;
        contentDiv.querySelectorAll("pre code").forEach((block) => {
            hljs.highlightElement(block);
        });

        return markdown; 
    } catch (error) {
        console.error("Error fetching Markdown file:", error);
        return "";
    }
}

function formatString(inputString) {
    return inputString.replace(/ /g, '_');
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


