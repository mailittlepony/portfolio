/*
 * main.js
 * Copyright (C) 2025 mailitg <mailitg@maili-mba.local>
 *
 * Distributed under terms of the MIT license.
 */
import './js/router.js';
import { initRouter, handleNavigation } from './js/router.js';
import 'highlight.js/styles/github.css';
import './style.css';
import './js/utils.js';
import './js/script.js';
import './js/project.js';

document.addEventListener('DOMContentLoaded', () => {
    initRouter();
    handleNavigation();
});

window.addEventListener("hashchange", () => {
    scrollToHash();
});

