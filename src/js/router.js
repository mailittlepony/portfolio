/*
 * router.js
 * Copyright (C) 2025 mailitg <mailitg@maili-mba.local>
 *
 * Distributed under terms of the MIT license.
 */

import { loadMarkdown } from "./utils.js";
import { loadProjectPage } from "./project.js";
import { loadHomePage } from "./script.js";

const BUILTIN_MD_VIEWS = new Set(["contact", "home"]); 

function setActiveHeader(view, hasProject) {
    const readmeLink = document.getElementById("readme-link");
    const contactLink = document.getElementById("contact-link");
    readmeLink?.classList.remove("active");
    contactLink?.classList.remove("active");

    if (hasProject) return; 
    if (!view || view === "home") readmeLink?.classList.add("active");
    if (view === "contact") contactLink?.classList.add("active");
}

function scrollToTop() {
    const scroller = document.getElementById("page");
    if (scroller) scroller.scrollTo({ top: 0, left: 0, behavior: "auto" });
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
}

export async function handleNavigation() {
    const params = new URLSearchParams(window.location.search);
    const projectName = params.get("name");
    const view = (params.get("view") || "").toLowerCase();

    if (projectName) {
        setActiveHeader("", true);
        await loadProjectPage();
        scrollToTop();
        return;
    }

    if (view && BUILTIN_MD_VIEWS.has(view)) {
        setActiveHeader(view, false);
        await loadMarkdown(`markdown/${view}.md`);
        scrollToTop();
        return;
    }

    if (view) {
        try {
            setActiveHeader(view, false);
            await loadMarkdown(`markdown/${view}.md`);
            scrollToTop();
            return;
        } catch (e) {
            console.warn(`[router] markdown/${view}.md not found → home`, e);
        }
    }

    setActiveHeader("home", false);
    await loadHomePage();
    scrollToTop();
}

export function initRouter() {
    document.addEventListener("click", (e) => {
        const a = e.target.closest?.("a");
        if (!a) return;

        const url = new URL(a.href, window.location.href);
        const sameDoc =
            url.origin === window.location.origin &&
                url.pathname === window.location.pathname;

        if (!sameDoc) return;

        const touchesApp =
            url.searchParams.has("name") ||
                url.searchParams.has("view") ||
                url.search === "" || url.search === "?";

        if (!touchesApp) return;

        e.preventDefault();
        history.pushState(null, "", url);
        handleNavigation();
    });

    window.addEventListener("popstate", handleNavigation);
}

