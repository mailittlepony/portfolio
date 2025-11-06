/*
 * main.js
 * Copyright (C) 2025 mailitg <mailitg@maili-mba.local>
 *
 * Distributed under terms of the MIT license.
 */
import './style.css';
import './js/utils.js';
import './js/script.js';
import './js/project.js';

document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const projectName = params.get('name');

    if (projectName) {
        window.loadProjectPage?.();
    } else {
        window.loadHomePage?.();
    }
});

