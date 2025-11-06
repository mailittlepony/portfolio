import{l as j}from"./utils-CK3rGGiT.js";async function w(){const l=await j("markdown/sample.md");C(l);const i=document.getElementById("content").querySelectorAll("p");for(const a of i){const c=a.querySelectorAll("img");if(c.length>=2){a.classList.add("selected-project");for(const r of c){const t=r.alt.trim(),n=document.createElement("a");n.href=`pages/project.html?name=${encodeURIComponent(t)}`;const s=document.createElement("div");s.classList.add("title"),n.style.position="relative";const o=document.createElement("h2");o.textContent=t,s.appendChild(o),a.appendChild(n),n.appendChild(r),n.appendChild(s)}break}}}window.loadHomePage=w;function C(l){const i=/## Other projects([\s\S]*?)(##|$)/,a=/\*\*\[(.+?)\]\((.+?)\)\*\*\s+_([^_]+)_\s+-\s+\*\*Technologies\*\*: ([^\n]+)\s+-\s+\*\*License\*\*: ([^\n]+)\s+-\s+\*\*Last Updated\*\*: ([^\n]+)\s*(?:-\s+\*\*Image\*\*: ([^\n]+))?/g,c=l.match(i);if(!c){console.error("Projects section not found");return}const r=[];a.lastIndex=0;let t;for(;(t=a.exec(c[1]))!==null;)r.push({title:t[1].trim(),url:t[2].trim(),description:t[3].trim(),technologies:t[4].split(",").map(e=>e.trim()),license:t[5].trim(),lastUpdated:t[6].trim(),imageUrl:t[7]?.trim()||""});if(!r.length){console.error("No projects parsed");return}const n=document.getElementById("content"),s=Array.from(n.querySelectorAll("h2")).find(e=>e.textContent.trim().toLowerCase()==="other projects");if(!s){console.error("Projects section header not found in rendered HTML");return}let o=s.nextElementSibling;for(;o&&o.tagName!=="H2";){const e=o.nextElementSibling;o.remove(),o=e}const p={JavaScript:"yellow",Python:"steelBlue","C#":"green","C++":"deepPink",GLSL:"skyBlue"},g=s.nextElementSibling;r.forEach(e=>{const h=e.title,m=e.technologies[0]||"",u=p[m]||"#586069",d=document.createElement("div");d.classList.add("project-card"),d.innerHTML=`
<div class="project-text">
    <div class="project-header">
        <a href="pages/project.html?name=${encodeURIComponent(h)}" class="project-title">${e.title}</a>
    </div>
    <p class="project-description">${e.description}</p>
    <ul class="project-tags">
        ${e.technologies.map(f=>`<li>${f}</li>`).join("")}
    </ul>
    <div class="project-meta">
        <span class="language">
            <span class="language-dot" style="background-color: ${u};"></span> ${m}
        </span>
        <span>${e.license}</span>
        <span>Updated ${e.lastUpdated}</span>
    </div>
</div>
${e.imageUrl?`<img src="${e.imageUrl}" alt="${e.title} image" class="project-image" />`:""}
`,n.insertBefore(d,g)})}document.addEventListener("DOMContentLoaded",()=>{new URLSearchParams(window.location.search).get("name")?window.loadProjectPage?.():window.loadHomePage?.()});
